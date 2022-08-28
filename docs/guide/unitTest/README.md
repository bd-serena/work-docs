## 1引言
### 1.1概述
本手册主要提供给内部开发人员使用，通过指导编写前台单元测试并集成版本控制钩子，使开发人员每次提交代码前都可以对提交内容执行测试与纠错，达到以下效果减少问题，提高代码质量，快速定位问题、减少调试时间，降低人工测试的成本，保证该库在后续的开发维护过程中不会出现意料之外的问题。
### 1.2预期读者
 - 测试人员 - 补充单元测试功能点
 - 前端WEB开发人员 - 标记已完成的功能点  
### 1.3阅读建议
通过阅读本文的，测试与开发人员应从共同维护的[《数据集成与开发单元测试功能点.xlsx》](http://10.1.8.66:7080/BDRDP/CCT/trunk/Develop/Design/DIDP/ServiceDesign/%E5%BC%80%E5%8F%91%E4%B8%AD%E5%BF%83/%E6%95%B0%E6%8D%AE%E9%9B%86%E6%88%90%E4%B8%8E%E5%BC%80%E5%8F%91%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E5%8A%9F%E8%83%BD%E7%82%B9.xlsx)文档开始，逐步完善工程内部的单元测试代码，并设置覆盖率阈值，达到每次提交时具有有效的质量保障：  




## 2接入说明
### 2.1参考工程
数据集成与开发： 
http://10.1.8.154:7080/BASS-BDCP/ng-udap/didp-develop-web.git

数据集成与开发 - 运维中心：
http://10.1.8.154:7080/BASS-BDCP/ng-udap/didp-maintain-web.git

### 2.2目录结构
```
test
|____unit
| |____specs
| | |____components
| | | | |____data
| | | | | |____exampleComp.js
| | |____exampleComp.spec.js
| | |____views
| | | |____exampleView.spec.js
| | | |____data
| | | | |____exampleView.js
| | | |____exampleView.spec.js
| |____setup
| | |____jest.setup.js
| |____README.md
| |____common
| | |____common.js
```

|**目录**|**目录****说明**|
|---------------|------------------------------------------------------------------------------|
|test/unit|单元测试目录|
|test/unit/specs|测试源码，目录结构同src源码相同，伪造的mock数据，位于单元测试文件所在目录的data目录下，所有\*.spec.js格式的文件都会被识别为单元测试源码|
|test/unit/setup|jest环境配置目录|
|test/unit/comon|源码所需环境准备目录|
	


### 2.3环境准备
#### 2.3.1增加npm开发依赖
```shell
npm install @babel/plugin-syntax-dynamic-import @jest/globals @vue/test-utils babel-core identity-obj-proxy jest-canvas-mock vue-jest jest-serializer-vue jest husky lint-staged --save-dev
```


|**依赖项**|**说明**|
|-----------------------------------|------------------------|
|@babel/plugin-syntax-dynamic-import|适配vue\-router的动态import语法|
|@jest/globals|eslint语法检查对jest的环境支持|
|@vue/test-utils|vue测试套件|
|babel-core|ecmascript语法兼容适配|
|identity-obj-proxy|jest对样式文件的适配|
|jest-canvas-mock|jest对canvas测试的适配|
|vue-jest|使jest识别vue类型的文件|
|jest-serializer-vue|jest生成快照时vue的实例序列化工具|
|jest|jest测试|
|husky|集成git钩子工具|
|lint-staged|支持对特定的文件执行命令|
	

#### 2.3.2补充jest配置（package.json）
```json
{...
"scripts": {
...
"test": "jest"
},
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,vue}": ["jest --collectCoverage=false --findRelatedTests", "eslint --fix"]
  },
"jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "vue"
    ],
    "moduleNameMapper": {
      "\\.(css|less|scss)$": "identity-obj-proxy",
      "@/(.*)$": "<rootDir>/src/$1",
      "#/(.*)$": "<rootDir>/test/unit/$1",
      "bd-font-icons": "identity-obj-proxy"
    },
    "transform": {
      ".*\\.(vue)$": "vue-jest",
      "^.+\\.(js|jsx)$": "babel-jest",
      "node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js": "babel-jest"
    },
    "testURL": "http://10.1.8.2:23000/",
    "setupFilesAfterEnv": [
      "<rootDir>/test/unit/setup/jest.setup.js",
      "jest-canvas-mock"
    ],
    "collectCoverageFrom": [
      "src/utils/**/*.{js,vue}",
      "!src/utils/auth.js",
      "!src/utils/request.js",
      "src/components/**/*.{js,vue}"
    ],
    "snapshotSerializers": [
      "<rootDir>/node_modules/jest-serializer-vue"
    ],
    "coverageDirectory": "<rootDir>/test/unit/coverage",
    "collectCoverage": true,
    "coverageReporters": [
      "lcov",
      "text-summary"
    ]
  },
...
}
```
|**配置项**|**说明**|
|--------------------|----------------------------------------------------------------------------|
|scripts.test|配置npm命令|
|moduleFileExtensions|扫描测试源码后缀|
|moduleNameMapper|路径别名定义|
|transform|将对应的源码转换成可同jest兼容的格式|
|testURL|涉及请求的接口地址|
|setupFilesAfterEnv|jest环境相关配置文件|
|collectCoverageFrom|覆盖扫描路径|
|snapshotSerializers|生成快照所使用的序列化工具|
|coverageDirectory|覆盖报告生成目录|
|collectCoverage|覆盖分析开关|
|coverageReporters|覆盖报告生成内容指定|
|husky|配置钩子在提交前（gitstage）阶段触发lint-staged命令|
|lint-staged|对指定的文件执行eslint代码纠错及jest对受影响的代码单元测，如果当前提交的代码涉及到的单元测试较多，则会影响提交速度|
	
#### 2.3.3补充babel配置（babel.config.js）
```javascript
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-syntax-dynamic-import']
};
```

|**配置项**|**说明**|
|-------|--------|
|presets|语法兼容预设|
|plugins|语法兼容插件|
	

#### 2.3.4补充eslint配置（eslintrc.js）
```javascript
module.exports = {
  ...
  env: {
    ...
    "jest/globals": true
  },
  "plugins": [
    ...
    "jest"
  ],
  rules: {
    ...
	"jest/no-disabled-tests": "warn",
	"jest/no-focused-tests": "error",
	"jest/no-identical-title": "error",
	"jest/prefer-to-have-length": "warn",
	"jest/valid-expect": "error"
  }
};
```

|**配置项**|**说明**|
|-------|--------------------|
|env|eslint运行环境，补充jest的支持|
|plugins|代码检查与修复补充jset的支持|
|rules|eslint检查规则|
	

## 3开始编写
### 3.1预配置
#### 3.1.1运行时环境配置（jest.setup.js）
```javascript
import { config } from '@vue/test-utils';
jest.setTimeout(30000); // 设置setTimeout最大超时时长限制为30秒
config.stubs.transition = false; // 禁用dom过渡动画
```
#### 3.1.2通用辑封装（common.js）
参考具体工程文件，该文件封组件装加载所需的环境准备和对象创建逻辑，避免每个测试代码中出现冗余重复的代码。
### 3.2编写测试
#### 3.2.1单一组件测试
如果待测试组件不依赖其自组件的加载，则可以使用shallowMount加载当前组件，并忽略其子组件的加载，效率最高。
```javascript
import common from '#/common/common'; // 引入通用逻辑
import ListItem from '@/components/realtimeTask/ListItem'; // 引入组件
import * as mockData from './data/listItem.js'; // 引入伪造数据
describe('ListItem', () => {
// 使用done回调函数，将会在执行done时结束单元测试，否则会在代码片段结束处结束
  it('ListItem - 故障', async (done) => {
await common.init(); // 调用通用逻辑初始化，比如session与userInfo信息初始化
    common.store.replaceState(mockData.state);
    mockData.props.source.taskStatus = '故障';
    const wrapper = common.shallowMount(ListItem, {
      propsData: mockData.props,
      store: common.store,
      localVue: common.localVue
    });
    expect(wrapper.vm.curInterval).toBeNull();
    done();
  });
});
```
#### 3.2.2包含子组件的测试
如果待测试组件或测试的功能点依赖当前组件其自组件的数据或加载，则使用mount，将会触发所有子孙组件的加载。
```javascript
import common from '#/common/common';
import InstanceMonitor from '@/views/InstanceMonitor';
import * as mockData from './data/instanceMonitor.js';
describe('周期实例', () => {
  it('周期实例 - 模糊搜索', async (done) => {
    common.store.replaceState(mockData.state);
    const wrapper = common.mount(InstanceMonitor, {
      store: common.store,
      localVue: common.localVue,
      router: common.getRouter()
    });
    expect(wrapper.vm.taskFullInfoData).toMatchObject(mockData.initTaskFullInfoData);
    wrapper.vm.taskNameInputVal = '测试02';
    wrapper.vm.queryFixTimeRangeInputVal = null;
    await wrapper.vm.initGetTaskFullInfoData();
    wrapper.vm.$watch('taskFullInfoData', function (newValue, oldValue) {
      expect(wrapper.vm.taskFullInfoData).toHaveLength(1);
      expect(wrapper.vm.taskFullInfoData[0].taskName).toBe('测试02');
      done();
    });
  });
});
```
#### 3.2.3测试路由更新
当需要测试某个逻辑是否触发当前路由更新，需要在mount方法中传入路由对象，在更新逻辑执行后，检查实例$route对象是否更新，与一般测试传入common.router不同，当前路由对象需要通过调用common.getRouter()获取新的路由对象。
```javascript
import common from '#/common/common';
import MainIndex from '@/views/MainIndex.vue';
import { VePie } from 'v-charts';
describe('运维首页', () => {
  it('实例执行概览/任务类型分布 - 饼状图 - 初始化', async (done) => {
    const wrapper = common.mount(MainIndex, {
      store: common.store,
      localVue: common.localVue,
      router: common.router
    });
    const vePieWrappers = wrapper.findAllComponents(VePie);
    expect(vePieWrappers).toHaveLength(2);
    const instStatePie = vePieWrappers.at(0);
    const taskPie = vePieWrappers.at(1);
    expect(instStatePie.vm.data.rows).toHaveLength(4);
    expect(taskPie.vm.data.rows).toHaveLength(5);
    done();
  });
  it('实例执行概览 - 饼状图 - 跳转', async (done) => {
    const wrapper = common.mount(MainIndex, {
      store: common.store,
      localVue: common.localVue,
      router: common.getRouter()
    });
    wrapper.vm.initChartEvents();
    await wrapper.vm.$nextTick();
    const vePieWrappers = wrapper.findAllComponents(VePie);
    expect(vePieWrappers).toHaveLength(2);
    const instStatePie = vePieWrappers.at(0);
    const clickEvent = new Event('click');
    clickEvent.name = '成功';
    await instStatePie.vm.echarts.trigger('click', clickEvent);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.name).toEqual('instanceMonitor');
    done();
  });
  it('任务类型分布 - 饼状图 - 跳转', async (done) => {
    const wrapper = common.mount(MainIndex, {
      store: common.store,
      localVue: common.localVue,
      router: common.getRouter()
    });
    wrapper.vm.initChartEvents();
    await wrapper.vm.$nextTick();
    const vePieWrappers = wrapper.findAllComponents(VePie);
    expect(vePieWrappers).toHaveLength(2);
    const taskPie = vePieWrappers.at(1);
    const clickEvent = new Event('click');
    clickEvent.name = '未知';
    await taskPie.vm.echarts.trigger('click', clickEvent);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.name).toEqual('taskMonitor');
    done();
  });
});
```

## 4覆盖率
### 4.1执行测试
```shell
npm run test 
```
更多命令参考：https://jestjs.io/docs/zh-Hans/cli
### 4.2控制台输出
开启覆盖率收集开关后，每次执行完所有单元测试，将会在控制台输出如下覆盖率概述
```
================== Coverage summary ========================
Statements   : 2.23% ( 51/2285 )
Branches     : 0.23% ( 3/1302 )
Functions    : 2.5% ( 13/521 )
Lines        : 2.29% ( 51/2223 )
============================================================
```
### 4.3报告生成文件
开启覆盖率收集开关后，每次执行完所有单元测试，test/unit目录下生成coverage目录，存放单元测试报告，默认开启，可通过传入命令参数--coverage=false关闭。

## 5参考资料
jest官网：[https://jestjs.io/zh-Hans/](https://jestjs.io/zh-Hans/)

jest配合webpack使用：[https://jestjs.io/docs/zh-Hans/webpack](https://jestjs.io/docs/zh-Hans/webpack)

vue测试套件文档：[https://vue-test-utils.vuejs.org/zh/](https://vue-test-utils.vuejs.org/zh/)

Husky与lint-staged使用说明：[https://segmentfault.com/a/1190000009546913](https://segmentfault.com/a/1190000009546913)

lint-staged官方文档：[https://github.com/okonet/lint-staged](https://github.com/okonet/lint-staged)

Husky官方文档：[https://typicode.github.io/husky/#/](https://typicode.github.io/husky/#/)


