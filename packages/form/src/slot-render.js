import FormItem from './form-item.vue'
import Vue from 'vue'
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
    // function anonymous() {
    //   with (this) {
    //     return _c('el-input', {
    //       model: {
    //         value: form.name.value,
    //         callback: function($$v) {
    //           $set(form.name, 'value', $$v)
    //         },
    //         expression: 'form.name.value'
    //       }
    //     })
    //   }
    // }

    let { componentOptions: opts } = props.node
    let { model, node } = props

    if (opts && opts.tag !== 'el-form-item') {
      let { data: nodeData, componentOptions } = props.node

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

          // if (typeof model[prop] === 'object' && model[prop] !== null) {
          //   node = h(opts.tag, {
          //     model: {
          //       value: model[prop].value,
          //       callback: function($$v) {
          //         console.log(Vue.set)
          //         Vue.set(model[prop], 'value', $$v)
          //       },
          //       expression: `model.${prop}.value`
          //     }
          //   })
          // } else {
          //   node = h(opts.tag, {
          //     model: {
          //       value: model[prop],
          //       callback: function($$v) {
          //         Vue.set(model, prop, $$v)
          //       },
          //       expression: `model.${prop}`
          //     }
          //   })
          // }
        }
      }
      console.log(h(opts.tag, opts.data))
      // return h(FormItem, formItemObj, [props.node])
      return <FormItem {...formItemObj}>{node}</FormItem>
    } else {
      return node
    }
  }
}
