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

    transition: {
      type: Boolean,
      default: false
    },

    transitionName: {
      type: String,
      default: ''
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
    if (this.transition) {
      return h(
        'transition-group',
        {
          ref: 'container',
          class: 'ps',
          on: this.$listeners,
          attrs: this.$attrs,
          props: {
            tag: this.tag,
            name: this.transitionName
          }
        },
        this.$slots.default
      )
    } else {
      return h(
        this.tag,
        {
          ref: 'container',
          class: 'ps',
          on: this.$listeners,
          attrs: this.$attrs
        },
        this.$slots.default
      )
    }
  },

  mounted() {
    const { wheelSpeed, wheelPropagation } = this
    const { container } = this.$refs
    let dom = this.transition ? container.$el : container

    this.ps = new PerfectScrollbar(dom, {
      wheelSpeed,
      wheelPropagation,
      ...this.$attrs
    })

    const observer = new MutationObserver(this.update)

    observer.observe(dom, {
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
