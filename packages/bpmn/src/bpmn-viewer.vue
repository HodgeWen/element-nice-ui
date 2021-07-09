<template>
  <section class="el-bpmn-viewer__canvas" ref="canvas">
    <slot />
  </section>
</template>

<script>
import BpmnViewer from './bpmn-js/Viewer'
import customColor from './custom/customColor'
export default {
  name: 'ElBpmnViewer',

  props: {
    /** 需要渲染的图 */
    xml: {
      type: String,
      required: true
    },

    beforeDraw: {
      type: Function
    },

    showGrid: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    _viewer: null,

    _modeling: null,

    _eventBus: null,

    _elementRegistry: null
  }),

  watch: {
    xml() {
      this.draw()
    }
  },

  methods: {
    draw() {
      const container = this.$refs.canvas
      const { $data, xml } = this

      if (!container || !xml) return

      // 销毁旧的viewer
      $data._viewer && $data._viewer.destroy()

      const viewer = new BpmnViewer({
        container
      })
      $data._viewer = viewer

      $data._modeling = viewer.get('modeling')
      $data._eventBus = viewer.get('eventBus')
      $data._elementRegistry = viewer.get('elementRegistry')

      // 添加网格背景
      this.addGrid()

      // 添加各种事件...
      this.beforeDraw && this.beforeDraw(this)

      return viewer.importXML(xml).then(() => {
        const canvas = viewer.get('canvas')
        canvas.zoom('fit-viewport')
      })
    },

    zoom(type) {
      const { _viewer } = this.$data
      if (!_viewer) return
      const zoomScroll = _viewer.get('zoomScroll')
      if (type === 'in') return zoomScroll.stepZoom(1)
      if (type === 'out') return zoomScroll.stepZoom(-1)
      if (type === 'reset') return zoomScroll.reset()
    },

    addGrid() {
      if (!this.showGrid) return
      this.$el.getElementsByTagName('svg')[0].style[
        'background-image'
      ] = `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")`
    },

    on(event, handler) {
      const { _eventBus } = this.$data
      if (!_eventBus) return
      _eventBus.on(event, handler)
      return this
    },

    off(event, handler) {
      const { _eventBus } = this.$data
      if (!_eventBus) return
      _eventBus.off(event, handler)
      return this
    }
  },

  mounted() {
    this.draw()
  }
}
</script>
