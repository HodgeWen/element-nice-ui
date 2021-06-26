import { Tree } from './tree'

/**
 * @typedef {Object} NodeOption
 * @property {TreeNode} parent
 * @property {number} id
 * @property {Object} data
 * @property {TreeNode} root
 * @property {Tree} ctx
 */

export class TreeNode {
  /**
   * 上下文
   * @type {Tree}
   */
  context = null

  /**
   * 根节点
   * @type {TreeNode}
   */
  root = null

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

  /**
   * 节点展开
   * @type {boolean}
   */
  expanded = false

  /**
   * 节点选中
   * @type {number}
   */
  checked = false

  /**
   * 子节点
   * @type {TreeNode[]}
   */
  children = []

  /**
   * @param {NodeOption} options 节点选项
   */
  constructor(options) {}
}
