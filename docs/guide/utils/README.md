# ngbd-utils工具类使用文档
::: tip 安装
npm install ngbd-utils --save-dev
:::
## request.js
>基于axios封装的service
* 引用：在api中引入service，并统一定义接口（post用data, get用params），例
``` js
import { service } from 'ngbd-utils'

export const getPersonInfo = data => {
  return service({
    url: '/person_pay/getpersoninfo',
    method: 'post',
    data
  })
}
```

* 提示方式提供默认的Message, 如有需要改变提示方式，可以用属性tipType，属性值参考element提示方式组件
``` js
export const getPersonInfo = data => {
  return service({
    url: 'udap-develop-svc/v1/publish/taskSubmit',
    method: 'post',
    data,
    tipType: 'Notification'
  })
}
```

* 也可自定义ContentType格式类型，默认为
'application/json;charset=UTF-8'
	
* 是否需要加载中的遮罩提示, 默认都有，如果maskOff设置为true则不需要加载提示
``` js
export const getPersonInfo = data => {
  return service({
    url: 'udap-develop-svc/v1/publish/taskSubmit',
    method: 'post',
    data,
    tipType: 'Notification',
    maskOff: true
  })
}
```

* 请求超时时间timeout可设置大于0的时间(以ms为单位)，如果设置为-1表示取消请求超时设定，不设置则采用统一默认超时时间60000ms

* 根据项目中配置的window._crs_rqst_sx_vrf判断是否需要越过session认证，默认为false,即要走认证，如果设置为true，则不走，具体使用：
::: tip 认证配置
1.	在项目plugins下新增common.js公共配置文件，写入window._crs_rqst_sx_vrf=true
2.	在main.js文件最开始处（或router前）写入import ‘common.js的路径’
:::

* 如果特殊情况需要外部自己的错误提示处理，可以在请求参数中传outerError: true

* 具体使用
``` js
<script>
import { getPersonInfo } from './api/api'
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  async created() {
    let taskType = await getPersonInfo ({ sceneId: '1400' });
    console.log(taskType)
  }
};
</script>
```
::: tip 异常提示
使用（无论成功失败，均返回response内容，但错误提示默认已有，业务代码中请勿做重复提示）
:::
::: warning 注意
不影响原生axios使用，如特殊业务需求情况下需要直接使用原生axios的也可以，但常规下还是按照规范使用
:::
## 公共reset.css
直接在main.js中引入，全局通用
``` js
import "ngbd-utils/css/reset.css"
```
## UUID获取唯一编码
使用：
``` js
<script>
import { getUuid } from "ngbd-utils"
export default {
  name: "Home",
  mounted() {
    let UUID = getUuid()
    console.log(UUID)
  }
};
</script>
```

## 日期工具类date.js
使用：
``` js
<script>
import { formatDate } from "ngbd-utils"
export default {
  name: "Main",
  mounted() {
    let date = formatDate(new Date(), 'YYYY-MM-DD')
    let date1 = formatDate(new Date(), 'YYYY-MM')
    console.log(date)
    console.log(date1)
  }
};
</script>
```

## 加解密工具AESUtil.js
>密匙和偏移量两个值前后端请保持一致
* >let globalIV = "bd-tool-aes-util" // 注意IV必须是 16 个字节 8*16 = 128 位
* >let globalAeskey = "bd-tool-aeskey-s" // 必须是 16 个字节 8*16 = 128 位

使用：
先在本项目中安装插件
``` js
npm install -save crypto-js -D
```
``` js
/* 示例：
let content = "466368675"
// 加密：
let encrypted = AESUtil.encrypt(content);
// 解密：
let decrypted = AESUtil.decrypt(encrypted);

console.log("加密之后的密文为：" + encrypted)
console.log("解密之后的明文为：" + decrypted)
console.log("原始明文为：" + content)
console.log("解密之后是否与之前相同：" + (content === decrypted)) */
```

