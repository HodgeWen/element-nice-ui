<template>
  <div class="el-table">
    <el-table-searcher>
      <slot name="searcher" />
    </el-table-searcher>

    <el-table-tools>
      <slot name="tools" />
    </el-table-tools>

    <el-table-body />
  </div>
</template>

<script>
import ElTableSearcher from './table-searcher.vue'
import ElTableTools from './table-tools.vue'
import ElTableBody from './table-body.vue'
import { createStore } from './store'
export default {
  name: 'ElNewTable',

  inheritAttrs: false,

  components: {
    ElTableSearcher,
    ElTableTools,
    ElTableBody
  },

  provide() {
    this.store = createStore.call(this)
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
    return {}
  },

  computed: {},

  methods: {
    fetch() {}
  },

  mounted() {},

  beforeDestroy() {
    this.store && this.store.destroy()
  }
}
</script>
