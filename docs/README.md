# Vue开发规范

## 开发工具说明
### 集成开发环境说明
::: tip bd私服
*  http://10.1.4.161:8085/repository/bd-npm-release/ 
*  http://10.1.4.161:8085/repository/bd-npm-public/
*  用户名bass
*  密码B_3!nlred1
:::

::: warning cnpm
遇到安装sass等问题时，尽量不用cnpm；采用项目中引入.npmrc的方式
:::
#### .npmrc
``` js
phantomjs_cdnurl=http://cnpmjs.org/downloads
sass_binary_site=http://npm.taobao.org/mirrors/node-sass/
```

## 开发规范
### 配置文件规范
开发人员不要擅自修改如下配置文件：
``` js
eslintrc.js
vue.config.js
.npmrc
package.json
package-lock.json
```
### 代码格式化规范
规范必须开启，在vue.config.js中开启（具体规范规则说明在文件eslintrc.js中定义）：
``` js
//  是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效
lintOnSave: true,
// 浏览器开启时提示警告及错误
overlay: {
      warnings: true, 
      errors: true
    }
```
::: warning 禁止操作
之前有同事为了开发方便，直接将浏览器的警告及错误提示遮罩用样式直接隐藏，这种方式不允许
:::

### 参数传递规范
用vuex做状态管理，父子组件，路由之间传递参数的方式仅适用于简单场景，为了统一规范，均采用vuex。

### 语法规范
::: tip
详见开发指南下的[eslint](./guide/rules/)  
详见sonar质量配置中定义的[BigData_javascript](http://10.1.8.6:9200/coding_rules?activation=true&qprofile=AXNbw9TjPAhAiyWjYAD2)
:::

### 前后端分离要求
前后端分离后，对于后端服务的访问，不允许加上ip地址，端口信息等，前端代码调用服务通过http的资源路径进行请求，服务请求都是通过本地devServer代理配置（本地调试）或者nginx（部署环境）进行转发，避免直接访问服务的实际地址。
#### 本地调试
本地调试时，服务信息配置在vue.config.js中devServer部分；，devServer>proxy部分配置信息如下：
``` js
proxy: {
      '/api': {
        target: 'http://10.1.8.1:23000', // nginx的地址，不要是服务的实际地址。
        ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }

```
#### 部署环境
不管是开发，还是测试、生产的部署，统一采用nginx统一反向代理。配置示例如下：
``` js
ng

```
#### 前端发布物
前后端分离后，前端目前只有静态文件，为满足发布物能在各地市部署，并且能区分多个不同产品的发布包，在vue工程发布编译过程中对dist打包：
* 首先安装文件管理插件
``` js
npm install filemanager-webpack-plugin -D
```
* 在vue.config.js中引入
``` js
const FileManagerPlugin = require('filemanager-webpack-plugin')
```
* 在chainWebpack中添加如下代码：（其中vuedemo根据自己项目名称定义）
``` js
config.plugin('fileManager')
      .use(FileManagerPlugin)
      .tap(c => {
        c[0] = {}
        c[0].onEnd = {
          mkdir: [
            './vuedemo/vuedemo'
          ],
          copy: [
            { source: './dist/', destination: './vuedemo/vuedemo' }
          ],
          archive: [
            { source: './vuedemo',
              destination: './dist/vuedemo.tar.gz',
              format: 'tar',
              options: {
                gzip: true,
                gzipOptions: {
                  level: 1
                },
                globOptions: {
                  nomount: true
                }
              } }
          ],
          delete: [
            './vuedemo'
          ]
        }
        return c
      })
```
## 会话、认证与鉴权管理
详见ngbd-utils工具包
## 团队协作说明
### UIUE统一样式管理要求与流程
* reset.css，作为通用样式重构,封装在ngbd-utils工具包里，
使用方式：在main.js中直接
``` js
import "ngbd-utils/css/reset.css"
```

* 为后续换肤考虑，界面中颜色及常用部分需提取到scss中作为变量（换肤流程待维护）：
``` js
$main-color: #409eff; //主色调
$bg-clr01:#0a2b4c; // 框架头部背景色
$font-clr01:#fff; // 字体颜色1
$font-clr02:#333; // 字体颜色2
$font-clr03:#45fffd;// 字体颜色3
$bg-clr02:#2f5377;// 侧边菜单颜色
$bg-clr03:#d3d8e4; // 内容区域背景色
$bg-clr04:#fff; //区域背景色04
$border-clr01: #dcdfe6; // 边框色1
$warn:#E6A23C;  // 警告色
$error:#F56C6C; // 错误色
```

* 任务提交到测试后需一并通知uiue对开发后的界面做二次审计,uiue的审计流程可以提升前端开发的样式敏感度
* elementui使用规范：

::: tip elementui
* 按钮，表单等统一使用size=”mini”尺寸
* 布局容器不要过多嵌套
* this关键字使用时要注意作用域
* display:flex ie10及以下兼容问题
* 分页居右
* 表单label-width根据表单中最长的label宽度定义；表单label统一右对齐，不需要冒号
* 表格统一采用组件默认的左对齐，均使用border属性，表头需要背景色#f5f7fa，除非特殊要求另外处理
* 输入框和下拉框中都有模糊搜索功能，功能大致相似，但下拉框的模糊搜索框失去焦点后输入的内容消失，而输入框的问题则是不能在下拉面板中加入类似‘加载更多’的功能。因此使用时请根据实际情况选择组件，切勿随意套用
* 提示框，提示窗口都有字母和数字不换行的问题，建议在element-variables.scss文件里加上样式重置代码.el-message-box__message p，.el-message__content { word-break: break-all}
*  表格内操作栏中的图标间距统一用20px
*  弹窗位置使用组件设置的默认距离，没有特殊要求，请不要设置垂直位置
*  折叠面板组件下文字字体默认是13px, 需要在项目中统一调整为14px
*  查询条件名称后面不要带“：”
*  表格右上方操作按钮（统一要求图标加文字的方式）要右对齐表格，并且和表格之间的间距为8px
*  多个按钮之间间距用15px
*  操作图标，鼠标移入时需要有颜色变化，变化为原色基础上加0.6透明度
:::

### VUE插件选型要求与流程
>开发人员提出需求由uiue统一评估并形成报告输出，或者开发人员形成一定的分析结论后提交到uiue进行评审。
>选型依据可参考github上的各种参数，并且支持MIT、GPL等软件授权条款。

### 版本管理说明
#### 通用模块/依赖版本管理
>UIUE会提供一份常用/通用项目依赖模块配置文件，作为各项目中用到相关模块版本的优先参考，文件会根据实际情况进行版本升级，并统一通知到各项目组。
#### 版本锁定严格执行
>package-lock.json诞生的目的是为了防止出现同一个package.json却产生了不同的运行结果. package-lock.json在npm 5时添加进来, 所以如果你使用5以上的版本, 你就会看到这个文件, 除非你手动禁用掉它. 所以从此以后npm会根据package-lock.json里的内容来处理和安装依赖而不是根据package.json. 因为pacakge-lock.json给每个依赖标明了版本, 获取地址和哈希值, 使得每次安装都会出现相同的结果. 不管你在什么机器上面或什么时候安装。



