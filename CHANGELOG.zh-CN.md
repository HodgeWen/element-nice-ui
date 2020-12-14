## 更新日志

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