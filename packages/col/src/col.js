export default {
  name: 'ElCol',

  props: {
    span: {
      type: Number
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  computed: {
    gutter() {
      let parent = this.$parent
      while (parent && parent.$options.componentName !== 'ElRow') {
        parent = parent.$parent
      }
      return parent ? parent.gutter : 0
    }
  },
  render(h) {
    let classList = []
    let style = {}

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px'
      style.paddingRight = style.paddingLeft
    }

    if (this.span !== undefined) {
      classList.push(`el-col-${this.span}`)
    }
    ;['offset', 'pull', 'push'].forEach((prop) => {
      if (this[prop] !== undefined) {
        classList.push(`el-col-${prop}-${this[prop]}`)
      }
    })

    ;['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
      if (typeof this[size] === 'object') {
        let props = this[size]
        return Object.keys(props).forEach((prop) => {
          classList.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${props[prop]}`
              : `el-col-${size}-${props[prop]}`
          )
        })
      } else if (!isNaN(+this[size])) {
        classList.push(`el-col-${size}-${this[size]}`)
      }
    })

    return h(
      this.tag,
      {
        class: ['el-col', classList],
        style
      },
      this.$slots.default
    )
  }
}
