import FormItem from './form-item.vue'

export default {

  props: {
    node: {
      type: Object,
      required: true
    },

    model: {
      type: Object,
      required: true
    }
  },

  render(h) {
    let { model, node } = this
    let { componentOptions: opts, data: nodeData } = node
    if (opts && opts.tag !== 'el-form-item') {

      let formItemObj = {
        props: {}
      }
      if (nodeData) {
        let { attrs } = nodeData
        if (attrs['t-label']) {
          formItemObj.props.label = attrs['t-label']
          delete attrs['t-label']
        }

        if (attrs['t-span']) {
          formItemObj.props.span = attrs['t-span']
          delete attrs['t-span']
        }

        if (attrs['t-prop']) {
          let prop = attrs['t-prop']
          formItemObj.props.prop = prop
          delete attrs['t-prop']
          if (typeof model[prop] === 'object' && model[prop] !== null) {
            node = h(opts.tag, {
              props: {
                value: model[prop].value
              },
              on: {
                input(e) {
                  model[prop].value = e
                }
              }
            })
          } else {
            node = h(opts.tag, {
              props: {
                value: model[prop]
              },
              on: {
                input(e) {
                  model[prop] = e
                }
              }
            })
          }
        }
      }

      return <FormItem {...formItemObj}>{node}</FormItem>
    } else {
      return node
    }
  }
}
