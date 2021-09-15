<template>
  <div class="el-table-select">
    <el-context tag="span" v-if="$slots.default" :ctx="{ size }" @click="onTrigger">
      <slot />
    </el-context>

    <el-input
      v-else
      :validate-event="false"
      readonly
      :value="inputValue || label"
      @focus="onTrigger"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <template #suffix>
        <i class="el-input__icon el-icon-circle-close" style="cursor: pointer" v-if="clearable && inputHovering && (inputValue || label)" @click="clearSelection"></i>

        <i
          v-else
          class="el-icon-arrow-down el-input__icon"
          :style="{ transform: `rotate(${visible ? '-180deg' : '0'})` }"
        ></i>
      </template>
    </el-input>

    <el-dialog
      class="el-table-select__dialog"
      v-model="visible"
      :width="width"
      render-body-without-open
      append-to-body
      :title="placeholder"
      :confirm="onConfirm"
    >
      <el-table
        v-model="selected"
        ref="table"
        height="300px"
        :row-key="optionValue"
        v-bind="$attrs"
        :data="data"
        :stripe="false"
        @data-loaded="init"
      >
        <template #searcher>
          <slot name="searcher" />
        </template>

        <template #tools>
          <slot name="tools" />
        </template>

        <template v-for="name of keys($scopedSlots)" v-slot:[name]="attrs">
          <slot :name="name" v-bind="attrs" />
        </template>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import ElTable from 'element-nice-ui/packages/table'
import ElDialog from 'element-nice-ui/packages/dialog'
import ElInput from 'element-nice-ui/packages/input'
import ElContext from 'element-nice-ui/packages/context'

export default {
  name: 'ElTableSelect',

  components: {
    ElTable,
    ElDialog,
    ElInput,
    ElContext
  },

  inheritAttrs: false,

  props: {
    multiple: Boolean,

    value: [Array, String, Number],

    optionLabel: {
      default: 'label'
    },

    optionValue: {
      default: 'value'
    },

    placeholder: {
      default: '请选择'
    },

    clearable: Boolean,

    width: {
      type: String,
      default: '900px'
    },

    label: {
      type: String
    },

    size: {
      type: String
    },

    data: {
      type: Array
    }
  },

  data: () => ({
    visible: false,

    inputValue: '',

    selected: null,

    initialized: false,

    inputHovering: false
  }),

  watch: {
    data(v) {
      this.$nextTick(() => {
        this.init()
      })
    },

    value(v) {
      this.init()
    }
  },

  methods: {
    onTrigger() {
      this.visible = !this.visible
    },

    clearSelection() {
      this.emitInput(this.multiple ? [] : undefined)
    },

    keys(value) {
      return Object.keys(value).filter(item => item.startsWith('column'))
    },

    /** 初始化选中的值, 并在视图中选中 */
    init() {
      if (!Array.isArray(this.value)) {
        let row = this.$refs.table.setRowByKey(this.value)
        this.getInputValue(row)
      } else {
        let rows = this.$refs.table.setSelection(this.value, this.optionValue)

        this.getInputValue(rows)
      }
      this.initialized = true
    },

    getInputValue(v) {
      const { optionLabel: ol } = this
      if (Array.isArray(v)) {
        this.inputValue = v.map(item => item[ol]).join(', ')
      } else if (!!v) {
        this.inputValue = v[ol]
      } else {
        this.inputValue = ''
      }
    },

    emitInput(v) {
      const { optionValue: ov, optionLabel: ol } = this
      if (Array.isArray(v)) {
        this.$emit(
          'input',
          v.map(item => item[ov]),
          v.map(item => item[ol]),
          v
        )
      } else if (!!v) {
        this.$emit('input', v[ov], v[ol], v)
      } else {
        this.$emit('input', '')
      }
    },

    onConfirm() {
      this.emitInput(this.selected)
      this.getInputValue(this.selected)

      this.visible = false
    }
  },

  created() {
    if (this.multiple) {
      this.selected = []
    }
  }
}
</script>
