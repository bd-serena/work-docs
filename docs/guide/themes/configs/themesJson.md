# themes.json文件说明
::: warning
不同主题下的颜色属性要保持统一，禁止自由随意新增
:::

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