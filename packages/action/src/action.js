import ElDropdown from 'element-nice-ui/packages/dropdown'
import ElBtn from 'element-nice-ui/packages/btn'
import ElDropdownMenu from 'element-nice-ui/packages/dropdown-menu'

export default {
  name: 'ElAction',

  props: {
    max: {
      type: Number,
      default: 3
    },

    ctx: Object
  },

  inheritAttrs: false,

  render(h) {
    let children = this.$slots.default && this.$slots.default.filter(child => child.tag)
    let childrenLength = 0
    if (children && children.length) {
      children.forEach(({ componentOptions: opts }) => {
        if (opts) {
          opts.propsData = { ...opts.propsData, ...this.ctx }
        }
      })
      childrenLength = children.length
    }

    let max = this.max <= 0 ? 1 : this.max

    let dropdownList = []
    let drop = null
    if (childrenLength > max) {
      dropdownList = children.slice(max - 1)
      dropdownList.forEach(({ componentOptions: opts }) => {
        if (opts) {
          opts.propsData.isDrop = true
        }
      })

      drop = (
        <ElDropdown>
          <ElBtn
            {...{ props: this.ctx }}
            style='margin-left: 10px'
            suffixIcon='arrow-down'
            type='text'
          >
            更多
          </ElBtn>
          <ElDropdownMenu slot='dropdown'>{dropdownList}</ElDropdownMenu>
        </ElDropdown>
      )

      children = children.slice(0, max - 1)
    }
    return (
      <div>
        {children}
        {drop}
      </div>
    )
  }
}
