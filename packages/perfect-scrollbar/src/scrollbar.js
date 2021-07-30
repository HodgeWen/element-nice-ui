import debounce from 'throttle-debounce/debounce'
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

    noResize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能

    /** 滚动速度 */
    wheelSpeed: {
      type: Number,
      default: 1
    },

    /** 阻止滚动 */
    wheelPropagation: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    animationFinished: true,

    _observer: null
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

    getContainerDom() {
      const { container } = this.$refs
      return this.transition ? container.$el : container
    },

    update() {
      this.ps && this.$nextTick(this.ps.update())
    },

    mutationHandler: debounce(100, false, function(mutations, observer) {
      let white = /(ps__rail-[xy]|ps__thumb-[xy])/
      let all = true
      for (let entry of mutations) {
        if (!white.test(entry.target.className)) {
          all = false
        }
      }
      if (all) return
      this.update()
    }),

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
    let dom = this.getContainerDom()

    this.ps = new PerfectScrollbar(dom, {
      wheelSpeed,
      wheelPropagation,
      ...this.$attrs
    })

    if(this.noResize) return

    const observer = new MutationObserver(this.mutationHandler)

    observer.observe(dom, {
      childList: true,
      characterData: true,
      subtree: true,
      attributeFilter: ['style']
    })

    this.$data._observer = observer
  },

  beforeDestroy() {
    this.destroy()

    if(!this.noResize) {
      this.$data._observer.disconnect()
    }
  }
}
