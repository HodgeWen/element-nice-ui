<template>
  <div class="el-select-tree__item" v-show="node.visible">
    <!-- 节点内容 start -->
    <section
      class="el-select-tree__content"
      :class="{
        'el-select-tree--expanded': node.expanded,
        'el-select-tree--selected': node.selected,
        'el-select-tree--disabled': !selectable
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
        v-if="tree.checkable && (!tree.checkableFilter || tree.checkableFilter(node.data))"
        :indeterminate="node.indeterminate"
        :value="node.checked"
        @input="onToggleCheck"
      />
      <slot-render
        v-if="tree.$scopedSlots.default"
        :scope="tree.$scopedSlots.default({ item: node.data })"
      />
      <span v-else class="el-select-tree__label">{{ label }}</span>
    </section>
    <!-- 节点内容 end -->

    <!-- 子节点 start -->
    <el-collapse-transition>
      <div v-if="node.children.length && node.expanded">
        <tree-item
          :key="childNode.$id"
          :node="childNode"
          v-for="(childNode, index) of node.children"
        >

        </tree-item>
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
    ElCheckbox,

    SlotRender: {
      functional: true,

      props: {
        scope: {
          type: [Object, Array],
          required: true,
        }
      },

      render(h, { props }) {
        return props.scope
      }
    }
  },

  inject: ['tree'],

  props: {
    node: {
      type: Object
    }
  },

  computed: {
    label() {
      return this.node.data.label
    },

    value() {
      return this.node.data.value
    },

    contentStyle() {
      const { depth } = this.node
      return {
        paddingLeft: (depth - 1) * 16 + 'px'
      }
    },

    selectable() {
      const { tree } = this
      return tree.selectableFilter ? tree.selectableFilter(this.node.data) : true
    }
  },

  methods: {
    onToggleCheck(checked) {
      this.node.setChecked(checked, 'event')
      const { tree } = this.tree
      const { nodeKeyMap } = tree
      this.tree.$emit('input', Array.from(tree.checkedSet))
      this.tree.$emit(
        'change',
        Array.from(tree.checkedSet),
        Array.from(tree.checkedSet).map(key => nodeKeyMap[key].data.label),
        Array.from(tree.checkedSet).map(key => nodeKeyMap[key].data)
      )
    },
    /** 选择 */
    onSelect() {
      if (this.tree.checkable || !this.selectable) return
      this.node.setSelected()
      const { currentSelectNode } = this.tree.tree
      if (currentSelectNode) {
        const { data } = currentSelectNode
        this.tree.$emit('input', data.value)
        this.tree.$emit('change', data.value, data.label, data)
      } else {
        this.tree.$emit('input', '')
        this.tree.$emit('change', '', '', null)
      }
    }
  }
}
</script>
