<template>
  <el-tooltip content="列设置" placement="top">
    <!-- 控制列的显隐 start -->
    <el-popover popper-class="el-new-table__column-config" v-model="visible" placement="bottom">
      <div class="el-new-table__column-config-header">
        <el-checkbox
          :indeterminate="indeterminate"
          @input="changeAllColumnsVisible"
          v-model="allColumnsVisible"
        >
          全选
        </el-checkbox>
      </div>

      <vue-draggable
        tag="div"
        style="max-height: 250px; width: 300px; overflow: auto"
        :value="column.allColumns"
        @input="onColumnReorder"
        v-bind="$data._dragOptions"
        @start="dragging = true"
        @end="dragging = false"
      >
        <transition-group tag="ul" type="transition">
          <li v-for="column of column.allColumns" :key="column._id">
            <i class="el-icon-rank handle"></i>

            <el-checkbox :value="column.visible" @input="changeColumnsVisibility(column, $event)">
              {{ column.label }}
            </el-checkbox>

            <span style="float: right">
              <el-tooltip :enterable="false" placement="top-end" content="固定到左侧">
                <i
                  @click="changeColumnFixed(column, 'left')"
                  :class="['el-icon-caret-left', column.fixed === 'left' && 'column-fixed']"
                ></i>
              </el-tooltip>

              <el-tooltip :enterable="false" placement="top-end" content="固定到右侧">
                <i
                  @click="changeColumnFixed(column, 'right')"
                  :class="['el-icon-caret-right', column.fixed === 'right' && 'column-fixed']"
                ></i>
              </el-tooltip>
            </span>
          </li>
        </transition-group>
      </vue-draggable>

      <template #reference>
        <el-btn :size="layout.size" icon="setting" circle></el-btn>
      </template>
    </el-popover>
  </el-tooltip>
</template>

<script>
import VueDraggable from 'vuedraggable'
import ElTooltip from 'element-nice-ui/packages/tooltip'
import ElCheckbox from 'element-nice-ui/packages/checkbox'
import ElCheckboxGroup from 'element-nice-ui/packages/checkbox-group'
import ElPerfectScrollbar from 'element-nice-ui/packages/perfect-scrollbar'
import ElPopover from 'element-nice-ui/packages/popover'
import ElBtn from 'element-nice-ui/packages/btn'

export default {
  components: {
    VueDraggable,
    ElTooltip,
    ElCheckbox,
    ElCheckboxGroup,
    ElPerfectScrollbar,
    ElPopover,
    ElBtn
  },

  inject: ['layout', 'column'],

  data: () => ({
    // sortable的参数
    _dragOptions: {
      animation: 200,
      group: 'description',
      ghostClass: 'column-item__ghost',
      handle: '.el-icon-rank.handle'
    },

    dragging: false,

    visible: false,

    allColumnsVisible: false,

    indeterminate: false
  }),

  watch: {
    'column.allColumns'(columns) {
      this.computeColumnsCheckStatus(columns)
    }
  },

  methods: {
    layoutAndSave() {
      this.column.setColumnsLayout()
      this.column.save()
    },

    onColumnReorder(newList) {
      this.column.allColumns = newList
      this.layoutAndSave()
    },

    changeColumnsVisibility(column, columnVisible) {
      column.visible = columnVisible
      this.computeColumnsCheckStatus(this.column.allColumns)
      this.layoutAndSave()
    },

    /** 计算列的选中状态 */
    computeColumnsCheckStatus(columns) {
      //  至少有一个选中为中间态
      let indeterminate = false
      // 全部选中
      let allColumnsVisible = true

      columns.some(column => {
        if (!column.visible) {
          allColumnsVisible = false
        } else {
          indeterminate = true
        }

        return !allColumnsVisible && indeterminate
      })
      this.allColumnsVisible = allColumnsVisible
      this.indeterminate = allColumnsVisible ? false : indeterminate
    },

    changeAllColumnsVisible(visible) {
      this.column.allColumns.forEach(column => {
        column.visible = visible
      })
      this.layoutAndSave()
    },

    changeColumnFixed(column, type) {
      if (column.fixed === type) {
        column.fixed = ''
      } else {
        column.fixed = type
      }

      this.layoutAndSave()
    }
  }
}
</script>
