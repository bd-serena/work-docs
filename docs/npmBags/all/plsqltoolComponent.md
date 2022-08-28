# 组件发布说明

将edc-plsqltool-component工程中的组件发布成组件包供外部工程调用

## 发布步骤

### 1. 新增组件入口文件
  src/components/index.js
  ```js
  import center from './components/AceEditor.vue';
  export { center };
   ```
### 2. 修改package.json
  修改name、version，增加main、lib
  ```json
  {
    "name": "vue-nl-interaction-sql",
    "version": "1.0.250",
    "private": false,
    "main": "./dist/interaction-sql.umd.js",
    "scripts": {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint",
      "test:unit": "vue-cli-service test:unit",
      "lib": "vue-cli-service build --target lib --name interaction-sql --dest dist ./src/index.js"
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
  cd edc-plsqltool-component
  npm run lib
  npm publish
  ```
## 外部工程引用步骤

### 1. 安装组件
```shell script
npm install vue-nl-interaction-sql
```
### 2. 工程内引用
```js
import { center } from 'vue-nl-interaction-sql'

<center ref="center" :datas.sync="testCenter"></center>
```
## 组件列表  

### testCenter
sql编辑器组件--初始化编辑框参数
#### Attributes
  |参数名|参数描述|参数类型|是否必填|默认值|
  |---|---|:---:|:---:|---|
  |isComplete|是否为完整版 true完整 false只有编辑框|Boolean|是|-|
  |isStopClicked|停止按钮 false：置灰 true：激活|Boolean|是|-|
  |isActive|执行按钮 false：置灰 true：激活|Boolean|是|-|
  |isChanged|是否更改按钮 false:置灰 true：激活|Boolean|是|-|
  |editAble|编辑器是否可编辑|Boolean|是|-|
  |isShowRight|是否展示函数框|Boolean|是|-|
  |limits|校验SQL语句数量限制，负数表示不限制|Number|是|5|
  |dbType|资源类型|String|是|-|
  |user_id|用户id|String|是|-|
  |sqlToolPath|请求接口地址前缀|String|是|-|
  |sqlToolAPI|请求接口路径前缀|String|是|-|
  |sqlstring|编辑器初始化sql语句|String|是|-|
  |sysId|系统ID|String|是|-|
  |componentService|外部接入注册地址，例如：'REG_QUERYTABLELIST_UDAP'|String|是|-|
  |curLinkInfo|当前连接信息，见（curLinkInfo)|Object|是|-|
  |isTestSubColumns|是否做敏感字段权限校验，"1"：是，"0"：否|String|是|-|
  |runnableStoredProcedures|校验时是否运行存储过程 '1' 为执行，‘0’为不执行|String|否|'1'|
#### curLinkInfo
```js
{
  "dbResourceBeans": {
    "resource_id": "C4FCC9055EFDC7E455851290BEB211E7",
    "dbConnectionBeans": {
      "conn_name": "hive_节点",
      "conn_name_en": "udap_hive_dev"
    },  
    "resource_name": "Hive_连接管理",
    "resource_type": "hive"
    },
  "tenant_id": "T100000041",
  "tenant_name": "新大陆"
}
```
### 保存按钮
提供给保存方法，提供获取编辑框内容的方法（纯sql语句）
#### 调用方式
```js
  this.$refs.center.$refs.center.save()
```

### 执行按钮
提供执行方法
#### 调用方式
```js
this.$refs.center.$refs.center.execute(executeStyle,expVarBeans)
```
#### executeStyle
1-同步执行 2-异步执行 3-执行计划
#### expVarBeans
  用作变量翻译的变量列表，如：
```js
[{name:'xxx', value:'xxx'},...]
```

### 停止按钮
提供停止方法
#### 调用方式
```js
this.$refs.center.$refs.center.stop()
```
### SQL美化按钮
提供格式化方法
#### 调用方式
```js
this.$refs.center.$refs.center.formatCode()
```
### 停止按钮
提供停止方法
#### 调用方式
```js
this.$refs.center.$refs.center.stop()
```
### 语法校验
提供语法校验方法，支持sql校验和权限校验的功能
#### 调用方式
```js
this.$refs.center.$refs.center.testGrammar(isTestAuthorityVer).then(res => {});
```

#### isTestAuthorityVer
|参数名|参数描述|参数类型|是否必填|默认值|
|isTestAuthorityVer|是否开启权限校验|Boolean|是|-|

### 执行计划按钮
提供执行计划方法
#### 调用方式
```js
this.$refs.center.$refs.center.execute(executeStyle,expVarBeans)
```
#### executeStyle
1-同步执行 2-异步执行 3-执行计划
#### expVarBeans
用作变量翻译的变量列表，如：
```js
[{name:'xxx', value:'xxx'},...]
```

### 执行历史
提供执行历史的微服务接口，支持按执行类型和日期条件，支持分页查询，编辑框需要只读方式显示
#### 提供方法名称
```js
"/edc-plsqltool-ms-ora/v1/querydata/queryExecuteLogs"
```
#### Attributes
|参数名|参数描述|参数类型|是否必填|默认值|
|---|---|:---:|:---:|---|
|user_id|用户id|String|是|-|
|sys_id|systemID|String|是|-|
|start_time|起始时间|String|是|-|
|end_time|结束时间|String|是|-|
|start_page|起始页码|String|是|-|
|page_num|每页记录数|String|是|-|
如：
```js
{
	"user_id": "9990035",
	"sys_id" : "123",
	"start_time": "2019-10-25",
	"end_time": "2019-10-26",
	"start_page": "0",
	"page_num": "10"
}
```
### 执行历史（页面双击）
双击执行历史记录，组件显示对应sql和结果集
#### 调用方式
```js
this.$refs.center.$refs.center.executeHistory(item)
```
#### item
运行日志内容，如；

```js
item: {
"executeLogs": [
      {
        "real_sqlstring": "select * from temp_test11",
        "utime": "581毫秒",
        "db_type": "hive",
        "sqlstring": "select * from temp_test11",
        "status": "2",
        "group_id": "b5213d6a1656492a880110cef9519a28",
        "conn_id": "FB8A85495A54CC0392486330EF8011E8",
        "tenant_id": "34234234",
        "ip": "4bc94556-567a-4419-88fe-70d317b80ac6",
        "id": "3b39f5c6355e4cb9be85a4fe1b5c4e0e",
        "resource_id": "C4FCC9055EFDC7E455851290BEB211E7",
        "keycol": "SELECT",
        "create_time": "2019-10-10 17:37:13.719",
        "result_info": "{\"respData\":{\"executeType\":\"DQL\",\"is_success\":true,\"result_col_list\":[{\"col_id\":\"id\"},{\"col_id\":\"name\"}],\"result_data_list\":[{\"data_list\":[{\"data_val\":\"111\"},{\"data_val\":\"jdbc\"}]},{\"data_list\":[{\"data_val\":\"11\"},{\"data_val\":\"22\"}]}],\"sql\":\"select * from temp_test11\",\"timeConsume\":\"581毫秒\"},\"respResult\":\"1\"}",
        "user_id": "9990035",
        "run_mode": "syn",
        "execute_type": "DQL"
      }
    ],
    "log_time": "2019-10-10 17:37:13"
 }
```
## 版本说明
### v0.1.250
**BUG修复**  
- 无

**新增功能**   
- 新增runnableStoredProcedures 参数，作为校验时是否运行存储过程 '1' 为执行，‘0’为不执行

**优化功能**   
- 无

**接口调整**  
- 无
