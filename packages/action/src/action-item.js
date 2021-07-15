import ElBtn from 'element-nice-ui/packages/btn'
import ElDropdownItem from 'element-nice-ui/packages/dropdown-item'

export default {
  name: 'ElActionItem',

  inheritAttrs: false,

  props: {
    isDrop: {
      type: Boolean
    },

    needToConfirm: {
      type: Boolean
    },

    confirmText: {
      type: String,
      default: '确认?'
    },

    confirmTitle: {
      type: String,
      default: '提示'
    },

    size: {
      type: String
    }
  },

  methods: {
    onClick() {
      if (this.needToConfirm) {
        this.$confirm(this.confirmText, this.confirmTitle).then(ok => {
          if (ok !== false) {
            this.$emit('click')
          }
        })
      } else {
        this.$emit('click')
      }
    }
  },

  render(h) {
    let children = this.$slots.default

    return this.isDrop ? (
      <ElDropdownItem {...{ props: this.$attrs }} onClick={this.onClick}>
        {children}
      </ElDropdownItem>
    ) : (
      <ElBtn size={this.size} {...{ props: this.$attrs }} type='text' onClick={this.onClick}>
        {children}
      </ElBtn>
    )
  },
}
