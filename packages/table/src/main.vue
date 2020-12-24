<template>
  <div class="el-happy-table">
    <!-- 搜索栏 start -->
    <div class="el-happy-table__searcher">
      <section>
        <searcher-render
          :ctx="ctx"
          :label-width="queryLabelWidth"
          v-for="(node, i) of $slots.searcher"
          :key="i"
          :node="node"
        />
      </section>

      <el-context :ctx="ctx" tag="section">
        <el-btn icon="search" type="primary" @click="fetchData">查询</el-btn>
        <el-btn icon="refresh" type="danger">重置</el-btn>
      </el-context>
    </div>
    <!-- 搜索栏 end -->

    <!-- 工具栏 start -->
    <div class="el-happy-table__tools">
      <el-context :ctx="ctx" tag="section">
        <slot name="tools" />
      </el-context>

      <el-context depth="2" :ctx="ctx" tag="section">
        <el-tooltip content="配置列">
          <el-btn icon="s-operation" circle />
        </el-tooltip>
      </el-context>
    </div>
    <!-- 工具栏 end -->

    <main-table v-bind="$attrs" :size="size" v-on="$listeners" :data="computedData" />

    <el-pagination v-if="pagination" />

    <slot name="outer" />
  </div>
</template>

<script>
import MainTable from './table'
import ElContext from 'element-nice-ui/packages/context'
import ElPagination from 'element-nice-ui/packages/pagination'
import ElBtn from 'element-nice-ui/packages/btn'
import ElTooltip from 'element-nice-ui/packages/tooltip'
import SearcherRender from './searcher-render'
export default {
  name: 'ElTable',

  inheritAttrs: false,

  components: {
    MainTable,
    ElContext,
    ElPagination,
    ElBtn,
    ElTooltip,
    SearcherRender
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

    queryLabelWidth: {
      type: [Number, String],
      default: 50
    },

    autoQueryFields: {
      type: Array
    },

    size: {
      type: String,
      default: 'mini'
    }
  },

  data: () => ({
    internalData: [],

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
    },

    ctx() {
      return {
        size: this.size
      }
    },
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
