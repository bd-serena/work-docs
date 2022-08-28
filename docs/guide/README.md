# Vue组件开发流程

## 准备

::: tip 版本
Nodejs10+, vue2.0, cli3.0
:::

::: tip 安装vue全家桶
npm install –g @vue/cli 
:::

## vue组件包命名规范
::: tip
例：bd-font-icons bd-utils等
以bd开头，尽量不要出现nl，cmcc这样的开头字样
:::

## vue组件编写
### 新建项目、安装
   vue create my-library
### 编写组件
#### 1.新建一个中间文件main.vue

``` js
<template>
    <div :is="currentView" v-bind="$attrs" v-on="$listeners"></div>
</template>
<script>
import Button from '../button/moor-button';
import HelloWorld from '../hello-world/moor-hello-world';
import MoorInput from '../input/moor-input';
import Select from '../select/moor-select';

export default {
    name: 'big-data',
    props: {
        type: {
            default: '',
            type: String
        }
    },
    data() {
        return {
           currentView: 'Button'
        }
    },
    mounted() {
        this.currentView = this.type;
    },
    components: {
        Button,
        HelloWorld,
        MoorInput,
        Select
    },
    methods: {
       
    }
}
</script>
<style>
</style>

```

#### 2.子组件编写

``` js

<template>
  <button
    class="moor-button"
    @click="handleClick"
    :disabled="buttonDisabled"
    :autofocus="autofocus"
    :style="{'backgroundColor': bgcolor, 'borderColor': bdcolor, 'color': color}">
    <img :src="icon" v-if="icon">
    {{text}}
  </button>
</template>

<script>
export default {
  name: 'MoorButton',
  props: {
    buttonDisabled:{
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    bgcolor: {
      type: String,
      default: ''
    },
    bdcolor: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },

  },
  methods: {
    handleClick(evt) {
      this.$emit('click', this.text);
    }
  }
}
</script>

<style lang="scss" scoped>
.moor-button {
  padding: 6px 20px;
  font-size: 14px;
  border-radius: 4px;
  outline: none;
  color: #666;
  cursor: pointer;
}
</style>

```
::: tip 子组件编写要点
组件名 name
属性 props
事件 methods
:::

### 组件components/index.js
```  js
import main from './main/main.vue';

const components = [
    main
];
const install = function (Vue) {
  // 判断是否可以安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  // ElementExpand,
  main
}

```

### main.js 导入组件
``` js
import MyLib from './components/index';
Vue.use(MyLib);
```

### App.vue新增组件标签
``` html
<big-data type="Button" @click="handleEvents" bgcolor="blue" color = "#fff" text="我是按钮"></big-data>
```
### package.json配置
#### 1.name big-data
#### 2.private 设置成false
#### 3.scripts里增加一条编译命令
``` json
"build-bundle": "vue-cli-service build --target lib --name flock ./src/components/index.js"
```
#### 4.main输出目标文件
``` json
"main": "./dist/flock.common.js",
```
### 修改.gitignore文件
``` json
#/dist
/public
/src
/tests
```

### 编译
::: tip 命令行输入
npm run build-bundle
:::

## 发布到npm
::: tip 更改仓库位置
npm config set registry http://10.1.4.161:8085/repository/bd-npm-release/
:::
::: tip 登录
npm login，输入用户名bass，密码B_3!nlred1，邮箱，登录成功
:::
::: tip 发布
npm publish –access public
:::

