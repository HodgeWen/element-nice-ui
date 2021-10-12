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
    }
  },

  render(h, { props }) {

    let { componentOptions: opts, data } = props.node

    if (data) {
      let { attrs } = data
      if (opts) {
        opts.propsData = { ...props.ctx, ...opts.propsData }
      }
      if (attrs['t-label']) {

        let itemStyle = {
          width: '240px'
        }
        if (attrs['t-width']) {
          itemStyle.width = (attrs['t-width'] + 'px').replace('pxpx', 'px')
        }

        return (
          <div class="el-new-table__query-item" style={itemStyle}>
            <label class="el-new-table__query-label">
              {attrs['t-label']}
            </label>
            {props.node}
          </div>
        )
      }
    }
    return props.node


  }
}
