<template>
  <div>
    <el-new-table :headers="headers" :data="data" v-if="show"></el-new-table>
  </div>
</template>

<script>
export default {

  data: () => ({
    headers: [{ label: '名称', prop: 'name' }, { label: '年龄', prop: 'age' }],

    data: [
      { name: '张三', age: 20 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
    ],

    show: true
  }),

  mounted() {

  }
}
</script>
