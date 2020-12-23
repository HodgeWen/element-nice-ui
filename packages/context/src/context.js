export default {
  name: 'ElContext',

  functional: true,

  props: {
    ctx: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      default: 'div'
    },
    depth: {
      type: [Number, String],
      default: 1
    }
  },

  inheritAttrs: false,

  render(h, ctx) {
    const { children, props, data } = ctx
    if (children) {
      ~(function assign(arr, i = 0) {
        while (i++ < props.depth) {
          arr.forEach(({ componentOptions: opts }) => {
            if (opts) {
              opts.propsData = { ...props.ctx, ...opts.propsData }
              if (opts.children) {
                assign(opts.children, i)
              }
            }
          })
        }
      })(children)
    }
    return h(props.tag, data, children)
  }
}
