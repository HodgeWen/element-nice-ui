import { Tree } from './tree'

/**
 * @typedef {Object} NodeOption
 * @property {TreeNode} parent 父节点
 * @property {number} id 节点id
 * @property {Object} data 节点数据
 * @property {Tree} context 上下文对象
 * @property {number} depth 节点深度
 */

export class TreeNode {
  /**
   * 上下文
   * @type {Tree}
   */
  context = null

  /**
   * 父节点
   * @type {TreeNode}
   */
  parent = null

  /**
   * 树的深度
   * @type {number}
   */
  depth = 1

  /**
   * 节点数据
   * @type {Object}
   */
  data = null

  /**
   * 节点id
   * @type {number}
   */
  $id = null

  /** 节点在同级中的索引 */
  index = 0

  /**
   * 节点展开
   * @type {boolean}
   */
  expanded = false

  /**
   * 节点选中
   * @type {boolean}
   */
  checked = false

  /**
   * 节点单选
   * @type {boolean}
   */
  selected = false

  /** 节点中间态 */
  indeterminate = false

  /**
   * 子节点
   * @type {TreeNode[]}
   */
  children = []

  /**
   * @param {NodeOption} options 节点选项
   */
  constructor(options) {
    let { id, data, ...restOptions } = options

    this.$id = id
    this.data = data

    Object.keys(restOptions).forEach(key => {
      this[key] = restOptions[key]
    })

    if (data) {
      const { nodeKeyMap, nodeKey } = this.context
      // 将节点的值属性作为键, 节点本身作为值映射,方便直接查找
      if (data[nodeKey]) {
        nodeKeyMap[data[nodeKey]] = this
      }
    }

    if (data && Array.isArray(data.children) && data.children.length) {
      this.children = data.children.map(
        (childData, index) =>
          new TreeNode({
            depth: this.depth + 1,
            data: childData,
            id: this.context.autoIncreaseId++,
            context: this.context,
            parent: this,
            index
          })
      )
    }
  }

  /** 切换展开折叠状态 */
  toggleExpanded() {
    this.expanded = !this.expanded
  }

  /**
   * 设置节点单选状态
   */
  setSelected() {
    const { context } = this
    let { currentSelectNode } = context

    // 已有选中节点
    if (currentSelectNode) {
      if (currentSelectNode !== this) {
        currentSelectNode.selected = false
        this.selected = true
        context.currentSelectNode = this
      } else {
        this.selected = false
        context.currentSelectNode = null
      }
    } else {
      this.selected = true
      context.currentSelectNode = this
    }

  }

  /**
   * 设置节点选中状态
   * @param {boolean} val 值
   * @param {'event'|'init'} target 触发目标
   */
  setChecked(val, target) {
    if (val === undefined) {
      val = !this.checked
    }
    this.checked = val
    // this.indeterminate = false // select用不到
    val
      ? this.context.checkedSet.add(this.data[this.context.nodeKey])
      : this.context.checkedSet.delete(this.data[this.context.nodeKey])

    // 所有的子节点如与当前选中状态不一致也执行此方法
    this.children.forEach(child => {
      child.checked !== val && child.setChecked(val)
    })

    // 如果树定义了冒泡机制, 那么状态改变时会通知父级 select组件用不到
    // if (this.context.bubble) {
    //   // 事件触发的操作通知父节点
    //   if (target === 'event') {
    //     this.notifyParent()
    //   }
    // }
  }

  /** 通知父级当前状态 select组件用不到 */
  // notifyParent() {
  //   // 子节点全选
  //   let allChildrenChecked = true
  //   // 子节点部分选择(选择了但是没有全选)
  //   let indeterminate = false

  //   const { parent } = this
  //   if (!parent) return

  //   parent.children.some(child => {
  //     if (child.checked) {
  //       indeterminate = true
  //     } else {
  //       allChildrenChecked = false
  //     }

  //     return !allChildrenChecked && indeterminate
  //   })

  //   //  子级全选
  //   if (allChildrenChecked) {
  //     parent.checked = true
  //     parent.indeterminate = false
  //   } else {
  //     // 在关联性树结构中应连带着吧checked置空
  //     parent.checked = false
  //     if (indeterminate) {
  //       parent.indeterminate = true
  //     } else {
  //       parent.indeterminate = false
  //     }
  //   }

  //   parent.notifyParent()
  // }
}
