<template>
  <div
    class="el-select"
    :class="[selectSize ? 'el-select--' + selectSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div
      class="el-select__tags"
      v-if="multiple"
      ref="tags"
      :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }"
    >
      <span v-if="collapseTags && selected.length">
        <el-tag
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="selected[0].hitState"
          type="info"
          @close="deleteTag($event, selected[0])"
          disable-transitions
        >
          <span class="el-select__tags-text">{{ selected[0].currentLabel }}</span>
        </el-tag>
        <el-tag
          v-if="selected.length > 1"
          :closable="false"
          :size="collapseTagSize"
          type="info"
          disable-transitions
        >
          <span class="el-select__tags-text">+ {{ selected.length - 1 }}</span>
        </el-tag>
      </span>
      <span v-if="!collapseTags">
        <el-tag
          v-for="item in selected"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="item.hitState"
          type="info"
          @close="deleteTag($event, item)"
          disable-transitions
        >
          <span class="el-select__tags-text">{{ item.currentLabel }}</span>
        </el-tag>
      </span>

      <input
        type="text"
        class="el-select__input"
        :class="[selectSize ? `is-${selectSize}` : '']"
        :disabled="selectDisabled"
        :autocomplete="autoComplete || autocomplete"
        @focus="handleFocus"
        @blur="softFocus = false"
        @keyup="managePlaceholder"
        @keydown="resetInputState"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="selectOption"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.delete="deletePrevTag"
        @keydown.tab="visible = false"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        v-model="query"
        @input="debouncedQueryChange"
        v-if="canFilter"
        :style="{
          'flex-grow': '1',
          width: inputLength / (inputWidth - 32) + '%',
          'max-width': inputWidth - 42 + 'px'
        }"
        ref="input"
      />
    </div>
    <el-input
      ref="reference"
      :value="selectedLabel"
      @input="selectedLabel = $event"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :autocomplete="autoComplete || autocomplete"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="selectReadonly"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      :tabindex="multiple && canFilter ? '-1' : null"
      @focus="handleFocus"
      @blur="handleBlur"
      :clearable="false"
      @keyup.native="debouncedOnInputChange"
      @keydown.native.down.stop.prevent="navigateOptions('next')"
      @keydown.native.up.stop.prevent="navigateOptions('prev')"
      @keydown.native.enter.prevent="selectOption"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @paste.native="debouncedOnInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <template #prepend>
        <slot name="prepend" />
      </template>
      <template #prefix v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template #suffix>
        <i
          v-if="showClose"
          class="el-select__caret el-input__icon el-icon-circle-close"
          @click="handleClearClick"
        ></i>

        <i v-else :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
      </template>
    </el-input>
    <transition name="el-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="doDestroy">
      <el-select-menu
        ref="popper"
        :class="[inline ? 'el-select--inline' : '']"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false"
      >
        <slot name="tools" />
        <template v-if="!tree">
          <el-scrollbar
            tag="ul"
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list"
            ref="scrollbar"
            :class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }"
            v-show="internalOptions.length > 0 && !loading"
          >
            <el-option :value="query" created v-if="showNewOption"> </el-option>

            <template v-if="max">
              <el-option
                v-for="(option, index) of visibleOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
                :option="option"
              >
                <slot v-bind="{ option, index }" />
              </el-option>
            </template>

            <template v-else>
              <el-option
                v-for="(option, index) of computedOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
                :option="option"
              >
                <slot v-bind="{ option, index }" />
              </el-option>
            </template>
          </el-scrollbar>
        </template>

        <template v-else>
          <el-scrollbar
            tag="ul"
            :wrap-class="[
              'el-select-dropdown__wrap',
              dropdownClass
            ]"
            view-class="el-select-dropdown__list"
            ref="scrollbar"
            :class="{ 'is-empty': !allowCreate && query && !tree && filteredOptionsCount === 0 }"
            v-show="computedOptions.length > 0 && !loading"
          >
            <el-new-tree
              ref="tree"
              :tree-data="computedOptions"
              :checkable="multiple"
              :checkable-filter="checkable"
              :selectable-filter="selectable"
              :filter-node-method="treeNodeFilter"
              @input="onTreeInput"
              @change="onTreeChange"
            >
              <template v-if="$scopedSlots.default" #default="scope">
                <slot v-bind="scope" />
              </template>
            </el-new-tree>
          </el-scrollbar>
        </template>

        <template
          v-if="
            emptyText &&
              ((!tree && !allowCreate) ||
                (tree && computedOptions.length === 0) ||
                loading ||
                (allowCreate && internalOptions.length === 0))
          "
        >
          <slot name="empty" v-if="$slots.empty"></slot>
          <p class="el-select-dropdown__empty" v-else>
            {{ emptyText }}
          </p>
        </template>
      </el-select-menu>
    </transition>
  </div>
