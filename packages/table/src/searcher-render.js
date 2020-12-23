export default {
  functional: true,

  props: {
    node: {
      type: Object,
      required: true
    },

    ctx: {
      type: Object,
      required: true
    },

    labelWidth: {
      type: String,
      default: '80px'
    }
  },

  render(h, { props }) {
    let { componentOptions: opts } = props.node

    if (opts) {
      opts.propsData = { ...props.ctx, ...opts.propsData }

      if (opts.propsData.label) {
        let label = h(
          'label',
          { class: 'el-happy-table__query-label', style: { width: props.labelWidth } },
          opts.propsData.label + ': '
        )

        delete opts.propsData.label

        return h(
          'div',
          {
            class: 'el-happy-table__query-item'
          },
          [label, props.node]
        )
      }
    }
    return props.node
  }
}
