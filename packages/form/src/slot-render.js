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

  methods: {
    init() {
      let { componentOptions: opts } = this.node
      let self = this

      if (!opts || opts.tag === 'el-form-item') return

      // 初始化input事件
      if (!opts.listeners) {
        opts.listeners = {}
      }
      let { listeners } = opts
      let cb = function(v) {
        self.$emit('input', v)
      }
      if (listeners.input) {
        if (Array.isArray(listeners.input)) {
          listeners.input.push(cb)
        } else {
          listeners.input = [listeners.input, cb]
        }
      } else {
        listeners.input = cb
      }
    }
  },

  created() {
    this.init()
  },

  render(h) {
    let { componentOptions: opts } = this.node
    if (opts && opts.tag !== 'el-form-item') {
      if (opts.propsData) {
        opts.propsData.value = this.value
      }

      let node = h(opts.tag, { on: opts.listeners })
      node.isRootInsert = this.node.isRootInsert
      node.data = this.node.data
      node.componentOptions = opts

      let formItemProps = {  }
      let { attrs } = this.node.data
      ~['t-prop', 't-label', 't-span'].forEach(prop => {
        formItemProps[prop.slice(2)] = attrs[prop]
      })

      return <FormItem {...{ props: formItemProps }}>{node}</FormItem>
    } else {
      return this.node
    }
  }
}
