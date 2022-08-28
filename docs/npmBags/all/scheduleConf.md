# 组件发布说明

将didp-develop-web工程中的部分组件发布成独立的组件供外部工程调用

## 发布步骤

### 1. 新增组件入口文件
  src/export/scheduleConf/index.js
  ```js
  import ScheduleConf from '@/components/business/rightMenu/scheduleConf/ScheduleConf';
  export { ScheduleConf }
   ```
### 2. 修改package.json
修改name、version，增加main、build-schedule-conf
```json
{
  "name": "bd-schedule-conf",
  "version": "0.0.1-test13",
  "private": false,
  "main": "./dist/bd-schedule-conf.umd.js",
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit",
    "build-schedule-conf": "node node_modules/@vue/cli-service/bin/vue-cli-service.js build --target lib --name bd-schedule-conf ./src/export/scheduleConf/index.js"
  },
  "...": "..."
}
```
### 3. 修改.gitignore
删除/dist目录、增加/src目录
```.gitignore
...
#/dist
/src
...
```
### 4. 切换npm源

配置权限，提示输入username, password, email，进行登录校验
```shell script
npm adduser --registry http://10.1.4.161:8085/repository/bd-npm-public
```
切换NPM源
```shell script
npm config set registry http://10.1.4.161:8085/repository/bd-npm-public
```

### 5. 发布组件
```shell script
cd path/to/ng-udap-develop
npm run build-schedule-conf
npm publish
```
## 外部工程引用步骤

### 1. 安装组件

```shell script
npm install build-schedule-conf
```

### 2. 工程内引用
```vue
import { ScheduleConf } from "bd-schedule-conf";
```
### 3. 参数说明

   |参数名|参数描述|参数类型|是否必填|默认值|
   |---|---|:---:|:---:|---|
   |scheduleConfHeight|界面高度|Number|否|-|
   |flowData|流程对象数据，目前为无用的参数|Object|否|-|
   |scheduleData|调度配置对象数据|Object|是|-|
   |taskId|任务ID，调度系统为任务模板ID|String|是|-|
   |taskDesc|任务描述，调度基本信息展示|String|否|-|
   |timeAttributes|调度类型|String|否|-|
   |extType|任务类型|String|是|-|
   |taskName|任务名称|String|是|-|
   |isDataSyncShowDisplay|只读display样式值|String|否|-|
   |isDataSyncShow|只读标识|Boolean|是|-|
   |platform|模块标识，1-开发中心 2-运维中心|Number|否|-|
   |transStore|transdata对象，传递全局Store对象|Object|是|-|
   |scheduleConfApi|接口api对象|Object|是|-|
   |isBlood|血缘开关标识|Boolean|否|true|
   |isAutoRecommend|自动推荐开关标识|Boolean|否|true|
   |dialogAppendToBody|弹窗是否加到body|Boolean|否|false|
   |minWidth|页面最小宽度|Number|否|880|
   |tablePageSize|表格分页|Array|否|\[5, 10, 20, 30, 50, 100, 200\]|
   |udapDict|全局字典对象数据|Object|是|-|
   |helpData|依赖规则帮助提示|Array|是|-|
   |scheduleCycleRequired|调度周期必填开关标识|Boolean|否|false|
   |judgeWarningDialogHeight|依赖切换校验弹窗顶部边距|String|否|30vh|
   |externInterfaceApi|接口api对象|Object|是|-|
   |isScheduleQuota|调度配额开关|Boolean|否|true|
   |isOldSchedule|旧聚合调度任务依赖查询开关|Boolean|否|false|
   |isDepUseCron|依赖规则是否启用cron表达式|Boolean|否|false|


## 版本说明  

### v0.0.8-test1  
**BUG修复**  
 - 无

**新增功能**   
 - 依赖规则支持cron表达式
 
**接口调整**  
 - 无

### v0.0.7-test6  
**BUG修复**  
 - 修复手动添加旧聚合依赖任务列表没有操作按钮图标

**新增功能**  
 - 无  


### v0.0.7-test5  
**BUG修复**  
 - 旧聚合调度接口没有assignDatetime的情况异常处理

**新增功能**  
 - 无  

### v0.0.7-test4  
**BUG修复**  
 - 旧聚合调度接口开关默认设置为false

**新增功能**  
 - 无  
 
### v0.0.7-test2  
**BUG修复**  
 - 修复新旧聚合开关切换时，请求未结束依然可以操作导致请求重复发送、表格数据冲突的问题

**新增功能**  
 - 旧聚合调度接口由前台查询运维接口改完后台调用接口  

### v0.0.7-test1  
**BUG修复**  
 - 无

**新增功能**  
 - 增加“旧聚合调度任务依赖查询开关”，开启后依赖列表手动添加中将会支持新旧聚合任务查询开关  
 
### v0.0.6-test2  
**BUG修复**  
 - 调度配置滚动条在窗口大小变化时，滚动条位置滚不到底问题

**新增功能**  
 - 无  
 
### v0.0.6-test1  
**BUG修复**  
 - 运维中心调度周期为“周”，依赖添加报“请先完整填写时间属性!”错误  

**新增功能**  
 - 无  
 
### v0.0.6  
**BUG修复**  
 - 运维中心调度周期为“月”，开启“定时”开关后，依赖添加报“请先完整填写时间属性!”错误  
 - 资源配额提示调整-调整无用的提示  

**新增功能**  
 - 无  

### v0.0.1  
**BUG修复**  
 - 时间属性中调度周期选择“月”，开启定时的情况下，具体时间选择了“月末”选项后，关闭定时，保存后打开，打开定时，点击依赖规则的手动添加弹窗，点击查询报未配置指定时间  

**新增功能**  
 - 时间属性中调度周期选择“月”，开启定时的情况下，具体时间选择了“月末”选项后，不允许同时再选择其它日期，反之同理  

### v0.0.1-test18  
**BUG修复**  
 - 修复配额开关关闭保存报错问题修复  
 
**新增功能**  
 - 无  
 
**接口调整**  
 - 无  

### v0.0.1-test17  
**BUG修复**  
 - 同步后配额值重置为1
 - 数据同步切换资源总额丢失
 - 添加一条配额，选择资源后总额为0  
 
**新增功能**  
 - 无  
 
**接口调整**  
 - 无  

#### v0.0.1-test1  
**功能说明**  
 - 新增调度配置组件  
 
**接口调整**  
 - 调度配额  
   - +/didp-develop-svc/v1/external/resource/getResourceTypeTree
   - +/didp-develop-svc/v1/external/resourceList
   - +/didp-develop-svc/v1/schedule/quota/max
 - 依赖关系  
   - +/didp-develop-svc/v1/schedule/upperScheduleTask
   - +/didp-develop-svc/v1/schedule/judgeDependTask  
