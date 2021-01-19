import PerfectScrollbar from 'perfect-scrollbar'
import { addResizeListener, removeResizeListener } from 'element-nice-ui/src/utils/resize-event'

export default {
  name: 'ElPerfectScrollbar',

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    /** 滚动速度 */
    wheelSpeed: {
      type: Number,
      default: 1
    },

    wheelPropagation: {
      type: Boolean,
      default: true
    },
  },

  methods: {
    scroll(x, y) {
      let { container } = this.$refs
      if (!container) return
      if (typeof x === 'number') {
        container.scrollLeft = x
      }
      if (typeof y === 'number') {
        container.scrollTop = y
      }
    },

    update() {
      this.ps && this.$nextTick(() => this.ps.update())
    },

    destroy() {
      if (this.ps) {
        this.ps.destroy()
        this.ps = null
      }
    }
  },

  render(h) {
    return h(
      this.tag,
      {
        ref: 'container',
        class: 'ps',
        on: this.$listeners
      },
      this.$slots.default
    )
  },

  mounted() {
    const { wheelSpeed, wheelPropagation } = this
    this.ps = new PerfectScrollbar(this.$refs.container, {
      wheelSpeed,
      wheelPropagation
    })

    let children = this.$children[0]
    children && addResizeListener(children.$el, this.update)
  },

  beforeDestroy() {
    let children = this.$children[0]
    children && removeResizeListener(children.$el, this.update)
    this.destroy()
  }
}
