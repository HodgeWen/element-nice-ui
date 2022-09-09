<template>
  <div class="el-happy-table" :class="{ 'el-happy-table--auto-height': autoHeight }">
    <!-- 搜索栏 start -->
    <div
      class="el-happy-table__searcher"
      @keyup.enter="fetchData"
      v-if="showSearcher && $slots.searcher"
      ref="searcher"
    >
      <searcher-render
        :ctx="ctx"
        :label-width="queryLabelWidth"
        v-for="(node, i) of $slots.searcher"
        :key="i"
        :node="node"
      />
    </div>
    <!-- 搜索栏 end -->

    <!-- 工具栏 start -->
    <div class="el-happy-table__tools" v-if="showTools" ref="tools">
      <el-context :ctx="ctx" :depth="2" class="el-happy-table__tools-left" tag="section">
        <slot name="tools" />
      </el-context>

      <el-context :depth="2" :ctx="ctx" class="el-happy-table__tools-right" tag="section">
        <template v-if="api">
          <el-tooltip content="查询">
            <el-btn :loading="loading" icon="search" type="primary" @click="fetchData" circle />
          </el-tooltip>

          <el-tooltip content="重置">
            <el-btn :loading="loading" icon="refresh" type="danger" @click="onReset" circle />
          </el-tooltip>
        </template>

        <el-tooltip
          v-if="$slots.searcher && api && !data && !this.noSearcher"
          content="显示/隐藏 搜索栏"
        >
          <el-btn v-model="searchable" @input="onToggleSearcher" icon="set-up" circle />
        </el-tooltip>

        <!-- <el-popover placement="bottom" trigger="click">
          <el-checkbox-group v-model="visibleHeaderIds">
            <el-checkbox
              v-for="item in computedHeaders"
              :label="item._id"
              :key="item._id"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
          <template #reference>
            <el-btn style="margin-left: 10px" v-bind="ctx" icon="s-operation" circle />
          </template>
        </el-popover> -->
      </el-context>
    </div>
    <!-- 工具栏 end -->

    <!-- 表格主体 strart -->
    <main-table
      :class="{
        'el-happy-table--with-footer': pagination,
        'el-happy-table--selectable': value !== undefined
      }"
      :stripe="stripe"
      ref="table"
      v-bind="$attrs"
      :size="size"
      :height="bodyHeight"
      v-on="$listeners"
      :tree-props="treeProps"
      :showHeader="headers && !!headers.length"
      :data="computedData"
      v-loading="loading"
      :placeholder="placeholder"
      @selection-change="onSelectionChange($event, 'multiple')"
      :highlight-current-row="isSingle"
      @current-change="onSelectionChange($event, 'single')"
    >
      <table-column v-for="header of computedHeaders" :key="header._id" v-bind="header">
        <template v-if="header.slotName" #default="{ row, column, $index, indexPath }">
          <el-action v-if="header.type === 'action'" :ctx="ctx">
            <slot
              :name="'column.' + header.slotName"
              v-bind="{
                row,
                column,
                value: getValueByPath(row, header.prop),
                index: $index,
                indexPath
              }"
            >
              {{ placeholder }}
            </slot>
          </el-action>
          <slot
            v-else
            :name="'column.' + header.slotName"
            v-bind="{
              row,
              column,
              value: getValueByPath(row, header.prop),
              index: $index,
              indexPath,
              ctx
            }"
          >
            {{ placeholder }}
          </slot>
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
import ElAction from 'element-nice-ui/packages/action'
import ElPopover from 'element-nice-ui/packages/popover'
import ElCheckbox from 'element-nice-ui/packages/checkbox'
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
    TableColumn,
    ElAction,
    ElPopover,
    ElCheckbox
  },

  props: {
    api: String,

    requestBody: {
      type: Object
    },

    stripe: {
      type: Boolean,
      default: true
    },

    placeholder: {
      type: String,
      default: '——'
    },

    pagination: {
      type: Boolean
    },

    treeProps: {
      type: Object,
      default: () => ({
        hasChildren: 'hasChildren',
        children: 'children'
      })
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
      type: [Number, String]
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

    height: {
      type: [Number, String]
    },

    autoHeight: {
      type: Boolean
    },

    align: {
      type: String,
      default: 'center'
    },

    value: {
      type: [Array, Object]
    },

    cache: {
      type: Boolean
    },

    noSearcher: {
      type: Boolean
    },

    filter: {
      type: Function
    },

    dataMap: {
      type: Function
    },

    dataPath: {
      type: String
    },

    defaultPageSize: {
      type: Number
    },

    selectable: {
      type: Function
    }
  },

  data: () => ({
    internalData: [],

    // 可见的表头的id的集合
    visibleHeaderIds: [],

    pageSizes: [20, 40, 80, 150, 200],

    total: 0,

    pager: {
      page: 1,
      size: 20
    },

    accHeight: 0,

    _headerId: 0,

    searchable: true,

    willSearch: false,

    // 能否自动检索
    canAutoQuery: true,

    loading: false,

    isMultiple: false,

    isSingle: false
  }),

  computed: {
    debounceUpdateHeight() {
      return debounce(200, this.updateHeight)
    },

    // 根据传入的属性控制使用哪个作为表格的数据
    computedData() {
      let ret = Array.isArray(this.data) ? this.data : this.internalData

      if (this.filter) {
        ret = ret.filter(this.filter)
      }
      if (this.dataMap) {
        ret = ret.map(this.dataMap)
      }
      return ret
    },

    // 表格的头部属性
    computedHeaders() {
      if (!this.headers) return []

      let mapper = arr =>
        arr.map(header => {
          let ret = { ...header, _id: this.$data._headerId++ }
          if (!ret.align) {
            ret.align = this.align
          }

          if (ret.children) {
            ret.children = mapper(ret.children)
          }
          return ret
        })

      let headers = mapper(this.headers)
      if (this.isMultiple) {
        let selection = {
          type: 'selection',
          align: this.align,
          fixed: 'left'
        }
        if (this.selectable) {
          selection.selectable = this.selectable
        }
        headers.unshift(selection)
      }
      return headers
    },



    // 显示搜索
    showSearcher() {
      return this.searchable && this.api && !this.data && !this.noSearcher
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
      if (this.height) {
        return this.height
      }
      if (this.autoHeight || !this.accHeight) {
        return
      }
      return `calc(100% - ${this.accHeight}px)`
    }
  },

  watch: {
    showSearcher() {
      this.updateHeight()
    },

    value(v) {
      if (Array.isArray(v)) {
        v.length ? this.$refs.table.setSelection(v) : this.clearSelection()
      } else {
        v === null && this.clearSelection()
      }
    },

    api() {
      this.willSearch = true
    },

    requestBody() {
      this.willSearch = true
    },

    computedHeaders() {
      this.$nextTick(() => this.$refs.table.doLayout())
    },

    willSearch(v) {
      if (v) {
        this.willSearch = false
        this.fetchData()
      }
    }
  },

  methods: {
    getValueByPath,

    onSelectionChange(val, type = 'single') {
      if ((type === 'multiple' && this.isMultiple) || (type === 'single' && this.isSingle)) {
        this.$emit('input', val)
      }
    },

    /**
     * 设置选中值, 该方法主要提供给table-select组件去使用
     * @param {Array<string, number>} 选中的行的key
     * @param {string} ov 每一行的key的字段
     */
    setSelection(value, ov) {
      let s = new Set(value || [])

      let rows = this.computedData.filter(item => {
        return s.has(item[ov])
      })
      this.$emit('input', rows)
      this.$refs.table.setSelection(rows)
      return rows
    },

    setRowByKey(key) {
      let row = this.$refs.table.store.setCurrentRowByKey(key)
      this.$emit('input', row)
      return row
    },

    clearSelection() {
      this.$refs.table.clearSelection()
    },

    create(record, i) {
      const { children = 'children' } = this.treeProps
      this.total++
      let data
      if (i !== undefined && Array.isArray(i)) {
        data = i.reduce((acc, cur) => {
          let item = acc[cur]
          if (item) {
            acc = item[children]
            if (!acc) {
              acc = []
              this.$set(item, children, acc)
            }
          }
          return acc
        }, this.find())
      } else {
        data = this.find()
      }
      data.unshift(record)
      if (data.length > this.pager.size) {
        data.pop()
      }
      return i
    },

    update(i, newRecord) {
      const { children = 'children' } = this.treeProps
      if (Array.isArray(i)) {
        let data =
          i.length <= 1
            ? this.find()
            : i.slice(0, -1).reduce((acc, cur) => {
                let item = acc[cur]
                if (item) {
                  acc = item[children]
                }

                return acc
              }, this.find())

        let lastNodeIndex = i[i.length - 1]
        if (newRecord instanceof Function) {
          let record = data[lastNodeIndex]
          newRecord(record)
          data.splice(i, 1, record)
          return
        }
        data.splice(lastNodeIndex, 1, newRecord)
      } else {
        let data = this.find()
        if (newRecord instanceof Function) {
          let record = data[i]
          newRecord(record)
          data.splice(i, 1, record)
          return
        }
        data.splice(i, 1, newRecord)
      }
    },

    delete(i) {
      const { children = 'children' } = this.treeProps
      if (Array.isArray(i)) {
        let data =
          i.length <= 1
            ? this.find()
            : i.slice(0, -1).reduce((acc, cur) => {
                let item = acc[cur]
                if (item) {
                  acc = item[children]
                }

                return acc
              }, this.find())
        data.splice(i[i.length - 1], 1)
        return
      }

      let data = this.find()
      if (!data.length) {
        return this.fetchData(true)
      }
      data.splice(i, 1)
      this.total--
    },

    find(i) {
      let data = Array.isArray(this.data) ? this.data : this.internalData
      if (typeof i === 'number') {
        if (i < 0) {
          console.warn('find 方法 只能传入一个 >= 0的参数')
        }
        return data[i]
      } else if (typeof i === 'object' && i !== null) {
        return data.find(item => {
          return Object.keys(i).every(key => item[key] === i[key])
        })
      } else if (i === undefined) {
        return data
      }
      return []
    },

    // query 替换, 每次请求后如果请求参数变化则执行
    queryReplace() {
      if (!this.cache) return

      const query = { ...this.params, sa: this.searchable }

      if (
        this.$router &&
        Object.keys(query).some(key => {
          return String(query[key]) !== String(this.$route.query[key])
        })
      ) {
        return this.$router.replace({
          path: this.$route.path,
          query
        })
      }
      historyReplace(query)
    },

    // 从url中获取query值, 改变query
    readQuery() {
      if (!this.cache) return
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
      const {
        pageDataPath,
        listDataPath,
        totalPath,
        currentField = 'current',
        sizeField = 'size'
      } = this.$EL_TABLE_PROP_CONFIG

      let { page, size, ...commonParams } = this.params
      commonParams[currentField] = page
      commonParams[sizeField] = size

      let method = 'get'
      let api = this.api
      let apiStruct = api.split(':')
      if (apiStruct.length === 2) {
        ;[method, api] = apiStruct
      }

      const promise =
        method === 'get'
          ? this.$http.get(api, { params: commonParams })
          : this.$http[method](api, this.requestBody, {
              params: commonParams
            })

      return promise.then(res => {
        if (res.code !== 200) return
        if (this.pagination) {
          if (pageDataPath === undefined || totalPath === undefined) {
            console.warn(`$EL_TABLE_PROP_CONFIG中的pageDataPath和totalPath属性都不能为空`)
          }
          this.internalData = getValueByPath(res.data, this.dataPath || pageDataPath)
          this.total = getValueByPath(res.data, totalPath)
        } else {
          listDataPath === undefined && console.warn(`$EL_TABLE_PROP_CONFIG中的list属性不能为空`)
          this.internalData = getValueByPath(res.data, this.dataPath || listDataPath)
        }
      })
    },

    // 获取表格数据
    fetchData(keepPage = false) {
      if (!this.api || !this.$http || !this.$EL_TABLE_PROP_CONFIG) return

      if (keepPage !== true) {
        this.pager.page = 1
      }

      this.queryReplace()

      this.loading = true

      this.fetch().then(() => {
        this.loading = false
        this.$emit('data-loaded')
      })
    },

    // 自动查询的字段 监听
    autoQueryWatch() {
      const { autoQueried } = this
      if (!Array.isArray(autoQueried)) return

      this.$watch(
        () => autoQueried.map(field => this.query[field]),
        (v) => {
          if (this.canAutoQuery) {
            this.willSearch = true
          }
        }
      )
    },

    updateHeight() {
      let acc = 0
      let margin = 8
      if (this.showSearcher && this.$refs.searcher) {
        acc += this.$refs.searcher.clientHeight + margin
      }
      if (this.showTools && this.$refs.tools) {
        acc += this.$refs.tools.clientHeight + margin
      }
      if (this.pagination) {
        acc += 36 + margin
      }
      this.accHeight = acc
    },

    // 重置
    onReset() {
      this.canAutoQuery = false

      Object.keys(this.query).forEach(key => {
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
      console.log(page)
      this.fetchData(true)
    },

    init() {
      this.isMultiple = false
      this.isSingle = false

      if (Array.isArray(this.value)) {
        this.isMultiple = true
      } else if (this.value !== undefined) {
        this.isSingle = true
      }

      if (this.defaultPageSize !== undefined) {
        this.pager.size = this.defaultPageSize
      }
    }
  },

  created() {
    // 该属性一定要放在第一个
    this.defaultQuery = JSON.parse(JSON.stringify(this.query))

    this.init()

    // 还原url中的查询条件
    this.readQuery()

    // 自动检索字段 监听
    this.autoQueryWatch()
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
