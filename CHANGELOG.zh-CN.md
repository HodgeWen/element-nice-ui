## 更新日志

### 2.15.6

*2020-12-24*
#### 新功能

给表格增加了一些插槽


### 2.15.3

*2020-12-21*
#### 优化
优化徽标显示, 优化菜单显示, 优化icon
- Badge
  - 优化badge的样式
- Menu
  - 增加size属性, 现在支持传入size参数来改变menu的大小
- Icon
  - Icon 增加一个点击事件, 而不再需要在外部使用.native修饰符

### 2.15.2

*2020-12-21*
#### 优化

- Drawer
  - 优化drawer的样式
- Dialog
  - 优化所有的dialog的样式

### 2.15.1

*2020-12-21*
#### bug 修复

- PerfectScrollbar
  - 修复滚动条样式缺失的问题

### 2.15.0

*2020-12-21*
#### 新功能

- PerfectScrollbar

### 2.14.7

*2020-12-17*
#### 优化

- Table
  - Table 现在有新的用法了, 现在可以往table中传入一个数组来表示列属性, 该数组的元素为column-item组件的属性对象
  - Table 现在可以根据传入的api来进行数据请求
  - Table 现在可以根据pagination属性来自动的显示分页

- 代码提示
  - 现在在目录文件提供一个代码提示的配置文件, 可以在根目录的package.json中配置vetur来获得代码提示
### 2.14.3

*2020-12-14*
#### 优化

- Form
  - Form现在和el-row组件整合在一起, 可以直接使用el-row的属性, 同时提供一个colspan属性来决定每个FormItem的默认span
- FormItem
  - FormItem现在和el-col组件整合在一起, 可以直接使用el-col的属性

### 2.14.2

*2020-12-11*
#### 优化

- Form
  - 修改Form的validate方法使其在验证不通过的时候不再在控制台打印烦人的错误, 也不再打印烦人的警告