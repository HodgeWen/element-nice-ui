import FormItem from './form-item.vue'
import { modifierMethod } from './utils'
export default {
  props: {
    node: {
      type: Object,
      required: true
    },

    value: {}
  },

  inheritAttrs: false,

  data() {
    return {
      cachedNode: null
    }
  },

  methods: {
    init() {
      this.cachedNode = this.node
      let { componentOptions: opts, data } = this.cachedNode
      let self = this

      if (!opts || opts.tag === 'el-form-item') return

      // 初始化input事件
      if (!opts.listeners) {
        opts.listeners = {}
      }
      let { listeners } = opts
      let modifier = data.attrs['t-modifier']
      let cb
      if (modifier && modifierMethod[modifier]) {
        cb = function(v) {
          self.$emit('input', modifierMethod[modifier](v))
        }
      } else {
        cb = function(v) {
          self.$emit('input', v)
        }
      }

      if (listeners.input) {
        if (Array.isArray(listeners.input)) {
          listeners.input.unshift(cb)
        } else {
          listeners.input = [cb, listeners.input]
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
    let { componentOptions: opts } = this.cachedNode
    if (opts && opts.tag !== 'el-form-item') {
      let { attrs } = this.cachedNode.data
      if (opts.propsData) {
        opts.propsData = this.node.componentOptions.propsData
        opts.propsData.value = this.value
      }
      let node = h(opts.tag, { on: opts.listeners })
      node.isRootInsert = this.node.isRootInsert
      node.data = this.node.data
      node.componentOptions = opts

      let formItemProps = {  }

      ~['t-prop', 't-label', 't-span'].forEach(prop => {
        formItemProps[prop.slice(2)] = attrs[prop]
      })
      return <FormItem {...{ props: formItemProps }}>{node}</FormItem>
    } else {
      return this.node
    }
  }
}
