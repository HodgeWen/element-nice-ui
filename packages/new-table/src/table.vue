<template>
  <div
    ref="table"
    :class="['el-new-table', `el-new-table--${$data._layout.size}`]"
    :style="tableStyle"
  >
    <!-- 搜索栏 -->
    <el-table-searcher v-if="$slots.searcher">
      <slot name="searcher" />
    </el-table-searcher>

    <!-- 工具栏 -->
    <el-table-tools v-if="showTools">
      <slot name="tools" />
    </el-table-tools>

    <!-- 表格主体 -->
    <ElTableMain />

    <!-- 分页 -->
    <ElTablePagination v-if="pagination" ref="pagination" />

    <!-- 放在外部的一些内容, 比如弹框等等 -->
    <slot name="outer" />
  </div>
</template>

<script>
import ElTableSearcher from './table-searcher.vue'
import ElTableTools from './table-tools.vue'
import ElTableMain from './table-main.vue'
import ElTablePagination from './table-pagination.vue'
import createLayout from './layout'
import createModel from './model'
import createColumns from './column.jsx'
import debounce from 'throttle-debounce/debounce'

export default {
  name: 'ElNewTable',

  inheritAttrs: false,

  components: {
    ElTableSearcher,
    ElTableTools,
    ElTableMain,
    ElTablePagination
  },

  props: {
    api: String,

    placeholder: {
      type: String,
      default: '——'
    },

    /** 表格标识, 用来在数据库中保存列的信息 */
    code: {
      type: String
    },

    pagination: {
      type: Boolean
    },

    data: {
      type: Array,
      required: false
    },

    /** 此属性即将废弃, 如果指定了id, 则此属性在第一次往后都不会生效 */
    headers: {
      type: Array
    },

    query: {
      type: Object,
      default: () => ({})
    },

    queryItemWidth: {
      type: [Number, String],
      default: 240
    },

    autoQueried: {
      type: Array
    },

    showTools: {
      type: Boolean,
      default: true
    },

    height: {
      type: String,
      default: '100%'
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

    /** 表格能否多选, 优先级大于单选优先级 */
    checkable: {
      type: [Boolean, Function]
    },

    /** 表格能否单选 */
    selectable: {
      type: [Boolean, Function]
    },

    /** 每行数据的唯一值 */
    rowKey: String,

    /** 以树形结构显示 */
    tree: Boolean,

    /** 子元素的字段 */
    childrenKey: {
      type: String,
      default: 'children'
    },

    /** 数据在返回的json值中的路径 */
    dataPath: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      /** 列配置 */
      _column: createColumns({
        tableCode: this.code,
        align: this.align,
        checkable: this.checkable,
        selectable: this.selectable,
        showAsTree: this.tree
      }),

      /** 表格布局 */
      _layout: createLayout({
        queryItemWidth: this.queryItemWidth
      }),

      /** 数据模型 */
      _model: createModel({
        autoQueried: this.autoQueried,
        api: this.api,
        data: this.data,
        pagination: this.pagination,
        rowKey: this.rowKey,
        query: this.query,
        showAsTree: this.tree,
        childrenKey: this.childrenKey,
        dataPath: this.dataPath
      })
    }
  },

  computed: {
    /** 表格样式 */
    tableStyle() {
      const { autoHeight, height } = this
      return {
        height: autoHeight ? undefined : height
      }
    }
  },

  watch: {
    /** 监听表头 */
    headers: {
      handler(value) {
        this.$data._column.init(value)
      },

      immediate: true
    },

    /** 监听data的变化 */
    data(data) {
      this.$data._model.data = data
    },

    api(api) {
      this.$data._model.api = api
    }
  },

  // 用以组件之间的通信
  provide() {
    return {
      column: this.$data._column,
      layout: this.$data._layout,
      model: this.$data._model,
      root: this
    }
  },

  // 在created生命周期内初始化 Layout, columns, model数据模型
  created() {
    // this.column.init()
  },

  methods: {
    fetchData(keepPage) {
      this.$data._model.fetchData(keepPage)
    }
  },

  mounted() {
    this.$data._layout.refDom('container', this.$refs.table)
    // TODO如果指定了table容器的height属性则不需要计算dom的offsetHeight值
    this.$data._layout.setState({
      pagination: {
        visible: this.pagination
      }
    })
  }
}
</script>
