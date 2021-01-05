import FormItem from './form-item.vue'

export default {
  props: {
    node: {
      type: Object,
      required: true
    },

    value: {}
  },

  inheritAttrs: false,

  render(h) {
    let { componentOptions: opts, data } = this.node

    let self = this
    const { attrs } = data
    if (opts && opts.tag !== 'el-form-item') {
      let label = attrs['t-label'],
        prop = attrs['t-prop'],
        span = attrs['t-span']

      let formItemObj = {
        props: { label, prop, span }
      }

      let props = {
        ...opts.propsData,
        value: this.value
      }

      let on = opts.listeners || {}
      let cb = function(v) {
        self.$emit('input', v)
      }
      if (on.input) {
        if (Array.isArray(on.input)) {
          on.input.push(cb)
        } else {
          on.input = [on.input, cb]
        }
      } else {
        on.input = cb
      }



      return <FormItem {...formItemObj}>{h(opts.tag, { props, on })}</FormItem>
    } else {
      return this.node
    }
  }
}
