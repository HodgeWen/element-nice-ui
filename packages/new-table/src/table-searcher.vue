<template>
  <div class="el-new-table__searcher" ref="searcher">
    <div
      class="el-new-table__searcher-left"
      ref="left"
      :style="{
        'white-space': expanded ? 'normal' : 'nowrap'
      }"
    >
      <template v-if="$slots.default">
        <searcher-render
          v-for="(node, index) of $slots.default"
          :node="node"
          :key="index"
          :ctx="ctx"
          :label-width="80"
        />
      </template>
    </div>

    <div class="el-new-table__searcher-right" >
      <el-btn
        v-if="expandBtnVisible"
        :size="layout.size"
        @click="toggleSearcher"
        type="text"
        style="margin-left: 10px"
        :icon="expanded ? 'arrow-up' : 'arrow-down'"
      >
        {{ expanded ? '收起' : '展开' }}
      </el-btn>
      <el-btn :size="layout.size" type="primary" title="查询" circle icon="search" @click="fetch"></el-btn>
      <el-btn :size="layout.size" type="danger" title="重置" circle icon="refresh" @click="refresh"></el-btn>
    </div>
  </div>
</template>

<script>
import ElBtn from 'element-nice-ui/packages/btn'
import ElContext from 'element-nice-ui/packages/context'
import SearcherRender from './searcher-render.jsx'
import debounce from 'throttle-debounce/debounce'
export default {
  name: 'ElTableSearcher',

  components: {
    ElBtn,
    ElContext,
    SearcherRender
  },

  inject: ['layout', 'model'],

  data() {
    return {
      expanded: false,

      expandBtnVisible: false
    }
  },

  computed: {
    ctx() {
      return {
        size: this.layout.size
      }
    }
  },

  methods: {
    toggleSearcher() {
      this.expanded = !this.expanded
      this.$nextTick(() => {
        this.layout.computeMainHeight()
      })
    },

    resizeHandler: debounce(150, function() {
      let leftDom = this.$refs['left']
      if (this.expanded === false) {
        if (leftDom.scrollWidth > leftDom.offsetWidth) {
          this.expandBtnVisible = true
        } else {
          this.expandBtnVisible = false
        }
      }
    }),

    addEvent() {
      let leftDom = this.$refs['left']
      if (!leftDom) return
      window.addEventListener('resize', this.resizeHandler)
    },

    fetch() {
      this.model.fetchData()
    },

    refresh() {
      this.model.fetchData()
    }
  },

  mounted() {
    this.layout.refDom('searcher', this.$refs.searcher)
    this.resizeHandler()
    this.addEvent()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>
