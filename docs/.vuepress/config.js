// dcos/.vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: '开发指南', items: [
          { text: '前端vue开发规范', link: '/' },
          { text: '组件开发流程', link: '/guide/compt/' },
          { text: 'ngbd-utils工具包', link: '/guide/utils/' },
          { text: 'eslint', link: '/guide/rules/' },
          { text: '视觉规范', link: '/guide/uiue/' },
          { text: '可视化主题', link: '/guide/themes/' },
          { text: '单元测试', items: [{text: '构建过程', link: '/guide/unitTest/' }, {text: '使用流程', link: '/guide/unitTest/use/'}]  }
      ]},
      { text: 'bd组件包', link: '/npmBags/' },
      { text: 'Github', link: 'https://github.com/arieltlm/' },
    ],
    sidebar: 'auto'
  },
  title: '前端规范',  // 设置网站标题
  dest: './dist',    // 设置输出目录
  base: '/' // 本地调式用此路径，提交开发环境用下面
  // base: '/web/biui-new/html/vue/helpDocs/' // 设置站点根路径
}
