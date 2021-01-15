<template>
  <table class="el-table__body">
    <el-table-header />
    {{ store.state.count }}
    <el-table-row />
  </table>
</template>

<script>
import ElTableHeader from './table-header.vue'
import ElTableRow from './table-row.vue'
export default {
  name: 'ElTableBody',

  inject: ['store'],

  components: {
    ElTableHeader,
    ElTableRow
  }
}
</script>