<template>
  <el-pagination
    ref="pagination"
    :page-size="size"
    @size-change="onSizeChange"
    :current-page="page"
    @current-change="onPageChange"
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="$data._pageSizes"
    :total="total"
    :disabled="table.loading"
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
    size: 20,

    page: 1,

    total: 0,

    _pageSizes: [10, 20, 40, 60, 100, 200]
  }),

  inject: ['table'],

  watch: {
    page() {
      this.fetch()
    },
    size() {
      this.fetch()
    }
  },

  methods: {
    onSizeChange(size) {
      this.size = size
    },

    onPageChange(page) {
      this.page = page
    },

    fetch() {
      const { table, page, size } = this
      table.fetch && table.fetch({
        page, size
      })
    },

    setTotal(total) {
      this.total = total
    }
  }
}
</script>
