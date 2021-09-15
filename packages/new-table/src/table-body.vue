<template>
  <tbody class="el-new-table__body">
    <el-table-row :row-data="row" :key="i" v-for="(row, i) of rows" />
  </tbody>
</template>

<script>
import ElTableRow from './table-row.vue'

export default {
  name: 'ElTableBody',

  components: {
    ElTableRow
  },

  inject: ['model'],

  computed: {
    rows() {
      return this.model.data
    }
  }
}
</script>
