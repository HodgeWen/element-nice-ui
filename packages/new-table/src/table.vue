<template>
  <div class="el-new-table" :style="tableStyle">
    <!-- 搜索栏 -->
    <el-table-searcher> <slot name="searcher" /> </el-table-searcher>

    <!-- 工具栏 -->
    <el-table-tools> <slot name="tools" /> </el-table-tools>

    <!-- 表格主体 -->
    <table class="el-new-table__main">
      <ElTableHeader />

      <ElTableBody />
    </table>

    <!-- 分页 -->
    <ElTablePagination ref="pagination" />
  </div>
</template>

<script>
import ElTableSearcher from './table-searcher.vue'
import ElTableTools from './table-tools.vue'
import ElTableBody from './table-body.vue'
import ElTablePagination from './table-pagination.vue'
import ElTableHeader from './table-header.vue'
import { getValueByPath } from 'element-nice-ui/src/utils/util'
import { treeMap } from './util'
// import './table.scss'

export default {
  name: 'ElNewTable',

  inheritAttrs: false,

  components: {
    ElTableSearcher,
    ElTableTools,
    ElTableHeader,
    ElTableBody,
    ElTablePagination
  },

  props: {
    api: String,

    placeholder: {
      type: String,
      default: '——'
    },

    pagination: {
      type: Boolean
    },

    data: {
      type: Array,
      required: false
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
      type: String,
      default:'100%'
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
  },

  data() {
    return {
      /** 内部维护的数据, 由服务端获取 */
      internalData: [],

      /** 表格能否多选 */
      checkable: false,

      /** 表格能否单选 */
      selectable: false
    }
  },

  computed: {
    /** 计算出的表头 */
    computedHeaders() {
      let id = 0
      let ret = treeMap(this.headers, header => {
        header._id = id++
      })
      return ret
    },

    /** 优先以传入的数据作为表格数据 */
    computedData() {
      return this.data ? this.data : this.internalData
    },

    tableStyle() {
      const { autoHeight, height } = this
      return {
        height: autoHeight ? undefined : height
      }
    }
  },

  provide() {
    return { table: this }
  },

  methods: {
    /**
     * 查询数据
     * @param pager 分页数据
     */
    fetch(pager) {
      const { api, data, pagination } = this
      if (!api || data) return

      const {
        // 分页数据路径
        pageDataPath,
        // 列表数据路径
        listDataPath,
        // 总数路径
        totalPath,
        pageKey = 'current',
        // 分页数据大小
        sizeKey = 'size'
      } = this.$EL_TABLE_CONFIG

      const params = {}

      if (pagination) {
        params[pageKey] = pager.page
        params[sizeKey] = pager.size
      }

      let method = 'get'
      let url = api
      let apiSections = api.split(':')
      if (apiSections.length === 2) [method, url] = apiStruct

      const promise = this.$http[method](url, { params })

      return promise.then(res => {
        if (res.code !== 200) return

        if (this.pagination) {
          if (!pageDataPath || !totalPath) {
            return console.warn(`$EL_TABLE_CONFIG中的pageDataPath和totalPath属性都不能为空`)
          }
          this.internalData = getValueByPath(res, pageDataPath)
          this.setTotal(getValueByPath(res, totalPath))
        }

        if (!listDataPath) {
          return console.warn(`$EL_TABLE_CONFIG中的listDataPath属性不能为空`)
        }

        this.internalData = getValueByPath(res, listDataPath)
      })
    },

    setTotal(total) {
      this.$refs.pagination.setTotal(total)
    }
  }
}
</script>
