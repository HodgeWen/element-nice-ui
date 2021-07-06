<template>
  <div class="el-select-tree">
    <div
      v-if="!rootChildren.some(child => child.visible)"
      style="text-align: center; color: #909399"
    >
      暂无数据
    </div>
    <TreeItem :key="node.$id" :node="node" v-for="node of rootChildren" />
  </div>
</template>

<script>
import TreeItem from './tree-item.vue'
import { Tree } from './tree.js'
export default {
  components: {
    TreeItem
  },

  props: {
    treeData: {
      type: Array
    },


    defaultShowAll: {
      type: Boolean,
      default: false
    },

    filterNodeMethod: {
      type: Function,
      required: true
    },

    /** 可选择 */
    checkable: {
      type: Boolean
    },

    /** 是否冒泡关联 */
    bubble: {
      type: Boolean,
      default: true
    }
  },

  provide() {
    return {
      tree: this
    }
  },

  data: () => ({
    /**
     * 树
     * @type {Tree}
     */
    tree: null
  }),

  computed: {
    rootChildren() {
      return this.tree ? this.tree.root.children : []
    }
  },

  watch: {
    treeData(val) {
      this.initTree(val)
    }
  },

  methods: {
    /** 设置树的选中状态 */
    setTreeChecked(keys) {
      if (!this.checkable) return
      const { tree } = this

      // 移除旧的选中状态
      tree.checkedSet.forEach(key => {
        let treeNode = tree.nodeKeyMap[key]
        if (treeNode) {
          treeNode.checked = false
        }
      })
      tree.checkedSet.clear()

      // 选中新的节点
      keys.forEach(key => {
        tree.checkedSet.add(key)
        let treeNode = tree.nodeKeyMap[key]
        if (treeNode) {
          treeNode.checked = true
        }
      })
    },

    /** 设置树的单选状态 */
    setTreeSelected(value) {
      if (this.checkable) return
      const { tree } = this

      /** 没有值 */
      if (!value) {
        if (tree.currentSelectNode) {
          tree.currentSelectNode.selected = false
        }
        tree.currentSelectNode = null
        return
      }

      let node = tree.nodeKeyMap[value]


      if (node) {
        node.setSelected()
      }
    },

    /** 初始化整棵树 */
    initTree(data) {
      let tree = new Tree({
        data,
        bubble: this.bubble,
        filterNodeMethod: this.filterNodeMethod
      })
      this.tree = tree
    },

    getCurrentNode() {
      return this.tree.getCurrentNode()
    },

    getCheckedNodes(merge) {
      return this.tree.getCheckedNodes(merge)
    },

    filter(val) {
      this.tree.filter(val)
    }
  },

  created() {
    this.initTree(this.treeData)
  }
}
</script>
