<script>
import { throttle } from 'throttle-debounce'
export default {
  name: 'ElTableHeader',

  inject: ['column'],

  data: () => ({
    _pageX: 0,

    _targetCol: null,

    _targetColWidth: 0,

    resizing: false
  }),

  methods: {
    getLeftTh(h) {
      const { leftFixedColumns } = this.column

      let leftNodes = leftFixedColumns.map((column, index) => (
        <th
          class={'el-new-table__left-fixed'}
          style={{ left: column._offsetLeft + 'px', textAlign: column.align }}
          key={column._id}
        >
          {column.label}

          <div class='el-new-table__handle' onMousedown={e => this.mousedown(e, index)}></div>
        </th>
      ))

      // let last = leftNodes[leftNodes.length - 1]
      // if (last) {
      //   last.data.class += ' el-new-table__left-last'
      // }

      return leftNodes
    },

    getRightTh(h) {
      const { rightFixedColumns } = this.column

      let rightNodes = rightFixedColumns.map(column => (
        <th
          class={'el-new-table__right-fixed'}
          style={{ right: column._offsetRight + 'px', textAlign: column.align }}
          key={column._id}
        >
          {column.label}
          <div class='el-new-table__handle'></div>
        </th>
      ))

      // if (rightNodes[0]) {
      //   rightNodes[0].data.class += ' el-new-table__right-first'
      // }

      return rightNodes
    },

    mousedown(e, index) {
      this.$data._pageX = e.pageX
      this.$data._targetCol = document.querySelectorAll('.el-new-table__main col')[index]
      this.$data._targetColWidth = +this.$data._targetCol.offsetWidth
      this.resizing = true
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },

    mousemove: throttle(25, false, function(e) {
      this.$data._targetCol.style.width =
        this.$data._targetColWidth + (e.pageX - this.$data._pageX) + 'px'
    }),

    mouseup(e) {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
      this.resizing = false
    }
  },

  render(h) {
    const { staticColumns } = this.column

    let leftHeaders = this.getLeftTh(h)

    let staticHeaders = staticColumns.map((column, index) => {
      return (
        <th key={column._id} style={{ textAlign: column.align }}>
          {column.label}
          <div
            class='el-new-table__handle'
            onMousedown={e => this.mousedown(e, index + leftHeaders.length)}
          ></div>
        </th>
      )
    })

    let rightHeaders = this.getRightTh(h)

    return (
      <thead class='el-new-table__header' ref='header'>
        <tr class={{ 'el-new-table__header--resizing': this.resizing }}>
          {leftHeaders}
          {staticHeaders}
          {rightHeaders}
        </tr>
      </thead>
    )
  }
}
</script>
