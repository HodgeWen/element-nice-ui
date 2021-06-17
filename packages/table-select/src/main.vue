<template>
  <div class="el-table-select">
    <el-input readonly :value="inputValue" @focus="onTrigger" />

    <el-dialog
      class="el-table-select__dialog"
      v-model="visible"
      width="900px"
      hide-footer
      render-body-without-open
      append-to-body
    >
      <el-table
        :value="select"
        ref="table"
        height="300px"
        :row-key="optionValue"
        @input="onTableInput"
        v-bind="$attrs"
        @data-loaded="init"
      >
        <template #tools>
          <slot name="searcher" />
        </template>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import ElTable from 'element-nice-ui/packages/table'
import ElDialog from 'element-nice-ui/packages/dialog'
import ElInput from 'element-nice-ui/packages/input'

export default {
  name: 'ElTableSelect',

  components: {
    ElTable,
    ElDialog,
    ElInput
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
    }
  },

  data: () => ({
    visible: false,

    inputValue: '',

    select: null,

    initialized: false
  }),

  methods: {
    onTrigger() {
      this.visible = !this.visible
    },

    init() {
      if (this.initialized || this.value === null || this.value === undefined) return
      if (!Array.isArray(this.value)) {
        let row = this.$refs.table.setRowByKey(this.value)
        this.getInputValue(row)
      } else {

      }
      this.initialized = true
    },

    getInputValue(v) {
      const { optionValue: ov, optionLabel: ol } = this
      if (Array.isArray(v)) {
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

    onTableInput(v) {
      this.emitInput(v)
      this.getInputValue(v)

      this.visible = false
    }
  },

  created() {
    if (this.multiple) {
      this.select = []
    }
  }
}
</script>
