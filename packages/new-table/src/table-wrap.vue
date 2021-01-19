<template>
  <div class="el-table__wrap">
    <div class="el-table__loading">

    </div>
    <table class="el-table__main">
      <el-table-header />

      <tbody>
        <el-table-row :row="row" :key="i" v-for="(row, i) of store.state.data" />
      </tbody>
    </table>
  </div>
</template>

<script>
import ElTableHeader from './table-header.vue'
import ElTableRow from './table-row.vue'
export default {
  name: 'ElTableWrap',

  inject: ['store'],

  components: {
    ElTableHeader,
    ElTableRow
  }
}
</script>
