import { TreeNode } from './tree-node'

export class Tree {
  /**
   * 根节点
   * @type {TreeNode}
   */
  root = null

  /**
   * 自增id
   * @type {number}
   */
  autoIncreaseId = 0

  /**
   * 节点的key映射
   * @type {Record<string, TreeNode>}
   */
  nodeKeyMap = Object.create(null)

  /**
   * 选中节点的集合
   * @type {Set<string>}
   */
  checkedSet = new Set()

  /** 是否向上通知 */
  bubble = true

  /**
   * 当前选中节点
   * @type {TreeNode}
   */
  currentSelectNode = null

  /**
   * @param {Object} options 树选项
   * @param {Record<string, any>[] | Record<string, any>} options.data 数据
   * @param {boolean} options.bubble 是否冒泡
   * @param {string} options.filterNodeMethod 节点过滤方法
   */
  constructor(options = {}) {
    let { data, ...rest } = options

    Object.keys(rest).forEach(key => {
      this[key] = rest[key]
    })

    this.root = new TreeNode({
      id: this.autoIncreaseId++,
      data: Array.isArray(options.data) ? { children: data } : data,
      context: this,
      depth: 0
    })
  }

  getCurrentNode() {
    return this.currentSelectNode
  }

  // 合并节点, 如果子级也全部选中那么只显示父级
  getCheckedNodes(merge = false) {
    if (!merge) {
      return Array.from(this.checkedSet).map(item => {
        return this.nodeKeyMap[item]
      })
    }

    const checkedNodes = []

    const traverse = function(node) {
      node.children.forEach(child => {
        if (child.checked) {
          return checkedNodes.push(child)
        }

        traverse(child)
      })
    }

    traverse(this.root)

    return checkedNodes
  }

  filter(val) {
    let { root, filterNodeMethod } = this

    if (!val) {
      let walk = data => {
        data.forEach(child => {
          child.visible = true

          if (child.children && child.children.length) {
            walk(child.children)
          }
        })
      }
      walk(root.children)
      return
    }

    /**
     * 遍历
     * @param {TreeNode[]} data
     */
    function walk(data) {
      data.forEach(child => {
        child.visible = filterNodeMethod.call(child, val, child.data)
        child.visible && child.setParentExpand(child.visible)

        if (child.children && child.children.length) {
          walk(child.children)
        }
      })
    }

    walk(root.children)
  }
}
