<script>
export default {
  name: 'ElTableHeader',

  inject: ['column'],

  methods: {
    getLeftTh(h) {
      const { leftFixedColumns } = this.column

      let leftNodes = leftFixedColumns.slice(0, -1).map(column => (
        <th
          class={'el-new-table__left-fixed'}
          style={{ left: column._offsetLeft + 'px' }}
          key={column._id}
        >
          {column.label}
        </th>
      ))

      let leftLast = leftFixedColumns.slice(-1).map(column => (
        <th
          class={'el-new-table__left-fixed el-new-table__left-last'}
          style={{ left: column._offsetLeft + 'px' }}
          key={column._id}
        >
          {column.label}
        </th>
      ))

      return leftNodes.concat(leftLast)
    },

    getRightTh(h) {
      const { rightFixedColumns } = this.column

      let rightFirst = rightFixedColumns.slice(0, 1).map(column => (
        <th
          class={'el-new-table__right-fixed el-new-table__right-first'}
          style={{ right: column._offsetRight + 'px' }}
          key={column._id}
        >
          {column.label}
        </th>
      ))

      let rightNodes = rightFixedColumns.slice(1).map(column => (
        <th
          class={'el-new-table__right-fixed'}
          style={{ right: column._offsetRight + 'px' }}
          key={column._id}
        >
          {column.label}
        </th>
      ))

      return rightFirst.concat(rightNodes)
    }
  },

  render(h) {
    const { staticColumns } = this.column


    let leftHeaders = this.getLeftTh(h)

    let staticHeaders = staticColumns.map(column => {
      return <th key={column._id}>{column.label}</th>
    })

    let rightHeaders = this.getRightTh(h)

    return (
      <thead class='el-new-table__header' ref='header'>
        <tr>
          {leftHeaders}
          {staticHeaders}
          {rightHeaders}
        </tr>
      </thead>
    )
  }
}
</script>
