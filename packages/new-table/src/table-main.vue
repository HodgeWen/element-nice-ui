<template>
  <div class="el-new-table__main" :style="{ height: layout.main.height + 'px' }">
    <table>
      <colgroup>
        <col
          v-for="col of cols"
          :key="col._id"
          :style="{
            textAlign: col.align || column.align,
            width: (col.width || column.defaultWidth) + 'px',
            minWidth: col.width ? '' : (col.minWidth || column.minWidth) + 'px'

          }"
          style="minWidth: 200px"

          :align="col.align || column.align"
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
