import ElDropdown from 'element-nice-ui/packages/dropdown'
import ElBtn from 'element-nice-ui/packages/btn'
import ElDropdownMenu from 'element-nice-ui/packages/dropdown-menu'

// 需要获取当前所有的action-item 无论其嵌套多少
export default {
  name: 'ElAction',

  inheritAttrs: false,

  props: {
    max: {
      type: Number,
      default: 3
    },

    ctx: Object
  },

  data: () => ({
    visibleNodes: [],
    invisibleNodes: []
  }),

  methods: {
    getActionItems() {
      let ret = this.$slots.default && this.$slots.default.filter(child => child.tag)
    },

    getDropdownMenus(children) {
      let { max } = this

      if (children.length <= max) return null

      let dropdownList = children.slice(max - 1).map(node => {
        if (!node.componentOptions) return
        node.componentOptions.propsData.isDrop = true
        return node
      })

      return (
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
    }
  },

  render(h) {
    let children = this.$slots.default && this.$slots.default.filter(child => child.tag)

    if (children && children.length) {
      children.forEach(({ componentOptions: opts }) => {
        if (opts) {
          opts.propsData = { ...opts.propsData, ...this.ctx }
        }
      })
    }

    const dropdownMenus = this.getDropdownMenus(children)

    return (
      <div>
        {children.slice(0, this.max - 1)}

        {dropdownMenus}
      </div>
    )
  }
}
