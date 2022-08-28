# 可视化组件一键换肤开发流程
## 新增一个组件

::: tip "组件文件"
文中提及"组件文件"均指被cell直接引用的vue文件
:::

### 场景一
>样式写在内联，或者类似echarts通过属性调整颜色
* 1.制作组件时，新增theme属性
``` js
props:{
	theme:Object
}
```

* 2.在组件文件中引入themeMixin.js
``` js
import themeMixin from '@component/template/mixins/themeMixin';
// 并写入mixin
mixins: ['其他mixin', themeMixin]
```

* 3.组件引用时，添加属性:theme="themeColors"
``` html
<!-- echats图形 -->
    <ve-histogram
      v-if="vscompt.type=='VeCombineChart' || vscompt.type=='VeHistogram' || vscompt.type=='VeStackHistogram'|| vscompt.type=='VePercentStackHistogram'|| vscompt.type=='VeCombineStack'"
      v-bind="vscompt"
      width="100%"
      height="100%"
      :data="{columns:(vscompt.comptData||{}).columns,rows:(vscompt.comptData||{}).rows}"
      :settings="vscompt.comptAttrs.setting"
      :extend="vscompt.comptAttrs.extendSetting"
      :events="chartEvents"
      :after-config="chartConfig"
      :theme="themeColors"
    ></ve-histogram>
<!-- 自定义组件 -->
    <desicion-tree-node
      :nodes="vscompt.comptAttrs.setting['data']"
      :vscompt="vscompt"
      :theme="themeColors"
    />
```
::: tip themeColors
themeColors已经在themeMixin中统一定义
:::

* 4.@/assets/themes/themes.json维护颜色，新增一套组件配置

``` json
{
  "comptType": "DesicionTree", // 组件名称
	"isExtendChart": false, // 是否继承图形配色
    "themes": { // 主题配置，在已知的主题对象中配置组件所需颜色，每套主题根据视觉提供为主配置
      "theme-bigscreen": {
        "mainColor": "#aaff45", // 属性名称根据组件自定义
        "bgColor": "#557fa7",
        "mainFont": "#fff",
        "subFont": "#afc0d0",
        "mainLine": "#557fa7",
        "subLine": "#557fa7"
      },
      "theme-darkblack": {
        "mainColor": "#fff",
        "bgColor": "#ccc",
        "mainFont": "#fff",
        "subFont": "#fff",
        "mainLine": "#fff",
        "subLine": "#fff"
      },
      "theme-lightred": {
        "mainColor": "red",
        "bgColor": "red",
        "mainFont": "red",
        "subFont": "red",
        "mainLine": "red",
        "subLine": "red"
      },
      "theme-default": {
        "mainColor": "rgba(151,8,159,1)",
        "bgColor": "#DCDFE6",
        "mainFont": "#333",
        "subFont": "#ccc",
        "mainLine": "#C0C4CC",
        "subLine": "#909399"
      }
    }
}
```
::: warning
不同主题下的颜色属性要保持统一，禁止自由随意新增
:::

### 场景二
>样式通过css定义的情况

* 1.在组件文件的style内引入：
``` js
  @import '@/assets/themes/pageThemes.scss';
```

* 2.组件中涉及颜色样式采用如下写法：
>目前预定义有背景色，文字颜色，边框色

``` scss
	@include style-color('样式属性', '属性类型');
	例：
	字体颜色：
	@include style-color('color', 'ele-main');
	背景颜色：
	@include style-color('background-color', 'src-n');
	边框颜色：
	@include style-color('border-color', 'main');
```

* 3.颜色配置pageVarible.scss里已经预定义了部分颜色，尽量按照上面的颜色取值，不够用的情况统一反馈找剑斌申请
``` scss
// 各主题主色调
$element-main-
// hover active
$element-main-hover-
// success
$element-success-
// 背景色
$bg-colors-main-
$bg-colors-sub-
$bg-colors-th-
// 字体色
$ft-color-main-
// 边框色
$border-color-main-
```

* 4.颜色都是配套的，如果有添加的类型，要保证每个主题下都有
``` scss
// default
$theme-default: (
  background-color-default: (
    main: $bg-colors-main-default,
    sub: $bg-colors-sub-default,
    th: $bg-colors-th-default,
    src-n: $element-main-default,
    dest-n: $element-success-default,
    src: rgba($element-main-default, 0.1),
    dest: rgba($element-success-default, 0.1)
  ),
  color-default: (
    main: $ft-color-main-default,
    ele-main: $element-main-default,
    ele-main-hover: $element-main-hover-default
  ),
  border-color-default: (
    main: $border-color-main-default,
    ele-main: $element-main-default
  )
);

// darkblack
$theme-darkblack: (
  background-color-darkblack: (
    main: $bg-colors-main-darkblack,
    sub: $bg-colors-sub-darkblack,
    th: $bg-colors-th-darkblack,
    src-n: $element-main-darkblack,
    dest-n: $element-success-darkblack,
    src: rgba($element-main-darkblack, 0.3),
    dest: rgba($element-success-darkblack, 0.3)
  ),
  color-darkblack: (
    main: $ft-color-main-darkblack,
    ele-main: $element-main-darkblack,
    ele-main-hover: $element-main-hover-darkblack
  ),
  border-color-darkblack: (
    main: $border-color-main-darkblack,
    ele-main: $element-main-darkblack
  )
);
```

