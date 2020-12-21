<template>
  <!-- <el-table :headers="headers" page :data="data"> </el-table> -->
  <el-perfect-scrollbar tag="ul" class="aaa">
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>

    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <template v-if="show">
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </template>
  </el-perfect-scrollbar>
</template>

<script>
// import 'packages/theme-chalk/src/base.scss'
// import 'packages/theme-chalk/src/table.scss'
// import ElTable from 'packages/table'
import 'packages/theme-chalk/src/perfect-scrollbar.scss'
import ElPerfectScrollbar from 'packages/perfect-scrollbar'
export default {
  components: {
    ElPerfectScrollbar
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

      data: [{ hello: 'aa', b: { c: '1' } }],

      show: false
    }
  },

  methods: {},

  mounted() {
    setTimeout(() => {
      this.show = true
    }, 5000)
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
  padding: 0;
}

.aaa {
  height: 100%;
  width: 200px;
  margin: 0;
  padding: 0;
}
</style>
