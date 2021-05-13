> A Vue.js 2.0 UI Toolkit for Web.

本项目基于[element-ui](https://github.com/ElemeFE/element)改造而来, 暂时只支持vue 2.x版本

运行示例, 示例代码入口为 examples/play.js

```
yarn

yarn dev:play
```

## 安装
```shell
yarn add element-nice-ui -S
```

## 快速上手
``` javascript
import Vue from 'vue'
import Element from 'element-nice-ui'

Vue.use(Element)

// or
import {
  Select,
  Btn
  // ...
} from 'element-ui'

Vue.component(Select.name, Select)
Vue.component(Btn.name, Btn)
```

## 浏览器支持
不支持ie浏览器
## 更新日志
待更新


## 和原版Element-ui的区别

### 全局的改变
- 全局引入了一些css变量
- 删除了中文以外的文档
- 统一了全局颜色, 组件的颜色都会根据主题色的变化统一变化
- 优化了一些声明文件, 现在你可以从这些声明文件中获取一些有用的组件声明, 可以作文项目中$refer的泛型传入, 这通常很有用

### 改动的组件
- 按钮
  - 重新命名,由Button 转化为 Btn
  - icon去掉el-icon-前缀

- 表格
  - 增加了api属性, 可用来获取后端数据
  - 使用v-model语法可与表格选中数据进行绑定
  - 表格高度可以用 百分比作为 值, 默认情况下100%高度固定且固定表头
  - 增加了一些插槽, searcher, tools, outer, column.{slotName}(列插槽)
  - 增加了默认分页
  - 增加了一个表格的配置选项 $EL_TABLE_PROP_CONFIG, 该选项挂载在Vue的原型上
  - 增加了headers属性, 通过配置化的方式来配置表格, 移除模板的写法
  - 增加了一个cache属性用来缓存当前表格的分页
  - 增加了一个auto-queried属性, 指定哪些属性可以自动查询, 该属性通常和query属性配合使用
  - 增加了一个query属性, 该属性为分页或表格的查询条件, 该属性可与auto-queried属性配合使用
  - 增加了一些表格方法, ref.create(record: Record<string, any>), ref.update(index: number, document: Record<string, any> | (document: Record<string, any>) => void), ref.delete(index: number), ref.find(index?: number), fetchData(keepPage?: boolean)
  - 其他一些体验和视图优化

- 弹框
  - 增加了confirm属性, 该属性为一个函数, 在点击弹框的确认按钮时会自动进行表单校验(如果子组件有包含表单组件的话), 并且执行该函数, 该函数可以是一个异步函数, 如果函数返回的是一个Promise<false>或者false, 那么组件将不会关闭
  - 增加了footer插槽, 使用该插槽后, 原确认按钮将会被移除
  - 增加了confirmText 和 cancelText属性, 分别制定确认按钮和取消按钮的文本
  - 其他的体验和视图优化

- 表单
  - 移除model属性, 移除rules属性
  - 增加了form属性, 该属性向表单组件描述了当前的表单数据模型以及校验方式, 整合了model和rules属性
  - 增加了grid属性, 该属性默认为true告诉表单是否默认开启栅格布局, 一旦开启, 表单会使用el-row组件, 表单项会使用el-col组件
  - 增加了colspan属性, 在开启grid属性的情况下, 可给每个表单项指定默认的栅格长度, 最大不能超过24
  - 增加了gutter属性, 用来指定栅格系统之间的空隙大小

- 表单项
  - 现在表单项并不需要强制使用在表单内才可进行校验操作了, 也无须使用v-model来和数据进行双向绑定
  - 可以直接使用表单控件而无须使用el-form-item包裹, 通过在表单控件上增加t-label(控件标签), t-prop(需要绑定的数据), t-span(自身的栅格系统, 优先级大于form的colspan优先级)
  - 你仍然可以使用el-form-item去包裹, form会自动识别

- 时间/日期选择器
 - 时间选择面板的尺寸变小了

- input-number
  - 增加了一个money属性, 该属性会使得输入按照钱的方式来显示

- Select
  - 增加了api属性可调用后端接口渲染数据
  - 增加了options属性, 可以传入对象, 数组来渲染列表
  - 增加了tree属性, 可以指定为属性选择控件
  - 增加了一个全局配置, 可以在项目中配置, Vue.prototype.$EL_SELECT_PROP_CONFIG = {}

- Tabs
  - tabs可以设置一个高度, tab-pane中的内容超出高度会自动滚动, 且使用el-perfect-scrollbar来显示滚动条

- Menu
 - 修复了一个bug, 该bug曾导致在使用递归组件时会触发多个报错
 - 优化了折叠后的menu, 该menu会导致在二级menu过多时部分menu缺失的bug

### 新增的组件
- 上下文 el-context
 - 提供ctx属性, 该属性会将传入的值分发到子组件中

- 操作按钮组 al-action , el-action-item
  - 组合使用多余的按钮会作为下拉框

- 工作流插件 el-bpmn

- 完美滚动插件 el-perfect-scrollbar

- 页面组件 el-page

- 富文本编辑器组件 el-wang-editor

## LICENSE
[MIT](LICENSE)
