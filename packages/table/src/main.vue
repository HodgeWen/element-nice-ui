<template>
  <div class="el-happy-table">
    <div class="el-happy-table__header">
      <el-context :ctx="ctx" tag="section">
        <slot name="tools" />
      </el-context>

      <el-context :ctx="ctx" tag="section">
        <slot name="searcher" />
      </el-context>
    </div>

    <main-table v-bind="$attrs" v-on="$listeners" :data="computedData" />

    <el-pagination v-if="pagination" />

    <slot name="outer" />
  </div>
</template>

<script>
import MainTable from './table'
import ElContext from '../../context'
import ElPagination from '../../pagination'
export default {
  name: 'ElTable',

  inheritAttrs: false,

  components: {
    MainTable,
    ElContext,
    ElPagination
  },

  props: {
    api: String,

    pagination: {
      type: Boolean
    },

    data: {
      type: Array
    },

    query: {
      type: Object
    },

    autoQueryFields: {
      type: Array
    }
  },

  data: () => ({
    internalData: [],

    ctx: {
      size: 'medium'
    },

    pager: {
      page: 1,
      size: 20
    }
  }),

  computed: {
    computedData() {
      return Array.isArray(this.data) ? this.data : this.internalData
    },

    params() {
      return this.pagination ? { ...this.query, ...this.pager } : this.query
    }
  },

  methods: {
    // 获取表格数据
    fetchData() {
      if (!this.api || !this.$http || !this.EL_TABLE_CONFIG) return
      const { pageDataKey, listDataKey, totalKey } = this.EL_TABLE_CONFIG
      this.$http
        .get(this.api, {
          params: {}
        })
        .then((res) => {
          if (res.code !== 200) return
          if (this.pagination) {
            this.internalData = res[pageDataKey]
          } else {
            this.internalData = res[listDataKey]
          }
        })
    }
  },

  mounted() {
    this.fetchData()
  }
}
</script>
