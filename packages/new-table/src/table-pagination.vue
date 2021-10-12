<template>
  <el-pagination
    ref="pagination"
    :page-size="model.size"
    @size-change="onSizeChange"
    :current-page="model.page"
    @current-change="onPageChange"
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="$data._pageSizes"
    :total="model.total"
    :disabled="model.loading"
  />
</template>

<script>
import ElPagination from 'element-nice-ui/packages/pagination'
export default {
  name: 'ElTablePagination',

  components: {
    ElPagination
  },

  data: () => ({
    _pageSizes: [10, 20, 40, 60, 100, 200]
  }),

  inject: ['model', 'layout'],

  methods: {
    onSizeChange(size) {
      this.model.size = size
    },

    onPageChange(page) {
      this.model.page = page
    }
  },

  mounted() {
    this.layout.refDom('pagination', this.$refs.pagination.$el)
  }
}
</script>
