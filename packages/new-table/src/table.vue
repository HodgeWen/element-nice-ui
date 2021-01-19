<template>
  <div class="el-table">
    <el-table-searcher>
      <slot name="searcher" />
    </el-table-searcher>

    <el-table-tools>
      <slot name="tools" />
    </el-table-tools>

    <el-table-wrap />
  </div>
</template>

<script>
import ElTableSearcher from './table-searcher.vue'
import ElTableTools from './table-tools.vue'
import ElTableWrap from './table-wrap.vue'
import { createStore } from './store'
import { treeMap } from './util'
import './table.scss'
export default {
  name: 'ElNewTable',

  inheritAttrs: false,

  components: {
    ElTableSearcher,
    ElTableTools,
    ElTableWrap
  },

  provide() {
    this.store = createStore.call(this)
    this.store
      .commit('setData', this.computedData)
      .commit('setHeaders', this.computedHeaders)
    return {
      store: this.store
    }
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
    },

    value: {
      type: [Array, Object]
    },

    noCache: {
      type: Boolean
    },

    noSearcher: {
      type: Boolean
    }
  },

  data() {
    return {
      internalData: [],

      hasCheckbox: false,

      hasRadio: false
    }
  },

  computed: {
    computedHeaders() {
      let id = 0
      let ret = treeMap(this.headers, (header) => {
        header._id = id++
      })

      // if (this.hasCheckbox) {
      //   ret.push()
      // } else if (this.hasRadio) {
      //   ret.push()
      // }

      return ret
    },

    computedData() {
      return this.data ? this.data : this.internalData
    }
  },

  methods: {
    /** 查询 */
    fetch() {
      // const {}
    },

    /** 初始化 */
    init() {
      if (Array.isArray(this.value)) {
        this.hasCheckbox = true
      } else if (this.value !== undefined) {
        this.hasRadio = true
      }
    },

    /**  */
  },

  watch: {
    computedData(data) {
      this.store.commit('setData', data)
    },

    computedHeaders(headers) {
      this.store.commit('setHeaders', headers)
    }
  },

  created() {
    this.init()
  },

  beforeDestroy() {
    this.store && this.store.destroy()
  }
}
</script>
