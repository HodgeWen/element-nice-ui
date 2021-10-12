<template>
  <div
    ref="table"
    :class="['el-new-table', `el-new-table--${$data._layout.size}`]"
    :style="tableStyle"
  >
    <!-- 搜索栏 -->
    <el-table-searcher>
      <slot name="searcher" />
    </el-table-searcher>

    <!-- 工具栏 -->
    <el-table-tools>
      <slot name="tools" />
    </el-table-tools>

    <!-- 表格主体 -->
    <ElTableMain />

    <!-- 分页 -->
    <ElTablePagination v-if="pagination" ref="pagination" />
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
import './table.scss'

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

    queryLabelWidth: {
      type: [Number, String],
      default: 50
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
    checkable: Boolean,

    /** 表格能否单选 */
    selectable: Boolean
  },

  data() {
    return {

      /** 列配置 */
      _column: createColumns({
        tableCode: this.code,
        align: this.align,
        checkable: this.checkable,
        selectable: this.selectable,
      }),

      /** 表格布局 */
      _layout: createLayout(),

      /** 数据模型 */
      _model: createModel({
        api: this.api,
        data: this.data,
        pagination: this.pagination
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
    }
  },

  // 用以组件之间的通信
  provide() {
    return {
      column: this.$data._column,
      layout: this.$data._layout,
      model: this.$data._model
    }
  },

  // 在created生命周期内初始化 Layout, columns, model数据模型
  created() {
    // this.column.init()
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
