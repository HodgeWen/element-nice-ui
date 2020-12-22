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
    }
  },

  inheritAttrs: false,

  render(h, ctx) {
    const { children, props, data } = ctx
    if (children) {
      children.forEach(({ componentOptions: opts }) => {
        if (opts) {
          opts.propsData = { ...props.ctx, ...opts.propsData }
        }
      })
    }
    return h(props.tag, data, children)
  }
}
