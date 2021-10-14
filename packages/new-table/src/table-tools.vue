<template>
  <div class="el-new-table__tools" ref="tools">
    <el-context  class="el-new-table__tools-left" :ctx="{ size: layout.size }">
      <slot />
    </el-context>

    <div class="el-new-table__tools-right">
      <!-- 控制列的显隐 start -->
      <el-popover
        popper-class="el-new-table__column-config"
        v-model="columnConfVisible"
        placement="bottom"
      >
        <el-perfect-scrollbar tag="ul" style="max-height: 200px">
          <li v-for="column of column.allColumns" :key="column._id">
            <el-checkbox v-model="column.visible">
              {{ column.label }}
            </el-checkbox>

            <!-- <i class="el-icon-arrow-left"></i> -->
          </li>
        </el-perfect-scrollbar>

        <div style="text-align: right">
          <!-- <el-checkbox>全选</el-checkbox> -->
          <el-btn @click="changeColumnsVisibility" size="mini" type="text">确认</el-btn>
        </div>

        <template #reference>
          <el-btn :size="layout.size" style="margin-left: 10px" icon="s-operation" circle />
        </template>
      </el-popover>
      <!-- 控制列的显隐 end -->

      <el-radio-group v-model="layout.size" :size="layout.size">
        <el-radio-button label="mini">迷你</el-radio-button>
        <el-radio-button label="small">小</el-radio-button>
        <el-radio-button label="medium">中等</el-radio-button>
        <el-radio-button label="large">大</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import ElPopover from 'element-nice-ui/packages/popover'
import ElCheckbox from 'element-nice-ui/packages/checkbox'
import ElCheckboxGroup from 'element-nice-ui/packages/checkbox-group'
import ElBtn from 'element-nice-ui/packages/btn'
import ElPerfectScrollbar from 'element-nice-ui/packages/perfect-scrollbar'
import ElRadioGroup from 'element-nice-ui/packages/radio-group'
import ElRadioButton from 'element-nice-ui/packages/radio-button'
import ElContext from 'element-nice-ui/packages/context'

export default {
  name: 'ElTableTools',

  components: {
    ElPopover,
    ElCheckbox,
    ElCheckboxGroup,
    ElBtn,
    ElPerfectScrollbar,
    ElRadioGroup,
    ElRadioButton,
    ElContext
  },

  inject: ['column', 'layout'],

  data: () => ({
    columnConfVisible: false,

    visibleColumns: []
  }),

  methods: {
    changeColumnsVisibility() {
      this.column.setColumnsLayout()
      this.column.save()
      this.columnConfVisible = false
    }
  },

  mounted() {
    this.layout.refDom('tools', this.$refs.tools)
  }
}
</script>
