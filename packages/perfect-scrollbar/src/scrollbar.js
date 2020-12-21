import PerfectScrollbar from 'perfect-scrollbar'
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
      type: Boolean
    }
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
    }
  },

  render(h) {
    return h(
      this.tag,
      {
        ref: 'container',
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
  },

  updated() {
    if (this.ps) {
      this.$nextTick(this.ps.update)
    }
  },

  beforeDestroy() {
    if (this.ps) {
      this.ps.destroy()
      this.ps = null
    }
  }
}
