<template>
  <div class="el-select-tree__item">
    <!-- 节点内容 start -->
    <section
      class="el-select-tree__content"
      :class="{
        'el-select-tree--expanded': node.expanded,
        'el-select-tree--selected': node.selected,
      }"
      :style="contentStyle"
      @click="onSelect"
    >
      <i
        v-if="node.children.length"
        class="el-select-tree__expand-icon el-icon-caret-right"
        @click.stop="node.toggleExpanded()"
      ></i>
      <span style="padding: 0 8px" v-else></span>
      <el-checkbox
        v-if="tree.checkable"
        :indeterminate="node.indeterminate"
        :value="node.checked"
        @input="onToggleCheck"
      />
      <span class="el-select-tree__label">{{ label }}</span>
    </section>
    <!-- 节点内容 end -->

    <!-- 子节点 start -->
    <el-collapse-transition>
      <div v-if="node.children.length && node.expanded">
        <tree-item :key="childNode.$id" :node="childNode" v-for="childNode of node.children" />
      </div>
    </el-collapse-transition>
    <!-- 子节点 start -->
  </div>
</template>

<script>
import ElCollapseTransition from 'element-nice-ui/src/transitions/collapse-transition'
import ElCheckbox from 'element-nice-ui/packages/checkbox'
export default {
  name: 'TreeItem',

  components: {
    ElCollapseTransition,
    ElCheckbox
  },

  inject: ['tree'],

  props: {
    node: {
      type: Object
    }
  },

  computed: {
    label() {
      return this.node.data[this.tree.treeLabel]
    },

    value() {
      return this.node.data[this.tree.treeValue]
    },

    contentStyle() {
      const { depth } = this.node
      return {
        paddingLeft: (depth - 1) * 16 + 'px'
      }
    }
  },


  methods: {
    onToggleCheck(checked)  {
      this.node.setChecked(checked, 'event')
      this.tree.$emit('input', Array.from(this.tree.tree.checkedSet))
    },
    /** 选择 */
    onSelect() {
      this.node.setSelected()
      const { currentSelectNode, nodeKey } = this.tree.tree
      this.tree.$emit('input', currentSelectNode ? currentSelectNode.data[nodeKey] : '')
    }
  }
}
</script>
