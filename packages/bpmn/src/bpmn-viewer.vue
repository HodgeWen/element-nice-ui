<template>
  <!-- bpmn画布 start -->
  <section class="el-bpmn-viewer__canvas" ref="canvas"></section>
  <!-- bpmn画布 end -->
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

    /** 已完成节点 */
    finished: {
      type: Array,
      default: () => []
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

    _elementRegistry: null,

    redraw: false
  }),

  computed: {
    finishedSet() {
      return new Set(this.finished)
    }
  },

  watch: {
    // 用来抵消多个watch同时
    redraw(val) {
      val && this.draw().then(() => {
        this.redraw = false
      })
    },

    xml() {
      this.redraw = true
    },

    finished() {
      this.redraw = true
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
      // 添加各种事件
      this.addEvent()

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

    addEvent() {
      const { finishedSet } = this
      const { _modeling, _elementRegistry } = this.$data

      const elementAddedHandler = ({ element }) => {
        if (finishedSet.has(element.id)) {
          // 完成的节点设置为指定的颜色
          _modeling.setColor(element, {
            stroke: '#409eff'
          })

          const type = this.getElementType(element)

          if (type === 'SequenceFlow') {
            let next = element.target
            let pre = element.source

            _modeling.setColor(pre, {
              stroke: '#409eff'
            })

            this.$nextTick(() => {
              if (!next.outgoing.some(ele => finishedSet.has(ele.id))) {
                _modeling.setColor(next, {
                  stroke: '#F56C6C'
                })
                let dom = _elementRegistry
                  .getGraphics(next.id)
                  .getElementsByClassName('djs-visual')[0]
                dom.classList.add('el-bpmn-viewer--active')
                dom.children[0].setAttribute('stroke-dasharray', '4,4')
                dom = null
              }
            })
          }
        } else {
          _modeling.setColor(element, {
            stroke: '#909399'
          })
        }
      }

      this.on('bpmnElement.added', elementAddedHandler)
    },

    addGrid() {
      if (!this.showGrid) return
      this.$el.getElementsByTagName('svg')[0].style[
        'background-image'
      ] = `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")`
    },

    /** 获取每个元素的大类别 */
    getElementType(element) {
      // label需要单独处理
      let elementOriginType = element.type === 'label' ? element.labelTarget.type : element.type

      // 开始事件和结束事件统一视为事件
      if (['bpmn:StartEvent', 'bpmn:EndEvent'].includes(elementOriginType)) return elementOriginType

      return ['Event', 'Gateway', 'Task', 'SequenceFlow'].find(
        type => !!elementOriginType.match(type)
      )
    },

    /** 设置元素的颜色 */
    setColor(element) {
      const type = this.getElementType(element)
      this.$nextTick(() => {
        this.$data._modeling.setColor(element, customColor[type] || customColor.default)
      })
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