</template>

<script type="text/babel">
import Emitter from 'element-nice-ui/src/mixins/emitter'
import Focus from 'element-nice-ui/src/mixins/focus'
import Locale from 'element-nice-ui/src/mixins/locale'
import ElInput from 'element-nice-ui/packages/input'
import ElSelectMenu from './select-dropdown.vue'
import ElOption from './option.vue'
import ElTag from 'element-nice-ui/packages/tag'
import ElScrollbar from 'element-nice-ui/packages/scrollbar'
import debounce from 'throttle-debounce/debounce'
import Clickoutside from 'element-nice-ui/src/utils/clickoutside'
import { addResizeListener, removeResizeListener } from 'element-nice-ui/src/utils/resize-event'
import { t } from 'element-nice-ui/src/locale'
import scrollIntoView from 'element-nice-ui/src/utils/scroll-into-view'
import {
  getValueByPath,
  valueEquals,
  isIE,
  isEdge,
  getDefined
} from 'element-nice-ui/src/utils/util'
import NavigationMixin from './navigation-mixin'
import { isKorean, walkTreeNode } from 'element-nice-ui/src/utils/shared'
import ElNewTree from 'element-nice-ui/packages/new-tree'

export default {
  mixins: [Emitter, Locale, Focus('reference'), NavigationMixin],

  name: 'ElSelect',

  componentName: 'ElSelect',

  inject: {
    elForm: {
      default: ''
    },

    elFormItem: {
      default: ''
    }
  },

  provide() {
    return {
      select: this
    }
  },

  props: {
    checkable: {
      type: Function
    },

    dropdownClass: String,

    selectable: {
      type: Function
    },

    max: {
      type: Number,
      default: 100
    },

    label: String,

    name: String,

    id: String,

    /** 行内 */
    inline: Boolean,

    /** 自动请求 */
    api: {
      type: String
    },

    dataPath: String,

    tree: {
      type: Boolean
    },

    value: {
      required: true
    },

    options: {
      type: [Object, Array]
    },

    optionLabel: {
      type: String,
      default: 'label'
    },

    optionValue: {
      type: String,
      default: 'value'
    },

    childrenKey: {
      type: String,
      default: 'children'
    },

    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
          console.warn(
            "[Element Warn][Select]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
          )
        return true
      }
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: {
      type: Boolean,
      default: undefined
    },
    readonly: {
      type: Boolean,
      default: undefined
    },
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default() {
        return t('el.select.placeholder')
      }
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      // 可见的选项 (为了处理大数据量)
      visibleOptions: [],
      internalOptions: [],
      /** 从服务器中查询到的选项 */
      remoteOptions: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    }
  },

  computed: {
    canFilter() {
      return this.filterable || this.tree || this.computedOptions.length > 6
    },

    computedOptions() {
      let mapper
      const { optionValue: ov, optionLabel: ol } = this
      if (this.tree) {
        mapper = option => {
          let value = option[ov]
          let label = option[ol]
          let children = option[this.childrenKey]

          let item = { ...option, value, label }
          if (children && children.length) {
            item.children = children.map(mapper)
          }

          if (this.childrenKey !== 'children') {
            delete item[this.childrenKey]
          }
          return item
        }
      } else {
        mapper = option => {
          let value = option[ov]
          let label = option[ol]
          return { ...option, value, label }
        }
      }

      let result = []
      if (this.options) {
        if (Array.isArray(this.options)) {
          result = this.options.map(mapper)
        } else if (!this.tree) {
          result = Object.keys(this.options).map(key => ({ value: key, label: this.options[key] }))
        }
      } else {
        result = this.remoteOptions.map(mapper)
      }

      // 出现改动时替代visibleOptions
      if (this.max) {
        let len = result.length
        this.visibleOptions = len > this.max ? result.slice(0, this.max) : result
      }

      return result
    },

    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },

    selectReadonly() {
      return getDefined(
        this.readonly,
        (this.elForm || {}).readonly,
        !this.canFilter || this.multiple || (!isIE() && !isEdge() && !this.visible)
      )
    },

    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== ''
      let criteria = this.clearable && !this.selectDisabled && this.inputHovering && hasValue
      return criteria
    },

    iconClass() {
      return this.remote && this.canFilter ? '' : this.visible ? 'arrow-up is-reverse' : 'arrow-up'
    },

    debounce() {
      return this.remote ? 300 : 0
    },

    emptyText() {
      if (this.loading) {
        return this.loadingText || this.t('el.select.loading')
      } else {
        if (this.remote && this.query === '' && this.internalOptions.length === 0) return false
        if (
          this.canFilter &&
          this.query &&
          this.internalOptions.length > 0 &&
          this.filteredOptionsCount === 0
        ) {
          return this.noMatchText || this.t('el.select.noMatch')
        }
        if (this.internalOptions.length === 0) {
          return this.noDataText || this.t('el.select.noData')
        }
      }
      return null
    },

    showNewOption() {
      let hasExistingOption = this.internalOptions
        .filter(option => !option.created)
        .some(option => option.currentLabel === this.query)
      return this.canFilter && this.allowCreate && this.query !== '' && !hasExistingOption
    },

    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },

    selectDisabled() {
      return getDefined(this.disabled, (this.elForm || {}).disabled, false)
    },

    collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1 ? 'mini' : 'small'
    }
  },

  components: {
    ElInput,
    ElSelectMenu,
    ElOption,
    ElTag,
    ElScrollbar,
    ElNewTree
  },

  directives: { Clickoutside },

  watch: {
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight()
      })
    },

    api() {
      this.getRemoteData()
    },

    placeholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val
    },

    value(val, oldVal) {
      if (this.multiple) {
        this.resetInputHeight()
        if ((val && val.length > 0) || (this.$refs.input && this.query !== '')) {
          this.currentPlaceholder = ''
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder
        }
        if (this.canFilter && !this.reserveKeyword) {
          this.query = ''
          this.handleQueryChange(this.query)
        }
      }
      this.computedOptions.length && this.setSelected()
      if (this.canFilter && !this.multiple) {
        this.inputLength = 20
      }
      if (!valueEquals(val, oldVal)) {
        this.dispatch('ElFormItem', 'el.form.change', val)
      }
    },

    visible(val) {
      if (!val) {
        this.broadcast('ElSelectDropdown', 'destroyPopper')
        if (this.$refs.input) {
          this.$refs.input.blur()
        }

        this.query = ''
        this.previousQuery = null
        this.selectedLabel = ''
        this.inputLength = 20
        this.menuVisibleOnFocus = false
        this.resetHoverIndex()
        this.$nextTick(() => {
          if (this.$refs.input && this.$refs.input.value === '' && this.selected.length === 0) {
            this.currentPlaceholder = this.cachedPlaceHolder
          }
        })
        if (!this.multiple) {
          if (this.selected) {
            if (this.canFilter && this.allowCreate && this.createdSelected && this.createdLabel) {
              this.selectedLabel = this.createdLabel
            } else {
              this.selectedLabel = this.selected.currentLabel
            }
            if (this.canFilter) this.query = this.selectedLabel
          }

          if (this.canFilter) {
            this.currentPlaceholder = this.cachedPlaceHolder
          }
        }
      } else {
        this.broadcast('ElSelectDropdown', 'updatePopper')
        if (this.canFilter) {
          this.query = this.remote ? '' : this.selectedLabel
          // 重新过滤
          if (this.tree && this.selectedLabel) {
            this.$refs.tree.filter('')
          }
          this.handleQueryChange(this.query)
          if (this.multiple) {
            this.$refs.input.focus()
          } else {
            if (!this.remote) {
              this.max ? this.filterOptions('') : this.broadcast('ElOption', 'queryChange', '')
              this.broadcast('ElOptionGroup', 'queryChange')
            }

            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel
              this.selectedLabel = ''
            }
          }
        }
      }
      this.$emit('visible-change', val)
    },

    // option更新后应当设置选择的值
    computedOptions: {
      handler() {
        if (this.tree) {
          this.$nextTick(() => {
            if (!this.$refs.tree) return
            if (this.multiple) {
              this.$refs.tree.setTreeChecked(this.value)
            } else {
              this.$refs.tree.setTreeSelected(this.value)
            }
            this.setSelected()
          })
        } else {
          this.setSelected()
        }
      },
      immediate: true
    },

    internalOptions(v) {
      if (this.$isServer || this.tree) return
      this.$nextTick(() => {
        this.broadcast('ElSelectDropdown', 'updatePopper')
      })
      if (this.multiple) {
        this.resetInputHeight()
      }
      let inputs = this.$el.querySelectorAll('input')
      if (Array.prototype.indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected()
      }
      if (this.defaultFirstOption && (this.canFilter || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption()
      }
    }
  },

  methods: {
    treeNodeFilter(value, data) {
      if (!value) return true
      return data.label.includes(value)
    },

    handleComposition(event) {
      const text = event.target.value
      if (event.type === 'compositionend') {
        this.isOnComposition = false
        this.$nextTick(_ => this.handleQueryChange(text))
      } else {
        const lastCharacter = text[text.length - 1] || ''
        this.isOnComposition = !isKorean(lastCharacter)
      }
    },

    // 在大数据量下特殊处理的过滤
    filterOptions(val) {
      if (!val) {
        let len = this.computedOptions.length
        this.visibleOptions = len > this.max ? this.computedOptions.slice(0, this.max) : this.computedOptions
        return
      }
      this.visibleOptions = this.computedOptions.filter(item => {
        return item.label.includes(val)
      })
    },

    handleQueryChange(val) {
      if (this.previousQuery === val || this.isOnComposition) return
      if (
        this.previousQuery === null &&
        (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')
      ) {
        this.previousQuery = val
        return
      }

      // 如果这是一个树形选择器
      if (this.tree) {
        if (this.previousQuery !== null) {
          this.$refs.tree.filter(val)
        }

        this.previousQuery = val
        this.$nextTick(() => {
          if (this.visible) this.broadcast('ElSelectDropdown', 'updatePopper')
        })
        this.hoverIndex = -1
        return
      }

      this.previousQuery = val
      this.$nextTick(() => {
        if (this.visible) this.broadcast('ElSelectDropdown', 'updatePopper')
      })
      this.hoverIndex = -1

      if (this.multiple && this.canFilter) {
        this.$nextTick(() => {
          const length = this.$refs.input.value.length * 15 + 20
          this.inputLength = this.collapseTags ? Math.min(50, length) : length
          this.managePlaceholder()
          this.resetInputHeight()
        })
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.hoverIndex = -1
        this.remoteMethod(val)
      } else if (typeof this.filterMethod === 'function') {
        this.filterMethod(val)
        this.broadcast('ElOptionGroup', 'queryChange')
      } else {
        this.filteredOptionsCount = this.optionsCount
        if (this.max) {
          this.filterOptions(val)
        } else {
          this.broadcast('ElOption', 'queryChange', val)
        }
        this.broadcast('ElOptionGroup', 'queryChange')
      }
      if (this.defaultFirstOption && (this.canFilter || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption()
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

    emitChange(val, label, obj) {
      if (!valueEquals(this.value, val)) {
        this.$emit('change', val, label, obj)
      }
    },

    getOption(value) {
      let option
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]'
      const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]'
      const isUndefined =
        Object.prototype.toString.call(value).toLowerCase() === '[object undefined]'

      if (this.tree) {
        this.$refs.tree.setTreeSelected(value)

        // 在此处获取node, 列表刚渲染的时候需要先设置值
        let node = this.$refs.tree.getCurrentNode()

        if (node) {
          return { value: node.data.value, currentLabel: node.data.label }
        } else {
          return { value: '', currentLabel: '' }
        }
      } else {
        for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
          const cachedOption = this.cachedOptions[i]
          const isEqual = isObject
            ? getValueByPath(cachedOption.value, this.valueKey) ===
              getValueByPath(value, this.valueKey)
            : cachedOption.value === value
          if (isEqual) {
            option = cachedOption
            break
          }
        }
      }

      if (option) return option
      // 不存在option
      // value不是对象, 不是null, 不是undefined则默认显示
      const label = !isObject && !isNull && !isUndefined ? this.label || value : ''

      let newOption = {
        value: value,
        currentLabel: label
      }
      if (this.multiple) {
        newOption.hitState = false
      }
      return newOption
    },

    setSelected() {
      // 单选
      if (!this.multiple) {
        let option = this.getOption(this.value)
        if (option.created) {
          this.createdLabel = option.currentLabel
          this.createdSelected = true
        } else {
          this.createdSelected = false
        }
        this.selectedLabel = option.currentLabel
        this.selected = option
        if (this.canFilter) this.query = this.selectedLabel
        return
      }

      // 树形选择
      if (this.tree) {
        // 设置组件的选中状态
        this.$refs.tree.setTreeChecked(this.value)
        let checkedNodes = this.$refs.tree.getCheckedNodes(true)

        this.selected = checkedNodes.map(item => ({
          value: item.data.value,
          currentLabel: item.data.label,
          hitState: false
        }))

        this.$nextTick(() => {
          this.resetInputHeight()
        })
        return
      }

      // 多选
      let result = []
      if (Array.isArray(this.value)) {
        this.value.forEach(value => {
          result.push(this.getOption(value))
        })
      }
      this.selected = result
      this.$nextTick(() => {
        this.resetInputHeight()
      })
    },

    handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown || this.canFilter) {
          this.visible = true
          if (this.canFilter) {
            this.menuVisibleOnFocus = true
          }
          this.setSelected()
        }
        this.$emit('focus', event)
      } else {
        this.softFocus = false
      }
    },

    blur() {
      this.visible = false
      this.$refs.reference.blur()
    },

    handleBlur(event) {
      setTimeout(() => {
        if (this.isSilentBlur) {
          this.isSilentBlur = false
        } else {
          this.$emit('blur', event)
        }
      }, 50)
      this.softFocus = false
    },

    handleClearClick(event) {
      this.deleteSelected(event)
    },

    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy()
    },

    handleClose() {
      this.visible = false
    },

    toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return
      const option = this.selected[this.selected.length - 1]
      if (!option) return

      if (hit === true || hit === false) {
        option.hitState = hit
        return hit
      }

      option.hitState = !option.hitState
      return option.hitState
    },

    deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        const value = this.value.slice()
        const selected = this.selected.slice()
        value.pop()
        selected.pop()
        this.$emit('input', value)
        this.emitChange(
          value,
          selected.map(o => o.label),
          selected.map(o => o.option)
        )
      }
    },

    managePlaceholder() {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder
      }
    },

    resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false)
      this.inputLength = this.$refs.input.value.length * 15 + 20
      this.resetInputHeight()
    },

    resetInputHeight() {
      if (this.collapseTags && !this.canFilter) return
      this.$nextTick(() => {
        if (!this.$refs.reference) return
        let inputChildNodes = this.$refs.reference.$el.childNodes
        let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
        const tags = this.$refs.tags
        const sizeInMap = this.initialInputHeight || 40
        input.style.height =
          this.selected.length === 0
            ? sizeInMap + 'px'
            : Math.max(
                tags ? tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0) : 0,
                sizeInMap
              ) + 'px'
        if (this.visible && this.emptyText !== false) {
          this.broadcast('ElSelectDropdown', 'updatePopper')
        }
      })
    },

    resetHoverIndex() {
      setTimeout(() => {
        if (!this.multiple) {
          this.hoverIndex = this.internalOptions.indexOf(this.selected)
        } else {
          if (this.selected.length > 0) {
            this.hoverIndex = Math.min.apply(
              null,
              this.selected.map(item => this.internalOptions.indexOf(item))
            )
          } else {
            this.hoverIndex = -1
          }
        }
      }, 300)
    },

    /** 选项开始选择时 */
    handleOptionSelect(option, byClick) {
      this.$emit('select', option)
      if (this.multiple) {
        const value = (this.value || []).slice()
        const optionIndex = this.getValueIndex(value, option.value)
        if (optionIndex > -1) {
          value.splice(optionIndex, 1)
        } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
          value.push(option.value)
        }
        this.$emit('input', value)

        // 延迟触发
        this.$nextTick(() => {
          this.$emit(
            'change',
            value,
            this.selected.map(o => o.label),
            this.selected.map(o => o.option)
          )
        })

        if (option.created) {
          this.query = ''
          this.handleQueryChange('')
          this.inputLength = 20
        }
        if (this.canFilter) this.$refs.input.focus()
      } else {
        this.$emit('input', option.value)
        this.emitChange(option.value, option.label, option.option)
        this.visible = false
      }
      this.isSilentBlur = byClick
      this.setSoftFocus()
      if (this.visible) return
      this.$nextTick(() => {
        this.scrollToOption(option)
      })
    },

    setSoftFocus() {
      this.softFocus = true
      const input = this.$refs.input || this.$refs.reference
      if (input) {
        input.focus()
      }
    },

    getValueIndex(arr = [], value) {
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]'
      if (!isObject) {
        return arr.indexOf(value)
      } else {
        const valueKey = this.valueKey
        let index = -1
        arr.some((item, i) => {
          if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
            index = i
            return true
          }
          return false
        })
        return index
      }
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

    selectOption() {
      if (!this.visible) {
        this.toggleMenu()
      } else {
        if (this.internalOptions[this.hoverIndex]) {
          this.handleOptionSelect(this.internalOptions[this.hoverIndex])
        }
      }
    },

    deleteSelected(event) {
      event.stopPropagation()
      if (this.multiple) {
        const v = []
        this.$emit('input', v)
        this.emitChange(v, [], [])
      } else {
        this.$emit('input', '')
        this.emitChange('', '', null)
      }
      this.visible = false
      this.$emit('clear')
    },

    deleteTag(event, tag) {
      let index = this.selected.indexOf(tag)
      if (index > -1 && !this.selectDisabled) {
        if (this.tree) {
          const { optionValue, optionLabel } = this
          let restTags = this.selected.slice()
          restTags.splice(index, 1)

          let { checkedSet, nodeKeyMap } = this.$refs.tree.tree
          let deletedNode = nodeKeyMap[tag.value]
          let deletedValues = []
          walkTreeNode([deletedNode], node => {
            deletedValues.push(node.data[optionValue])
          })

          deletedValues.forEach(v => {
            checkedSet.has(v) && nodeKeyMap[v].setChecked(false)
          })

          let newVal = Array.from(checkedSet)

          this.$emit('input', newVal)

          this.emitChange(
            newVal,
            newVal.map(v => nodeKeyMap[v][optionLabel]),
            newVal.map(v => nodeKeyMap[v])
          )
        } else {
          const value = this.value.slice()
          const selected = this.selected.slice()
          value.splice(index, 1)
          selected.splice(index, 1)
          this.$emit('input', value)
          this.emitChange(
            value,
            selected.map(o => o.label),
            selected.map(o => o.option)
          )
        }
        this.$emit('remove-tag', tag.value)
      }

      event.stopPropagation()
    },

    onInputChange() {
      if (this.canFilter && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel
        this.handleQueryChange(this.query)
      }
    },

    onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount--
        this.filteredOptionsCount--
        this.internalOptions.splice(index, 1)
      }
    },

    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width
    },

    handleResize() {
      this.resetInputWidth()
      if (this.multiple) this.resetInputHeight()
    },

    checkDefaultFirstOption() {
      this.hoverIndex = -1
      // highlight the created option
      let hasCreated = false
      for (let i = this.internalOptions.length - 1; i >= 0; i--) {
        if (this.internalOptions[i].created) {
          hasCreated = true
          this.hoverIndex = i
          break
        }
      }
      if (hasCreated) return
      for (let i = 0; i !== this.internalOptions.length; ++i) {
        const option = this.internalOptions[i]
        if (this.query) {
          // highlight first internalOptions that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = i
            break
          }
        } else {
          // highlight currently selected option
          if (option.itemSelected) {
            this.hoverIndex = i
            break
          }
        }
      }
    },

    getValueKey(item) {
      if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item.value
      } else {
        return getValueByPath(item.value, this.valueKey)
      }
    },

    getRemoteData() {
      const { baseUrl = '', option = 'data' } = this.$EL_SELECT_PROP_CONFIG || {}
      !this.options &&
        this.api &&
        this.$http &&
        this.$http.get(baseUrl + this.api).then(res => {
          if (res.code !== 200) return
          this.remoteOptions = getValueByPath(res, this.dataPath || option)
        })
    },

    // 树的值改变
    onTreeInput(value) {
      this.$emit('input', value)
      if (!this.multiple) {
        this.visible = false
      }
    },

    onTreeChange(value, label, data) {
      this.$emit('change', value, label, data)
    }
  },

  created() {
    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', [])
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '')
    }

    this.debouncedOnInputChange = debounce(this.debounce, () => {
      this.onInputChange()
    })

    this.debouncedQueryChange = debounce(this.debounce, e => {
      this.handleQueryChange(e.target.value)
    })

    this.$on('handleOptionClick', this.handleOptionSelect)
    this.$on('setSelected', this.setSelected)
  },

  mounted() {
    this.getRemoteData()

    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = ''
    }
    addResizeListener(this.$el, this.handleResize)

    const reference = this.$refs.reference
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      }
      const input = reference.$el.querySelector('input')
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize]
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight()
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width
      }
    })
  },

  beforeDestroy() {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize)
  }
}
</script>
