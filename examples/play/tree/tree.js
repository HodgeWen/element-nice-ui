import { TreeNode } from './tree-node'

export class Tree {
  root = null

  autoIncreaseId = 0

  /** 节点的key映射 */
  nodeKeyMap = Object.create(null)

  /** 选中节点的集合 */
  checkedSet = new Set()

  /** 是否向上通知 */
  bubble = true

  /** 节点key */
  nodeKey = 'id'

  /** 当前选中节点 */
  currentSelectNode = null

  /**
   * @param {Object} options 树选项
   * @param {Record<string, any>[] | Record<string, any>} options.data 数据
   * @param {boolean} options.bubble 是否冒泡
   * @param {string} options.nodeKey 节点key
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
}
