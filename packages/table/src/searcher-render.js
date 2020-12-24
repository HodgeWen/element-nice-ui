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
      type: [String, Number]
    }
  },

  render(h, { props }) {
    let { componentOptions: opts, data } = props.node
    if (opts) {
      opts.propsData = { ...props.ctx, ...opts.propsData }
    }
    if (data) {
      let { attrs } = data

      if (attrs['s-label']) {
        let labelStyle = {
          width: props.labelWidth + 'px'
        }

        if (attrs['s-label-width']) {
          labelStyle.width = attrs['s-label-width'] + 'px'
          delete attrs['s-label-width']
        }

        let labelNode = h(
          'label',
          {
            class: 'el-happy-table__query-label',
            style: labelStyle
          },
          attrs['s-label'] + ': '
        )

        delete attrs['s-label']

        let itemStyle = {}
        if (attrs['s-width']) {
          itemStyle.width = attrs['s-width'] + 'px'
          delete attrs['s-width']
        }

        return h(
          'div',
          {
            class: 'el-happy-table__query-item',
            style: itemStyle
          },
          [labelNode, props.node]
        )
      }
    }
    return props.node
  }
}
