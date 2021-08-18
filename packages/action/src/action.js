import ElDropdown from 'element-nice-ui/packages/dropdown'
import ElBtn from 'element-nice-ui/packages/btn'
import ElDropdownMenu from 'element-nice-ui/packages/dropdown-menu'

// 需要获取当前所有的action-item 无论其嵌套多少
export default {
  name: 'ElAction',

  inheritAttrs: false,

  // provide() {
  //   return {
  //     action: this
  //   }
  // },

  props: {
    max: {
      type: Number,
      default: 3
    },

    ctx: Object
  },

  methods: {
    // getActionItems(children) {
    //   let ret = []
    //   function walk(nodes) {
    //     nodes.forEach(child => {
    //       if (child.tag.includes('ElActionItem')) {
    //         ret.push(child)
    //       } else {
    //         if (child.componentInstance && child.componentInstance.$children) {
    //           walk(child.componentInstance.$children.map(item => item.$vnode))
    //         }
    //       }
    //     })
    //   }
    //   walk(children)
    //   return ret
    // },

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
    let children = this.$slots.default || []
    /** 查找到所有子节点 */
    children = children.filter(child => child.tag)

    // if (children && children[0].componentInstance) {
    //   /** 渲染完之后重新得到新的节点 */
    //   children = this.getActionItems(children)
    // }

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
        {children.length > this.max ? children.slice(0, this.max - 1) : children}
        {dropdownMenus}
      </div>
    )
  }
}
