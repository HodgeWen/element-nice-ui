<template>
  <div
    class="el-tree-select"
    :class="[selectSize ? 'el-tree-select--' + selectSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <el-input />

    <transition name="el-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="doDestroy">
      <el-select-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible"
      >
        <el-scrollbar
          tag="ul"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          ref="scrollbar"
          :class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }"
          v-show="internalOptions.length > 0 && !loading"
        >
          <el-option :value="query" created v-if="showNewOption"> </el-option>
          <el-option
            v-for="(option, index) of computedOptions"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          >
            <slot v-bind="{ option, index }" />
          </el-option>
        </el-scrollbar>
      </el-select-menu>
    </transition>
  </div>
</template>

<script>
import ElTreeSelectPanel from './tree-select-panel.vue'
import ElInput from 'element-nice-ui/packages/input'
export default {
  components: {
    ElInput,
    ElTreeSelectPanel,
    ElTag,
    ElScrollbar
  },

  props: {
    size: String,

    value: {
      required: true
    },
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    }
  },

  methods: {
    handleClose() {
      this.visible = false
    },
    toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false
        } else {
          this.visible = !this.visible
        }
        if (this.visible) {
          ;(this.$refs.input || this.$refs.reference).focus()
        }
      }
    },
    scrollToOption(option) {
      const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el
      if (this.$refs.popper && target) {
        const menu = this.$refs.popper.$el.querySelector('.el-select-dropdown__wrap')
        scrollIntoView(menu, target)
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll()
    },

    handleMenuEnter() {
      this.$nextTick(() => this.scrollToOption(this.selected))
    },

    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy()
    },
  }
}
</script>
