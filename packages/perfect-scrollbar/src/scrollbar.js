import PerfectScrollbar from 'perfect-scrollbar'
import { addResizeListener, removeResizeListener } from 'element-nice-ui/src/utils/resize-event'
import { scrollTo } from './utils'

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
    }
  },

  data: () => ({
    animationFinished: true
  }),

  methods: {
    scrollX(x) {
      if (this.animationFinished) {
        this.animationFinished = false
        scrollTo(this.$refs.container, x, 600, 'x', 'easeInOut').then(() => {
          this.animationFinished = true
        })
      }
    },

    scrollY(y) {
      if (this.animationFinished) {
        this.animationFinished = false
        scrollTo(this.$refs.container, y, 600, 'y', 'easeInOut').then(() => {
          this.animationFinished = true
        })
      }
    },

    update() {
      this.ps && this.$nextTick(this.ps.update())
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
