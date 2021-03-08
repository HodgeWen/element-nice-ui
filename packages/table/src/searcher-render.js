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

      if (attrs['t-label']) {
        let labelStyle = {
          width: props.labelWidth + 'px'
        }

        if (attrs['t-label-width']) {
          labelStyle.width = (attrs['t-label-width'] + 'px').replace('pxpx', 'px')
          delete attrs['t-label-width']
        }

        let labelNode = h(
          'label',
          {
            class: 'el-happy-table__query-label',
            style: labelStyle
          },
          attrs['t-label'] + ': '
        )

        delete attrs['t-label']

        let itemStyle = {}
        if (attrs['t-width']) {
          itemStyle.width = (attrs['t-width'] + 'px').replace('pxpx', 'px')
          delete attrs['t-width']
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
