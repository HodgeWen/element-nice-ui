<template>
  <div class="el-new-table__tools" ref="tools">
    <slot />

    <!-- 控制列的显隐 start -->
    <el-popover v-model="columnConfVisible" style="height: 200px" placement="bottom">
      <!-- <el-checkbox-group v-model="visibleColumns"> -->
        <el-checkbox
          style="display: block"
          v-for="column of column.allColumns"
          v-model="column.visible"
          :key="column._id"
        >
          {{ column.label }}
        </el-checkbox>
      <!-- </el-checkbox-group> -->

      <div style="text-align: right">
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

export default {
  name: 'ElTableTools',

  components: {
    ElPopover,
    ElCheckbox,
    ElCheckboxGroup,
    ElBtn
  },

  inject: ['column', 'layout'],

  data: () => ({
    columnConfVisible: false,

    visibleColumns: []
  }),

  methods: {
    changeColumnsVisibility() {
      this.column._updateVisibility()
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
