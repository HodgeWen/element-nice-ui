import FormItem from './form-item.vue'
import { modifierMethod, components } from './utils'
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
    let { componentOptions: opts } = this.node

    if (opts && components.has(opts.tag)) {
      let { attrs = {} } = this.node.data

      // 表单项属性
      let formItemProps = ['prop', 'label', 'span'].reduce((acc, cur) => {
        acc[cur] = attrs[`t-${cur}`]
        return acc
      }, {})

      let on = {
        ...this.$listeners
      }

      let self = this

      let modifier = attrs['t-modifier']
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

      if (on.input) {
        if (Array.isArray(on.input)) {
          on.input.unshift(cb)
        } else {
          on.input = [cb, on.input]
        }
      } else {
        on.input = cb
      }

      let node = h(
        opts.tag,
        {
          props: {
            ...opts.propsData,
            value: this.value
          },
          on
        },
        opts.children
      )

      return <FormItem {...{ props: formItemProps }}>{node}</FormItem>
    } else {
      return this.node
    }
  }
}
