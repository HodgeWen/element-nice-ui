<template>
  <div class="el-new-table__tools" ref="tools">
    <el-context class="el-new-table__tools-left" :ctx="{ size: layout.size }">
      <slot />

      <!-- <el-btn type="primary" @click="onExport">导出</el-btn> -->
    </el-context>

    <div class="el-new-table__tools-right">
      <!-- 清空数据库 -->
      <el-tooltip content="恢复默认" placement="top">
        <el-btn @click="deleteRecord" :size="layout.size" icon="refresh" circle></el-btn>
      </el-tooltip>

      <el-tooltip content="尺寸设置" placement="top">
        <el-popover popper-class="el-new-table__size-config" v-model="sizeConfVisible">
          <template #reference>
            <el-btn :size="layout.size" icon="s-operation" circle></el-btn>
          </template>

          <ul>
            <li
              v-for="size of sizes"
              :key="size.value"
              :class="{ 'el-new-table__size-item--selected': size.value === layout.size }"
              @click="changeSize(size.value)"
            >
              {{ size.label }}
            </li>
          </ul>
        </el-popover>
      </el-tooltip>

      <!-- 控制列-->
      <ColumnsSetting />
    </div>
  </div>
</template>

<script>
import ElPopover from 'element-nice-ui/packages/popover'
import ElBtn from 'element-nice-ui/packages/btn'
import ElDropdown from 'element-nice-ui/packages/dropdown'
import ElContext from 'element-nice-ui/packages/context'
import ElTooltip from 'element-nice-ui/packages/tooltip'
import ColumnsSetting from './table-tools/columns-setting.vue'

export default {
  name: 'ElTableTools',

  components: {
    ElPopover,
    ElBtn,
    ElDropdown,
    ElContext,
    ElTooltip,
    ColumnsSetting
  },

  inject: ['column', 'layout'],

  data: () => ({
    sizes: [
      { label: '迷你', value: 'mini' },
      { label: '小', value: 'small' },
      { label: '默认', value: 'medium' },
      { label: '大', value: 'large' }
    ],

    sizeConfVisible: false
  }),

  methods: {
    deleteRecord() {
      this.column.delete()
      this.column.init()
    },

    changeSize(size) {
      this.layout.size = size
      this.sizeConfVisible = false
    },

    onExport() {
      this.column.allColumns.filter(column => column.visible && !column)
    }
  },

  mounted() {
    this.layout.refDom('tools', this.$refs.tools)
  }
}
</script>
