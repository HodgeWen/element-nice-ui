<template>
  <el-table :headers="headers" page :data="data"> </el-table>
</template>

<script>
import 'packages/theme-chalk/src/base.scss'
import 'packages/theme-chalk/src/table.scss'
import ElTable from 'packages/table'
export default {
  components: {
    ElTable
  },
  data() {
    return {
      headers: [
        {
          label: '你好啊',
          prop: 'hello'
        },
        { label: '你好啊2', prop: 'b.c' }
      ],

      data: [{ hello: 'aa', b: { c: '1' } }]
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
