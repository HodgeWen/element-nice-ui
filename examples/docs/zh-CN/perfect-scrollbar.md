## PerfectScrollbar 滚动条

比原生滚动条更漂亮美观

### 基础用法

:::demo 要使用 PerfectScrollbar 组件，如下即可

```html
<template>
  <el-perfect-scrollbar style="height: 200px">
    <div v-for="n of 20" :key="n">item{{ n }}</div>
  </el-perfect-scrollbar>
</template>

<script>
  export default {}
</script>

<style>

</style>
```
:::