## 新增一个主题
### 场景一
>样式写在内联，或者类似echarts通过属性调整颜色

* 1.在themes.json中给 *** 每个组件 *** 新增一套主题配置，主题内配置属性需保证每个主题下都统一，属性值按主题颜色配置

>例1（自定义组件）：
``` json
"theme-default": {
        "mainColor": "rgba(151,8,159,1)",
        "bgColor": "#DCDFE6",
        "mainFont": "#333",
        "subFont": "#ccc",
        "mainLine": "#C0C4CC",
        "subLine": "#909399"
      }
```

>例2（echarts图形）：
``` json
"theme-darkblack": {
        "color": [  // 系列颜色
          "#9b8bba",
          "#e098c7",
          "#8fd3e8",
          "#71669e",
          "#cc70af",
          "#7cb4cc"
        ],
        "categoryAxis": { // x轴相关
          "axisLine": {
            "lineStyle": {
              "color": "#fff"
            }
          },
          "axisTick": {
            "lineStyle": {
              "color": "#fff"
            }
          },
          "axisLabel": {
            "textStyle": {
              "color": "#fff"
            }
          }
        },
        "valueAxis": { // y轴相关
          "axisLine": {
            "lineStyle": {
              "color": "#fff"
            }
          },
          "axisTick": {
            "lineStyle": {
              "color": "#fff"
            }
          },
          "axisLabel": {
            "textStyle": {
              "color": "#fff"
            }
          }
        },
        "legend": { // 图例
          "textStyle": {
            "color": "#fff"
          }
        }
      }
```

### 场景二
>样式通过css定义的情况
* 1.pageTheme.scss中如下代码内新增一个主题
``` scss
$themes:(
  default:$theme-default,
  darkblack:$theme-darkblack,
  lightred:$theme-lightred,
  bigscreen:$theme-bigscreen,
  newtheme:$theme-newmap // 新增主题
);
```

* 2.pageVarible.scss中各类型颜色配置中新增新主题配置
``` scss
// 各主题主色调
$element-main-default: #409eff;
$element-main-darkblack: #45fffd;
$element-main-lightred: #f03c3c;
$element-main-bigscreen: #45fffd;
$element-main-newtheme: 新主题颜色值;---新增
```

* 3.pageVarible.scss中新增主题配置，配置项要保持各主题统一
>复制其中一套如上主题，将其中的default改为新增主题的名称newtheme
``` scss
$theme-default: (
  background-color-default: (
    main: $bg-colors-main-default,
    sub: $bg-colors-sub-default,
    th: $bg-colors-th-default,
    src-n: $element-main-default,
    dest-n: $element-success-default,
    src: rgba($element-main-default, 0.1),
    dest: rgba($element-success-default, 0.1)
  ),
  color-default: (
    main: $ft-color-main-default,
    ele-main: $element-main-default,
    ele-main-hover: $element-main-hover-default
  ),
  border-color-default: (
    main: $border-color-main-default,
    ele-main: $element-main-default
  )
);
```
## themeMixin.js
::: tip 切换主题后组件样式还原
设计过程调整了组件的颜色属性后又切换主题的情况下，需将组件的颜色属性重置为当前主题的初始化状态
:::

``` js
watch: {
  'nowPage.theme' (nv, ov) {
    // 更换主题后的组件样式重置在这边操作
    if (nv !== ov) {
      if (['DesicionTree'].includes(this.vscompt.type)) {
        this.vscompt.comptAttrs.extendSetting.nodeColor = this.themeColors.mainColor;
        this.vscompt.styleAttrs[1].children[0].value = this.themeColors.mainColor;
      } else if (this.vscompt.type.indexOf('Ve') === 0 || ['PcIndicatorTrend'].includes(this.vscompt.type)) { // 更换主题之后图形属性重置
        let columns = this.vscompt.comptData.columns;
        for (let i = 1; i < columns.length; i++) {
          let k = i - 1;
          this.vscompt.comptAttrs.extendSetting['series.' + k + '.itemStyle.normal.color'] = this.themeColors.color[k];
        }
      }
    }
  }
}
```
