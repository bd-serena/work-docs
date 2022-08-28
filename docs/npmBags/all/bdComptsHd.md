# 组件发布说明

将bd-compts-hd工程中的组件发布成组件包供外部工程调用

## 发布步骤

### 1. 新增组件入口文件
src/components/index.js
```js
import div from "./bd-div/index.js";
import header from "./bd-header-hd/index.js";
import line from "./bd-line-hd/index.js";
import title from "./bd-title-hd/index.js";
import verTitle from "./bd-verTitle-hd/index.js";
import kpiBlockhd from "./bd-kpiBlock-hd/index.js";
import corner from "./bd-corner-hd/index.js";
import kpiBlockhd2 from "./bd-kpiBlock-hd2/index.js";
import iconKpiBlock from "./bd-iconKpiBlock-hd/index.js";
import kpiBlockhd3 from "./bd-kpiBlock-hd3/index.js";
import textarea from "./bd-textarea-hd/index.js";
import icon from "./bd-icon-hd/index.js";
import digitRoll from "./digitRoll/index.js";
import digitRollHd from "./bd-digitRoll-hd/index.js";
import countTo from "./bd-countTo-hd/index.js";
import flopDevice from "./bd-flopDevice-hd/index.js";
import borderWrap from "./bd-borderWrap-hd/index.js";
import titleShape from "./bd-titleShape-hd/index.js"
import topFive from "./bd-topFive-hd/index.js";
import button from "./bd-button-hd/index.js";
import bdDataV from '@plugins/bdDataV/index.js'
import dataV from "./bd-dataV-hd/index.js";


const components = [div, dataV, header, line, title, verTitle, kpiBlockhd, corner, kpiBlockhd2, iconKpiBlock, kpiBlockhd3, textarea, icon, digitRoll, digitRollHd, countTo, flopDevice, borderWrap, titleShape, topFive, button];


const install = function (Vue) {
  Vue.use(bdDataV)
  // 判断是否可以安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component));
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装,全局引用
  install
};

// 按需加载
export { div, dataV, header, line, title, verTitle, kpiBlockhd, corner, kpiBlockhd2, iconKpiBlock, kpiBlockhd3, textarea, icon, digitRoll, digitRollHd, countTo, flopDevice, borderWrap, titleShape, topFive, button };
  ```
### 2. 修改package.json
  修改name、version，增加main、lib
  ```json
  {
    "name": "bd-compts-hd",
    "version": "1.0.189",
    "private": false,
    "main": "dist/bd-compts-hd.umd.min.js",
    "scripts": {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint",
      "test:unit": "vue-cli-service test:unit",
      "lib": "vue-cli-service build --target lib --name bd-compts-hd --dest dist src/components/index.js"
    },
    "...": "..."
  }
  ```
### 3. 修改.gitignore
  ```.gitignore
  ...
  # 提交时注释/public、/src、/tests
  # 发布时注释/dist
  # /dist
  /public
  /src
  /tests
  ...
  ```
### 4. 切换npm源
  配置权限，提示输入username, password, email，进行登录校验
  ```shell script
  npm adduser --registry http://10.1.4.161:8085/repository/bd-npm-release/
  ```
  切换NPM源
  ```shell script
  npm config set registry http://10.1.4.161:8085/repository/bd-npm-release/
  ```

  ### 5. 发布组件
  ```shell script
  cd bd-compts-hd
  npm run lib
  npm publish
  ```
## 外部工程引用步骤

### 1. 安装组件
```shell script
npm install bd-compts-hd
```
### 2. 工程内引用
```js
import bdComptsHd from 'bd-compts-hd'
import 'bd-compts-hd/dist/bd-compts-hd.css'

Vue.use(bdComptsHd)
```
## 组件列表  

### bd-borderWrap-hd
边框容器
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |flashDirection|闪光点运动方向（type1生效）|String|否|right|
  |tFlashDirection|闪光点运动方向（type2生效）|String|否|right|
  |evertDirection|翻转方向（type1生效）|String|否|botRight|
  |tEvertDirection|翻转方向（type2生效）|String|否|botRight|
  |opacityNum|背景透明度|String, Number|否|90|
  |flashShow|闪光点显示|Boolean|否|true|
  |styleChange|边框样式类型|String|否|type1|
  |borderColor| 边框颜色|String|否|-|
  |backgroundColor|边框背景颜色|String|否|-|
  |setBoderColor|是否设置边框颜色|String|否|false|
  |bdSize|边框尺寸 |String, Number|否|1|

### bd-button-hd
按钮组件
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |buttonText|按钮文本内容|String|否|按钮组件|
  |backgroundColor|背景颜色|String|否|#174f95| 
  |borderWidth|边框尺寸|Number|否|1|
  |borderColor|边框颜色|String|否|#2762ab|
  |lineType|边框样式|String|否|none|
  |fontSize|字体大小|Number|否|16|
  |fontColor|字体颜色|String|否|#fff|
  |isRadius|是否圆角|Boolean|否|false|
