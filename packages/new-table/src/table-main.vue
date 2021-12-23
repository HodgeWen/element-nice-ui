<template>
  <div class="el-new-table__main" :style="{ height: layout.main.height + 'px' }">
    <table>
      <colgroup>
        <col
          v-for="col of cols"
          ref="cols"
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

    <div class="el-new-table__loading" v-if="model.loading">
      <span style="color: var(--primary-color);">数据加载中...</span>
    </div>
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

  inject: ['column', 'layout', 'model'],

  computed: {
    cols() {
      const { leftFixedColumns, staticColumns, rightFixedColumns, extraColumns } = this.column
      return extraColumns.concat(leftFixedColumns.concat(staticColumns, rightFixedColumns))
    }
  },

  // watch: {
  //   cols(cols) {
  //     this.$nextTick(() => {
  //        this.$refs.cols.forEach(col =>

  //         console.log(col.getBoundingClientRect().width)
  //        )
  //     })
  //   }
  // }

}
</script>
