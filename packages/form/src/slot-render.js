import FormItem from './form-item.vue'

export default {
  functional: true,

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

  render(h, { props }) {
    let { componentOptions: opts } = props.node
    let { model } = props

    if (opts && opts.tag !== 'el-form-item') {
      let { data: nodeData, componentOptions } = props.node

      console.log(props.node)
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
            componentOptions.propsData.value = model[prop].value
            componentOptions.listeners = {
              input(v) {
                model[prop].value = v
                console.log(formItemObj)
              }
            }
          } else {
            componentOptions.propsData.value = model[prop]
            componentOptions.listeners = {
              input(v) {
                model[prop] = v
              }
            }
          }
        }
      }
      return h(FormItem, formItemObj, [props.node])
    } else {
      return props.node
    }
  }
}
