<script>
import { throttle } from 'throttle-debounce'
import ElRadioGroup from 'element-nice-ui/packages/radio-group'
import ElPopover from 'element-nice-ui/packages/popover'
import ElRadioButton from 'element-nice-ui/packages/radio-button'

export default {
  name: 'ElTableHeader',

  components: {
    ElRadioGroup,
    ElRadioButton,
    ElPopover
  },

  inject: ['column'],

  data: () => ({
    _pageX: 0,

    _targetCol: null,

    _targetColWidth: 0,

    _targetColIndex: -1,

    resizing: false
  }),

  methods: {
    renderHeaderItem(h, column) {
      const scopedSlots = {
        reference: () => <span>{column.label}</span>
      }

      let popover = (
        <el-popover scopedSlots={scopedSlots}>
          <div>
            <span style={{ display: 'inline-block', width: '60px' }}>对齐:</span>
            <el-radio-group
              value={column.align}
              onInput={v => {
                column.align = v
                popover.componentInstance.showPopper = false
                this.column.setColumnsLayout()
              }}
              size='mini'
            >
              <el-radio-button label='left'>左</el-radio-button>
              <el-radio-button label='center'>中</el-radio-button>
              <el-radio-button label='right'>右</el-radio-button>
            </el-radio-group>
          </div>
        </el-popover>
      )
      return popover
    },

    /** 渲染左侧固定的表头 */
    renderLeftTh(h) {
      const { leftFixedColumns, extraFixedHeaders } = this.column

      let leftNodes = leftFixedColumns.map((column, index) => (
        <th
          class={'el-new-table__left-fixed'}
          style={{ left: column._offsetLeft + 'px', textAlign: column.align }}
          key={column._id}
        >
          {this.renderHeaderItem(h, column)}
          <div class='el-new-table__handle' onMousedown={e => this.mousedown(e, index)}></div>
        </th>
      ))

      // let last = leftNodes[leftNodes.length - 1]
      // if (last) {
      //   last.data.class += ' el-new-table__left-last'
      // }

      return leftNodes
    },

    /** 渲染右侧固定的表头 */
    renderRightTh(h) {
      const { rightFixedColumns } = this.column

      let baseIndex = ['leftFixedColumns', 'staticColumns'].reduce((acc, cur) => {
        return acc + this.column[cur].length
      }, 0)
      let rightNodes = rightFixedColumns.map((column, index) => (
        <th
          class={'el-new-table__right-fixed'}
          style={{ right: column._offsetRight + 'px', textAlign: column.align }}
          key={column._id}
        >
          {this.renderHeaderItem(h, column)}
          <div
            class='el-new-table__handle'
            onMousedown={e => this.mousedown(e, baseIndex + index)}
          ></div>
        </th>
      ))

      // if (rightNodes[0]) {
      //   rightNodes[0].data.class += ' el-new-table__right-first'
      // }

      return rightNodes
    },

    mousedown(e, index) {
      // 鼠标移动初始路径
      this.$data._pageX = e.pageX

      // 目标列的索引
      index += this.column.extraFixedHeaders.length
      this.$data._targetColIndex = index

      // 目标列
      this.$data._targetCol = document.querySelectorAll('.el-new-table__main col')[index]
      // 目标列的初始宽度
      this.$data._targetColWidth = +this.$data._targetCol.offsetWidth
      // 进入移动状态, 此刻, 鼠标总会显示可移动的样式
      this.resizing = true

      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },

    /** 移动表头, 根据colgroup特性, 表列也会同时呗拖拽为指定宽度 */
    mousemove: throttle(25, false, function(e) {
      this.$data._targetCol.style.width =
        this.$data._targetColWidth + (e.pageX - this.$data._pageX) + 'px'
    }),

    /** 放开鼠标, 移除鼠标事件, 同时将当前表格列信息存储到idb数据库中 */
    mouseup(e) {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)

      // 将视图中的列宽映射到列数据中
      this.column.allColumns[
        this.$data._targetColIndex - this.column.extraFixedHeaders.length
      ].width = parseInt(this.$data._targetCol.style.width)

      this.column.setColumnsLayout()

      // 拖拽行为结束, 鼠标指针样式恢复正常样式
      this.resizing = false
    }
  },

  render(h) {
    const { staticColumns, extraFixedHeaders } = this.column

    // 左固定列 为 额为固定列加上需要渲染的左侧固定列
    let leftHeaders = this.renderLeftTh(h)

    // 静态列
    let staticHeaders = staticColumns.map((column, index) => {
      return (
        <th class="el-new-table__static" key={column._id} style={{ textAlign: column.align }}>
          {this.renderHeaderItem(h, column)}
          <div
            class='el-new-table__handle'
            onMousedown={e => this.mousedown(e, leftHeaders.length + index)}
          ></div>
        </th>
      )
    })

    // 右固定列
    let rightHeaders = this.renderRightTh(h)

    return (
      <thead class='el-new-table__header' ref='header'>
        <tr class={{ 'el-new-table__header--resizing': this.resizing }}>
          {extraFixedHeaders}
          {leftHeaders}
          {staticHeaders}
          {rightHeaders}
        </tr>
      </thead>
    )
  }
}
</script>
