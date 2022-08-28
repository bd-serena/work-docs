# 视觉使用规范

## 整体规范
### 1.聚焦状态
::: tip
鼠标手势需考虑不同（不同场景）

1.移入有操作的必须统一使用用cursor: point;

2.禁用状态用cursor: not-allowed;
:::

### 2.组件样式统一
::: tip
相同的组件或者页面元素用在不同页面时，必须保证样式统一（包括默认，聚焦等各种状态），避免出现样式差异
:::

### 3.弹出框
::: tip
弹出框大小，通用比例（长:高）4:3/2.5/2
:::

### 4.表格
::: tip
文案：左对齐；表格外框：1px
:::

>![An image](./img/normal-rule1.png)

### 5.查询条件区域
::: tip
字段与表单之间统一去掉：冒号
:::

>![An image](./img/normal-rule2.png)

### 6.图标+文案
::: tip
图标：主色调，文案：#606266（使用场景：表格）
:::

>![An image](./img/normal-rule3.png)

### 7.文案描述
::: tip
字段文案等描述尽量简练，描述统一，如2个字节或4个字节，避免出现描述不清，冗余，拗口等
:::

::: warning
此图片中的表格内容未左对齐，属错误案例
:::

## echarts图形色值使用规范
### 色值
>![An image](./img/chart_color.png)
---
|扁平色|-|-|-|-|-|-|-|
|---|---|---|---|---|---|---|---|
|#409eff|#689f4d|#f18d66|#aa5fff|#4b68fc|#0aa574|#c19a00|#9f685c|
|#6d54d9|#23ad2c|#db3232|#587b8d|#2b99a0|#4b785e|#9a873b|#e34baf|

|渐变色|-|-|-|-|-|-|-|
|---|---|---|---|---|---|---|---|
|#c4f8f1|#d9f490|#ffda68|#dac7f4|#dOe1ff|#a3f9d0|#f8ee54|#fae4e0|
|#dedcf9|#b7efbb|#ffcdcd|#d5e6ef|#b2f5f9|#90eab7|#ede2b5|#ffc2ea|

## 流程图、血缘图使用规范
### 色值
>![An image](./img/flowchart.png)
---
|常规状态|经过状态|选中状态(边框线)|
|---|---|---|
|#e1f3d8|#b3e09c|#67c23a|			
|#fde2e2|#fab5b5|#f56c6c|			
|#f2f3f5c|#dfe1e5|#bbbbbb|				
|#faecd8|#f2d09d|#e6a23c|			
|#d9ecff|#9fceff|#409eff|
::: tip
选中状态背景色不变，边框色值按如上变化
:::

## elementui组件视觉规范
### 色彩规范
#### 主色
>颜色是鲜艳、友好的蓝色 
<table>
<tr><td bgcolor=#409EFF colspan=9>
<font color=white>BrandColor  #409EFF</font>
</td></tr>
<tr>
<td bgcolor=#53a8ff><font color=#333>#53a8ff</font></td>
<td bgcolor=#66b1ff><font color=#333>#66b1ff</font></td>
<td bgcolor=#79bbff><font color=#333>#79bbff</font></td>
<td bgcolor=#8cc5ff><font color=#333>#8cc5ff</font></td>
<td bgcolor=#a0cfff><font color=#333>#a0cfff</font></td>
<td bgcolor=#b3d8ff><font color=#333>#b3d8ff</font></td>
<td bgcolor=#c6e2ff><font color=#333>#c6e2ff</font></td>
<td bgcolor=#d9ecff><font color=#333>#d9ecff</font></td>
<td bgcolor=#ecf5ff><font color=#333>#ecf5ff</font></td>
</tr>
</table>

#### 辅助色
>除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作） 
<table>
<tr>
<td bgcolor=#67C23A colspan=2><font color=white>Success  #67C23A</font></td>
<td bgcolor=#E6A23C colspan=2><font color=white>Warning  #E6A23C</font></td>
<td bgcolor=#F56C6C colspan=2><font color=white>Danger  #F56C6C</font></td>
<td bgcolor=#909399 colspan=2><font color=white>info  #909399</font></td>
</tr>
<tr>
<td bgcolor=#e1f3d8><font color=#333>#e1f3d8</font></td>
<td bgcolor=#f0f9eb><font color=#333>#f0f9eb</font></td>
<td bgcolor=#faecd8><font color=#333>#faecd8</font></td>
<td bgcolor=#fdf6ec><font color=#333>#fdf6ec</font></td>
<td bgcolor=#fde2e2><font color=#333>#fde2e2</font></td>
<td bgcolor=#fef0f0><font color=#333>#fef0f0</font></td>
<td bgcolor=#e9e9eb><font color=#333>#e9e9eb</font></td>
<td bgcolor=#f4f4f5><font color=#333>#f4f4f5</font></td>
</tr>
</table>

