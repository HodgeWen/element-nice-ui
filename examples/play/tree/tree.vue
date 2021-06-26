<template>
  <div class="el-select-tree">
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

    treeLabel: {
      default: 'label'
    },

    treeValue: {
      default: 'value'
    },

    defaultShowAll: {
      type: Boolean,
      default: false
    },

    /** 可选择 */
    checkable: {
      type: Boolean
    },

    /** 是否冒泡关联 */
    bubble: {
      type: Boolean,
      default: true
    },

    value: {
      type: [Array, String, Number]
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

  methods: {
    treeData() {
      this.initTree()
    }
  },

  methods: {
    /** 初始化树的选中状态 */
    initTreeChecked() {
      const { tree } = this
      this.value.forEach(item => {
        tree.checkedSet.add(item)
        let treeNode = tree.nodeKeyMap[item]
        if (treeNode) {
          treeNode.checked = true
        }
      })
    },

    /** 初始化树的单选状态 */
    initTreeSelected() {
      const { tree, value } = this
      let node = tree.nodeKeyMap[value]
      if (node) {
        node.setSelected()
      }
    },

    initTree() {
      let tree = new Tree({
        data: this.treeData,
        bubble: this.bubble,
        nodeKey: this.treeValue
      })
      this.tree = tree

      Array.isArray(this.value) ? this.initTreeChecked() : this.initTreeSelected()
    }
  },

  created() {
    this.initTree()
  }
}
</script>
