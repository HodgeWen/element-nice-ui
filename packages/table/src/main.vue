<template>
  <div class="el-happy-table">
    <!-- 搜索栏 start -->
    <div class="el-happy-table__searcher" v-if="showSearcher" ref="searcher">
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
    <div class="el-happy-table__tools"  v-if="showTools" ref="tools">
      <el-context :ctx="ctx" tag="section">
        <slot name="tools" />
      </el-context>

      <el-context depth="2" :ctx="ctx" tag="section">
        <el-tooltip content="显示/隐藏 搜索栏">
          <el-btn icon="set-up" circle />
        </el-tooltip>

        <el-tooltip content="配置列">
          <el-btn icon="s-operation" circle />
        </el-tooltip>
      </el-context>
    </div>
    <!-- 工具栏 end -->

    <main-table
      :class="{ 'el-happy-table--with-footer': pagination }"
      v-bind="$attrs"
      :size="size"
      :height="bodyHeight"
      v-on="$listeners"
      :data="computedData"
    />

    <el-pagination
      ref="pagination"
      :page-size="pager.size"
      :current-page.sync="pager.page"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="pageConfig"
      v-if="pagination"
    />

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
import { debounce } from 'throttle-debounce'

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

    pageConfig: {
      type: Object
    },

    autoQueried: {
      type: Array
    },

    size: {
      type: String,
      default: 'mini'
    },

    showTools: {
      type: Boolean,
      default: true
    },

    autoHeight: {
      type: Boolean
    }
  },

  data: () => ({
    internalData: [],

    pageSizes: [20, 40, 80, 150, 200],

    total: 0,

    pager: {
      page: 1,
      size: 20
    },

    searcherAble: true,

    height: 0
  }),

  computed: {
    computedData() {
      return Array.isArray(this.data) ? this.data : this.internalData
    },

    showSearcher() {
      return this.searcherAble && this.api && !this.data
    },

    params() {
      return this.pagination ? { ...this.query, ...this.pager } : this.query
    },

    ctx() {
      return {
        size: this.size
      }
    },

    bodyHeight() {
      if (!this.height || this.autoHeight) {
        return null
      }
      return `calc(100% - ${this.height}px)`
    }
  },

  watch: {
    showSearcher() {
      this.updateHeight()
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
    },

    updateHeight: debounce(0, function () {
      let height = 0
      let margin = 8
      if (this.showSearcher && this.$refs.searcher) {
        height += this.$refs.searcher.clientHeight + margin
      }
      if (this.showTools && this.$refs.tools) {
        height += this.$refs.tools.clientHeight + margin
      }
      if (this.pagination) {
        height += 36 + margin
      }
      this.height = height
    })
  },

  beforeMount() {
    window.addEventListener('resize', this.updateHeight)
    this.$nextTick(this.updateHeight)
  },

  mounted() {
    this.fetchData()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateHeight)
  }
}
</script>
