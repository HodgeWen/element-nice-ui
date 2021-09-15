<template>
  <div class="el-new-table__main" :style="{ height: layout.main.height + 'px' }">
    <table>
      <colgroup>
        <col
          v-for="col of cols"
          :key="col._id"
          :style="{
            minWidth: col.minWidth ? col.minWidth + 'px' : '',
            width: col.width + 'px',
          }"
        />
      </colgroup>

      <!-- 表头 -->
      <ElTableHeader />

      <!-- 表格主体 -->
      <ElTableBody />
    </table>
  </div>
</template>

<script>
import ElTableHeader from './table-header.vue'
import ElTableBody from './table-body.vue'
export default {
  components: {
    ElTableHeader,
    ElTableBody
  },

  name: 'ElTableMain',

  inject: ['column', 'layout'],

  computed: {
    cols() {
      const { leftFixedColumns, staticColumns, rightFixedColumns } = this.column
      return leftFixedColumns.concat(staticColumns, rightFixedColumns)
    }
  }
}
</script>