## 会话与安全认证管理工具routerCommon.js
登录地址的安全管理工具，需配合后台会话管理机制使用（详情咨询潘桦），在现有vue项目中统一采用路由守护的方式做认证和拦截；
::: warning
此工具要求系统默认页面必须走路由的方式！！！
:::
使用：
在路由文件router.js中参考下图进行如下操作
>1.	引入插件
>2.	修改实例化路由写法先const然后export
>3.	Meta下设置requireAuth(true表示必须走安全认证，false表示跳过，默认情况下是false)
>4.	调用工具类的bdRouterControl(router)方法
``` js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/bdNpmRelease',
      name: 'bdNpmRelease',
      component: bdNpmRelease,
      meta: {
        keepAlive: true
      }
    }
  ]
});

export default router;
// 路由守护
routerCommon.bdRouterControl(router)
```
::: tip 跳过
注意：为了满足部分路由可跳过此安全认证，在路由中添加meta>requireAuth，设置为true表示需要走安全认证，为false则表示可跳过。如非特殊情况，建议统一设置为true
:::

## 组件间数据交换transData.js
::: tip Store(不是vuex的状态)
所有项目中引用transData的地方，例如
``` js
import Store from '@/plugins/transData.js'  
```
改成
``` js
import { Store } from 'ngbd-utils'
```
:::

## 公共方法commonFunc.js
### 单点登录外系统拼接session_id方法：spliceSessionId
``` js
const spliceSessionId = async function (url) {
  // 验证session,不通过：弹窗提示session过期，返回false?
  // 通过：
  // 判断url中是否有open_env
  // 没有，直接返回原url
  // 有，返回原url后新增参数session_id=abc
  // 会话存在时
}
```

使用：

>引入

``` js
import { bdCommonFunc } from 'ngbd-utils'
```

>使用时需要用await
``` js
async openExtUrl () {
  // open_env=1
  let url = 'http://10.1.8.6:23000/dataeleph/#/view?external_callback_url=https://www.baidu.com/&open_env=1';
  let retUrl = await bdCommonFunc.spliceSessionId(url);
  console.log(retUrl);
}
```

## 全局方法
>提供给通过iframe方式嵌入框架的页面使用,需要框架页面有注册相应的方法，例
``` js
Store.$on('tabAdd', param => {
  // 框架中实际打开tab方法
})
```
### 打开框架tab方法
``` js
// 框架打开tab方法，iframe里用window.top.tabAdd(parm)调用
window['tabAdd'] = param => {
  Store.$emit('tabAdd', param);
}
```
iframe里页面调用方式
``` js
window.top.tabAdd(param)
```
### 关闭框架tab方法
``` js
// 框架打开tab方法，iframe里用window.top.tabAdd(parm)调用
window['tabDel'] = param => {
  Store.$emit('tabDel', param);
}
```
iframe里页面调用方式
``` js
window.top.tabDel(param) // param是需要关闭的tab的名称name
```
### 打开框架新增实体dialog方法
``` js
// 框架打开新增实体对话框，iframe里用window.top.openAddEntityDialog()调用
window['openAddEntityDialog'] = () => {
  Store.$emit('openAddEntityDialog');
}
```
iframe里页面调用方式
``` js
window.top.openAddEntityDialog() 
```

## 版本说明  
### v2.0.43
**BUG修复**  
 - window.tipCloseEnabled（在工程的windowcommon.js配置）用来控制整个工程级别的serivce的错误提示是否要显示关闭按钮，默认是不显示，优先级：单个service内的tipCloseEnabled>window.tipCloseEnabled
### v2.0.41
**BUG修复**  
 - service添加tipCloseEnabled属性，用以设置错误提示是否显示关闭按钮，默认是不显示;

### v2.0.39
**BUG修复**  
 - 修复formatDate工具函数接收date对象时报.replace not function的问题;
 
### v2.0.38
**BUG修复**  
 - 修复date.js文件formatDate工具函数在ie返回NaN的问题;

### v2.0.53
**功能调整**  
 - 新增spliceSessionId公共方法，用于外系统验证sessionid
