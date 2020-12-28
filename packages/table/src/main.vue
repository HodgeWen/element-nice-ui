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
        <el-btn :loading="loading" icon="search" type="primary" @click="fetchData">查询</el-btn>
        <el-btn :loading="loading" icon="refresh" type="danger" @click="onReset">重置</el-btn>
      </el-context>
    </div>
    <!-- 搜索栏 end -->

    <!-- 工具栏 start -->
    <div class="el-happy-table__tools" v-if="showTools" ref="tools">
      <el-context :ctx="ctx" tag="section">
        <slot name="tools" />
      </el-context>

      <el-context depth="2" :ctx="ctx" tag="section">
        <el-tooltip content="显示/隐藏 搜索栏">
          <el-btn v-model="searchable" @input="onToggleSearcher" icon="set-up" circle />
        </el-tooltip>

        <el-tooltip content="配置列">
          <el-btn icon="s-operation" circle />
        </el-tooltip>
      </el-context>
    </div>
    <!-- 工具栏 end -->

    <!-- 表格主体 strart -->
    <main-table
      :class="{ 'el-happy-table--with-footer': pagination }"
      v-bind="$attrs"
      :size="size"
      :height="bodyHeight"
      v-on="$listeners"
      :showHeader="headers && !!headers.length"
      :data="computedData"
      v-loading="loading"
    >
      <table-column v-for="header of computedHeaders" :key="header._id" v-bind="header">
        <template v-if="header.slot" #default="{ row, column, $index }">
          <span>111</span>
          <!-- <slot
            :name="'column.' + header.slot"
            v-bind="{ row, column, value: row[header.prop], index: $index }"
          /> -->
        </template>
      </table-column>
    </main-table>
    <!-- 表格主体 end -->

    <!-- 分页 start -->
    <el-pagination
      ref="pagination"
      :page-size="pager.size"
      @size-change="onPaginationSizeChange"
      :current-page="pager.page"
      @current-change="onPaginationPageChange"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="pageSizes"
      :total="total"
      :disabled="loading"
      v-bind="pageConfig"
      v-if="pagination"
    />
    <!-- 分页 end -->

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
import TableColumn from './table-column'
import { debounce } from 'throttle-debounce'
import { getValueByPath } from 'element-nice-ui/src/utils/util'
import { extendQuery, getUrlSearchObj, historyReplace } from 'element-nice-ui/src/utils/shared'

export default {
  name: 'ElTable',

  inheritAttrs: false,

  components: {
    MainTable,
    ElContext,
    ElPagination,
    ElBtn,
    ElTooltip,
    SearcherRender,
    TableColumn
  },

  props: {
    api: String,

    pagination: {
      type: Boolean
    },

    data: {
      type: Array
    },

    headers: {
      type: Array
    },

    query: {
      type: Object,
      default: () => ({})
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
    },

    align: {
      type: String,
      default: 'center'
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

    height: 0,

    headerId: 0,

    searchable: true,

    willSearch: false,

    // 能否自动检索
    canAutoQuery: true,

    loading: false
  }),

  computed: {
    debounceUpdateHeight() {
      return debounce(200, this.updateHeight)
    },

    // 根据传入的属性控制使用哪个作为表格的数据
    computedData() {
      return Array.isArray(this.data) ? this.data : this.internalData
    },

    // 表格的头部属性
    computedHeaders() {
      if (!this.headers) return []
      return this.headers.map((header) => {
        let ret = { ...header, _id: this.headerId++ }
        if (!ret.align) {
          ret.align = this.align
        }
        return ret
      })
    },

    // 显示搜索
    showSearcher() {
      return this.searchable && this.api && !this.data
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
    },

    params() {
      this.queryReplace()
    }
  },

  methods: {
    queryReplace() {
      historyReplace({ ...this.params, sa: this.searchable })
    },

    // 从url中获取query值, 改变query
    readQuery() {
      let queryObj = getUrlSearchObj()
      extendQuery(this.query, queryObj)

      extendQuery(this.pager, queryObj)

      if (queryObj.sa !== undefined) {
        this.searchable = JSON.parse(queryObj.sa)
      }
    },

    onToggleSearcher(searchable) {
      this.queryReplace()
      this.$nextTick(this.updateHeight)
    },

    // 查询
    fetch() {
      const { page, list, total } = this.$EL_TABLE_PROP_CONFIG
      const { params } = this

      return this.$http.get(this.api, { params }).then((res) => {
        if (res.code !== 200) return
        if (this.pagination) {
          if (!page || !total) {
            console.warn(`$EL_TABLE_PROP_CONFIG中的page和total属性都不能为空`)
          }
          this.internalData = getValueByPath(res, page)
          this.total = getValueByPath(res, total)
        } else {
          !list && console.warn(`$EL_TABLE_PROP_CONFIG中的list属性不能为空`)
          this.internalData = getValueByPath(res, list)
        }
      })
    },

    // 获取表格数据
    fetchData(keepPage) {
      if (keepPage !== true) {
        this.pager.page = 1
      }

      if (!this.api || !this.$http || !this.$EL_TABLE_CONFIG) return
      this.loading = true

      this.fetch().then(() => {
        this.loading = false
      })
    },

    // 自动查询的字段 监听
    autoQueryWatch() {
      if (!Array.isArray(this.autoQueried)) return
      let handler = (v) => {
        if (this.canAutoQuery) {
          this.willSearch = true
        }
      }
      this.autoQueried.forEach((field) => {
        this.$watch(`params.${field}`, handler)
      })

      this.$watch('willSearch', (v) => {
        if (v) {
          console.log(111)
          this.willSearch = false
          this.fetchData()
        }
      })
    },

    updateHeight() {
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
    },

    // 重置
    onReset() {
      this.canAutoQuery = false

      Object.keys(this.query).forEach((key) => {
        this.query[key] = this.defaultQuery[key]
      })

      this.$nextTick(() => {
        this.canAutoQuery = true
      })

      this.fetchData()
    },

    onPaginationSizeChange(size) {
      this.pager.size = size
      this.fetchData()
    },

    onPaginationPageChange(page) {
      this.pager.page = page
      this.fetchData(true)
    }
  },

  created() {
    // 该属性一定要放在第一个
    this.defaultQuery = JSON.parse(JSON.stringify(this.query))

    // 还原url中的查询条件
    this.readQuery()

    // 自动检索字段 监听
    this.autoQueryWatch()

    this.$watch('api', () => this.fetchData())
  },

  beforeMount() {
    window.addEventListener('resize', this.debounceUpdateHeight)
    this.$nextTick(this.updateHeight)

    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.debounceUpdateHeight)
    })
  },

  mounted() {
    this.fetchData(true)
  }
}
</script>
