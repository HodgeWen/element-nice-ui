import PerfectScrollbar from './ps'
import { scrollTo } from './utils'
export default {
  name: 'ElPerfectScrollbar',

  inheritAttrs: false,

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

    /** 监听配置 */
    observerConfig: {
      type: Object
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
    const { container } = this.$refs

    this.ps = new PerfectScrollbar(container, {
      wheelSpeed,
      wheelPropagation,
      ...this.$attrs
    })

    const observer = new MutationObserver(this.update)
    observer.observe(container, {
      childList: true,
      ...this.observerConfig
    })
    this.observer = observer
  },

  beforeDestroy() {
    this.observer.disconnect()
    this.destroy()
  }
}
