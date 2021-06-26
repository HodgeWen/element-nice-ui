import { TreeNode } from './tree-node'

export class Tree {
  root = null

  autoIncreaseId = 0

  constructor(data) {
    this.root = new TreeNode({
      id: this.autoIncreaseId++,
      data: Array.isArray(data) ? null : data,
      ctx: this
    })
  }
}
