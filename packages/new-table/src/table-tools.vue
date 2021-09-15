<template>
  <div class="el-new-table__tools" ref="tools">
    <slot />

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

          <i class="el-icon-arrow-left"></i>
        </li>
      </el-perfect-scrollbar>

      <div style="text-align: right">
        <el-checkbox>全选</el-checkbox>
        <el-btn @click="changeColumnsVisibility" size="mini" type="text">确认</el-btn>
      </div>

      <template #reference>
        <el-btn style="margin-left: 10px" icon="s-operation" circle />
      </template>
    </el-popover>
    <!-- 控制列的显隐 end -->
  </div>
</template>

<script>
import ElPopover from 'element-nice-ui/packages/popover'
import ElCheckbox from 'element-nice-ui/packages/checkbox'
import ElCheckboxGroup from 'element-nice-ui/packages/checkbox-group'
import ElBtn from 'element-nice-ui/packages/btn'
import ElPerfectScrollbar from 'element-nice-ui/packages/perfect-scrollbar'
export default {
  name: 'ElTableTools',

  components: {
    ElPopover,
    ElCheckbox,
    ElCheckboxGroup,
    ElBtn,
    ElPerfectScrollbar
  },

  inject: ['column', 'layout'],

  data: () => ({
    columnConfVisible: false,

    visibleColumns: []
  }),

  methods: {
    changeColumnsVisibility() {
      this.column._setColumnsLayout()
      this.columnConfVisible = false
    }
  },

  mounted() {
    this.layout._set('tools', {
      height: this.$refs.tools.offsetHeight
    })
  }
}
</script>