#### Events
  |事件名称|事件描述|回调参数
  |---|---|:---:|
  |buttonClick|点击按钮触发|-|
  
### bd-corner-hd
角组件
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |lineLength|角线长度|String, Number|否|10|
  |lineWidth|角线宽度|String, Number|否|2|
  |lineStyle|角线样式|String|否|solid|
  |lineColor|角线颜色|String|否|#0da2e7|
  |lineCombo|角线组合|Array|否|["topLine", "leftLine", "rigthLine", "bottomLine"]|

### bd-dataV-hd
DataV边框
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |displayId|边框名称ID|String|是|dv-border-box-1|
  
### bd-digitRoll-hd
数字滚动组件
#### Attributes
  |参数名|参数描述|参数类型|可选值|默认值|
  |---|---|:---:|:---:|---|
  |rollDigits|滚动到的数字|String, Number|-|1000|
  |dur|滚动持续时间，单位ms|String, Number|-|1000|
  |duration|渐进滚动每个数字延迟时间|String, Number|-|300|
  |milliseconds|自动滚动时间间隔|String, Number|-|1000|
  |flipStra|滚动时的翻屏策略|Function, Boolean|-|内部默认策略|
  |easeFn|滚动的缓动函数|String|'Linear', 'Quad.easeIn', 'Quad.easeOut', 'Quad.easeInOut','Cubic.easeIn', 'Cubic.easeOut', 'Cubic.easeInOut'|false|
  |digitFontSize|数字字体大小|String, Number|-|-|
  |digitFontColor|数字字体颜色|String|-|-|
  |autoRoll|自动滚动|Boolean|-|true|
#### Events
  |事件名称|事件描述|回调参数
  |---|---|:---:|
  |roll-start|数字动画滚动开始时触发|-|
  |roll-finish|数字动画滚动结束时触发|-|

### bd-flopDevice-hd
翻牌器
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |oridata|数据|Array|是|[]|
  |fontSize|数字字体大小|Number|否|40|
  |fontColor|数字字体颜色|String|否|#fff000|
  |unitName|单位名称|String|否|-|
  |unitFontSize|单位字体大小|Number|否|12|
  |unitColor|单位字体颜色|String|否|#fff|

### bd-header-hd
大屏头部
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |title|头部标题文本|String|否|-|
  |titleFontSize|头部标题字体大小|Number|否|-|
  |titleFontColor|头部标题字体颜色|String|否|-|

### bd-icon-hd
图标
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |metricIcon|图标样式类|String, Array|是|icon-A10122_goal|
  |metricIconSize|图标大小|Number|否|-|
  |metricIconColor|图标颜色|String|否|-|

### bd-iconKpiBlock-hd
图标指标块
#### Attributes
  |参数名|参数描述|参数类型|可选值|默认值|
  |---|---|:---:|:---:|---|
  |data|图标块数据|Object|data:{rows:[], columns:[]}|-|
  |metricValueFontSize|度量值字体大小|String, Number|-|null|
  |metricValueFontColor|度量值字体颜色|String|-|-|
  |metricUnit|度量单位|String, Array|-|-|
  |metricUnitFontSize|度量单位字体大小|String, Number|-|null|
  |metricUnitFontColor|度量单位字体颜色|String|否|-|
  |metricNameFontSize|度量名称字体大小|String, Number|-|null|
  |metricNameFontColor|度量名称字体颜色|String|-|-|
  |metricIcon|图标样式类|String, Array|-|icon-A10122_goal|
  |metricIconSize|图标大小|String, Number|-|null|
  |metricIconColor|图标颜色|String|-|-|
  |bgColor|图标块背景颜色|String|-|-|
  |borderColor|图标块边框颜色|String|-|-|
  |hoverBgColor|图标块悬浮背景颜色|String|-|-|
  |hoverBorderColor|图标块悬浮边框颜色|String|-|-|
  |width|图标块宽度|String, Number|-|null|
  |height|图标块高度|String, Number|-|null|
  |spacing|图标块间距|String, Number|-|10|
  |isCountTo|开启数字滚动|Boolean|-|true|
  |autoplay|自动播放|Boolean|-|true|
  |duration|持续时间，以毫秒为单位|Number|-|2000|
  |decimals|要显示的小数位数|Number|-|0|
  |decimal|十进制分割|String|-|.|
  |separator|分隔符|String|-|-|
  |prefix|前缀|String|-|-|
  |suffix|后缀|String|-|-|
#### Events
  |事件名称|事件描述|回调参数
  |---|---|:---:|
  |prevClick|点击上一页触发|e|
  |nextClick|点击下一页触发|e|
  |blockClick|点击图标块触发|item|

## 版本说明
### v1.0.189
**BUG修复**  
- 无

**新增功能**   
- 无

**优化功能**   
- 调整文本注释组件最大宽度

**接口调整**  
- 无
