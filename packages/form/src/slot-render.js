import FormItem from './form-item.vue'

export default {
  props: {
    node: {
      type: Object,
      required: true
    },

    value: {},

    // model: {
    //   type: Object,
    //   required: true
    // }
  },

  render(h) {

    let { model, node } = this
    let self = this
    let { componentOptions: opts } = node
    const { attrs } = node.data
    if (opts && opts.tag !== 'el-form-item') {
      let label = attrs['t-label'],
        prop = attrs['t-prop'],
        span = attrs['t-span']

      let formItemObj = {
        props: { label, prop, span }
      }

      console.log(prop)

      // if (prop) {
      //   let on = opts.listeners || {}
      //   let props = opts.propsData

      //   let cb

      //   if (typeof model[prop] === 'object' && model[prop] !== null) {
      //     props.value = model[prop].value

      //     cb = function(value) {
      //       model[prop].value = value
      //     }
      //   } else {
      //     props.value = model[prop]

      //     cb = function(value) {
      //       model[prop] = value
      //     }
      //   }

      //   if (on.input) {
      //     if (Array.isArray(on.input)) {
      //       on.input.push(cb)
      //     } else {
      //       on.input = [on.input, cb]
      //     }
      //   } else {
      //     on.input = cb
      //   }

      //   node = h(opts.tag, {
      //     props,
      //     on
      //   })
      // }

      node = h(opts.tag, {
        props: {
          ...opts.propsData,
          value: this.value
        },
        on: {
          input(v) {
            self.$emit('input', v)
          }
        }
      })

      return <FormItem {...formItemObj}>{node}</FormItem>
    } else {
      return node
    }
  }
}
