# 组件发布说明

将bd-compts-pc工程中的组件发布成组件包供外部工程调用

## 发布步骤

### 1. 新增组件入口文件
  src/components/index.js
  ```js
  import div from "./bd-div/index.js";
  import kpiBlock from "./bd-kpiBlock-pc/index.js";
  import title from "./bd-title-pc/index.js";
  import textarea from "./bd-textarea-pc/index.js";
  import modifyUser from "./bd-modifyUser-pc/index.js";
  import editPwd from "./bd-editPwd-pc/index.js";
  import SlideCode from "./bd-slide-code/index.js";
  import FilterMenu from "./bd-filterMenu-pc/index.js";
  import TextNote from "./bd-textNote-pc/index.js";

  const components = [div, kpiBlock, title, textarea, modifyUser, editPwd, SlideCode, FilterMenu, TextNote];

  const install = function (Vue) {
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
  export { div, kpiBlock, title, textarea, modifyUser, editPwd, SlideCode, FilterMenu, TextNote };
   ```
### 2. 修改package.json
  修改name、version，增加main、lib
  ```json
  {
    "name": "bd-compts-pc",
    "version": "1.0.74",
    "private": false,
    "main": "dist/bd-compts-pc.umd.min.js",
    "scripts": {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint",
      "test:unit": "vue-cli-service test:unit",
      "lib": "vue-cli-service build --target lib --name bd-compts-pc --dest dist src/components/index.js"
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
  cd bd-compts-pc
  npm run lib
  npm publish
  ```
## 外部工程引用步骤

### 1. 安装组件
```shell script
npm install bd-compts-pc
```
### 2. 工程内引用
```js
import bdComptsPc from 'bd-compts-pc'
import 'bd-compts-pc/dist/bd-compts-pc.css'

Vue.use(bdComptsPc)
```
## 组件列表  

### bd-editPwd-pc
密码修改组件，以弹窗方式对密码进行修改。
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |visible|是否显示 Dialog，支持 .sync 修饰符|Boolean|是|false|
  |closeOnModal|是否可以通过点击 modal 关闭 Dialog|Boolean|否|false|
  |closeOnEscape|是否可以通过按下 ESC 关闭 Dialog|Boolean|否|false|
#### Events
  |事件名称|事件描述|回调参数
  |---|---|:---:|
  |submitClick|点击确定按钮触发|-|
  |cancelClick|点击取消按钮触发|-|

### bd-modifyUser-pc
用户信息修改组件，以弹窗方式对用户信息的表单进行修改。
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |visible|是否显示 Dialog，支持 .sync 修饰符|Boolean|是|false|
  |closeOnModal|是否可以通过点击 modal 关闭 Dialog|Boolean|否|false|
  |closeOnEscape|是否可以通过按下 ESC 关闭 Dialog|Boolean|否|false|
#### Events
  |事件名称|事件描述|回调参数
  |---|---|:---:|
  |submitClick|点击确定按钮触发|-|
  |cancelClick|点击取消按钮触发|-|
  
### bd-title-pc
标题组件，可选择是否带图标
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |titletext|标题文本|String|是|未命名|
  |isShowfontIcon|是否显示图标|Boolean|否|true|
  |titleIconCls|图标样式类|String|否|icon-A10060_3square|
  |titleURL|标题链接|String|否|-|
  |fontSize|字体大小|Number|否|16|
  |fontWeight|字体粗细|String|否|-|
  |fontColor|字体颜色|String|否|-|

### bd-kpiBlock-pc
指标块组件组件，可左右切换。
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |data|数据|Object|是|-|
  |series|指标系列属性|Array|否|[]|
  |width|指标块宽度|Number|否|150|
  |spacing|指标块间距|Number|否|10|
  |latTitleHide|是否隐藏指标块标题|Boolean|否|false|
  |latTitleFontSize|指标块标题文字大小|Number|否|-|
  |latTitleFontColor|指标块标题文字颜色|String|否|-|
  |metricRowBig|系列首行放大|Boolean|否|true|
  |metricTitleHide|是否隐藏系列标题|Boolean|否|false|
  |priMetricTextAlign|系列首行文本对齐|String|否|-|
  |priMetricFontSize|系列首行文字大小|Number|否|-|
  |priMetricFontColor|系列首行文字颜色|String|否|-|
  |bgColor|指标块背景颜色|String|否|-|
  |borderColor|指标块边框颜色|String|否|-|
  |hoverBgColor|指标块悬浮背景颜色|String|否|-|
  |hoverBorderColor|指标块悬浮边框颜色|String|否|-|
  |metricSplitLineStyle|系列行分割线样式|String|否|-|
#### Events
  |事件名称|事件描述|回调参数
  |---|---|:---:|
  |prevClick|点击上一页按钮|e|
  |nextClick|点击下一页按钮|e|
  |nextClick|点击指标块触发|item|
  
### bd-slide-code
滑动验证组件
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |id|ID标识|String|否|-|
  |canvasWidth|画布宽度|Number|否|310|
  |canvasHeight|画布高度|Number|否|160|
  |pointX|目标块X坐标|Number|否|150|
  |pointY|目标块Y坐标|Number|否|90|
  |show|是否显示|Boolean|否|false|
  |imgs|图片链接|Array|否|-|
  |successText|验证成功文本内容|String|否|验证通过！|
  |failText|验证失败文本内容|String|否|验证失败，请重试|
  |sliderText|滑块区域指示文本|String|否|拖动滑块完成拼图|
#### Events
  |事件名称|事件描述|回调参数
  |---|---|:---:|
  |onSuccess|验证成功后执行操作|-|
  |refresh|刷新执行操作|-|
  |onFail|验证失败后执行操作|-| 
  |onClose|关闭执行操作|-| 

### bd-textarea-pc
文本框组件
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |editable|是否可编辑|Boolean|否|true|
  |bgColor|背景颜色|String|否|transparent|
  |radiusOn|开启边框圆角弧度|Boolean|否|false|
  |borderRadius|边框圆角弧度值|String|否|-|
  |borderWidth|边框粗细|Number|否|1px|
  |borderStyle|边框样式|String|否|none|
  |borderColor|边框颜色|String|否|#ccc|
  |textAlign|文本对齐|String|否|left|
  |textDecoration|文本方向|String|否|unset|
  |fontSize|字体大小|String|否|-|
  |fontFamily|字体系列|String|否|-|
  |fontWeight|字体粗细|String|否|-|
  |color|字体颜色|String|否|-|

### bd-textNote-pc
文本注释
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |textLable|标题文本|String|否|文字注释|
  |titleIconCls|标题图标样式类|String|否|icon-A10407_help|
  |noteContent|Tooltip的文本内容|String|否|自定义|
  |notePosition|Tooltip的出现位置|String|否|top-start|
  |noteBgStyle|Tooltip的背景颜色|String|否|dark|
  |iconSize|图标大小|Number|否|16|
  |iconColor|图标颜色|String|否|#000|
  |fontSize|字体大小|Number|否|16|
  |fontColor|字体颜色|String|否|#000|
  |fontWeight|字体粗细|String|否|normal|
  |isShowfontIcon|显示图标|Boolean|否|true|
  |isShowText|显示文本|Boolean|否|true|
  |disable|是否禁用|Boolean|否|false|

## 版本说明
### v1.0.74 
**BUG修复**  
- 无

**新增功能**   
- 无

**优化功能**   
- 调整文本注释组件最大宽度

**接口调整**  
- 无