#### 中性色
中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构 
<table>
<tr>
<td bgcolor=#303133 colspan=2><font color=white>主要文字 #303133</font></td>
<td bgcolor=#DCDFE6 colspan=2><font color=#333>一级边框 #DCDFE6</font></td>
<td bgcolor=#000000 colspan=2><font color=white>基础黑色 #000000</font></td>
</tr>
<tr>
<td bgcolor=#606266 colspan=2><font color=white>常规文字 #606266</font></td>
<td bgcolor=#E4E7ED colspan=2><font color=#333>二级边框 #E4E7ED</font></td>
<td bgcolor=#FFFFFF colspan=2><font color=#333>基础白色 #FFFFFF</font></td>
</tr>
<tr>
<td bgcolor=#909399 colspan=2><font color=white>次要文字 #909399</font></td>
<td bgcolor=#EBEEF5 colspan=2><font color=#333>三级边框 #EBEEF5</font></td>
<td bgcolor=transparent colspan=2><font color=#333>透明 transparent</font></td>
</tr>
<tr>
<td bgcolor=#C0C4CC colspan=2><font color=#333>占位文字 #C0C4CC</font></td>
<td bgcolor=#F2F6FC colspan=2><font color=#333>四级边框 #F2F6FC</font></td>
</tr>
</table>

### 边框
#### 边框
我们提供了以下几种边框样式，以供选择
|名称|粗细|
|---|---|
|实线（solid）|1px|
|虚线（dashed）|2px|

#### 边框
我们提供了以下几种投影方式，以供选择
::: tip boxshadow
基础投影 box-shadow:0 2px 4px rgba(0, 0, 0, .12),0 0 6px rgba(0, 0, 0, .04)  
浅色投影 box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
:::

#### 圆角
我们提供了以下几种圆角方式，以供选择
::: tip boxshadow
无圆角 border-radius: 0px  
小圆角 border-radius: 2px  
大圆角 border-radius: 4px  
圆形圆角 border-radius: 30px  
:::

### 按钮
#### 基础用法
>按钮圆角为：4px；高为：28px  
![An image](./img/button.png)
### 按钮在页面使用规范
>主次按钮使用方法，按钮左对  
![An image](./img/button_page.png)
#### 按钮在弹窗使用规范
>主次按钮使用方法，按钮右对齐对  
![An image](./img/button_dialog.png)

### 表单
>![An image](./img/form.png)  
---
>![An image](./img/input.png)  
---
>![An image](./img/textarea.png)
---
>![An image](./img/selector.png)
---
>![An image](./img/cascader.png)
---
>![An image](./img/timepicker.png)
---
>![An image](./img/datepicker.png)
---
>![An image](./img/datepicker2.png)
---
>![An image](./img/datepicker3.png)
---
>![An image](./img/datepicker4.png)
---
>![An image](./img/datepicker5.png)
---
>![An image](./img/datepicker6.png)
---
>![An image](./img/colorpicker.png)
---
>![An image](./img/counter.png)
---
>![An image](./img/form_tools.png)
---
>![An image](./img/form_rule.png)

### 表格
>![An image](./img/table.png)
---
### 树形控件/分页
>![An image](./img/tree_pagination.png)
---
### 标签
>![An image](./img/labels.png)
---
### 标记
>![An image](./img/badges.png)
---
### 警告
>![An image](./img/alter.png)
---
### 弹窗
>![An image](./img/messagebox.png)
---
### 通知
>![An image](./img/notifition.png)
---
### 导航
>![An image](./img/navgation.png)
---
>![An image](./img/navbar.png)
---
>![An image](./img/tabs.png)
---
### 其他
>![An image](./img/others.png)
---
>![An image](./img/others2.png)

