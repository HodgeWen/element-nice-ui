<script>
export default {
  name: 'ElTableRow',

  props: {
    rowData: {
      type: Object
    }
  },

  inject: ['column'],

  render(h) {
    const { rowData } = this
    const { staticColumns, leftFixedColumns, rightFixedColumns } = this.column

    let leftCells = leftFixedColumns.map((column, index) => {
      return (
        <td
          class={['el-new-table__left-fixed']}
          style={{ left: column._offsetLeft + 'px', textAlign: column.align }}
        >
          {rowData[column.prop]}
        </td>
      )
    })
    let staticCells = staticColumns.map(column => {
      return <td style={{ textAlign: column.align }}>{rowData[column.prop]}</td>
    })
    let rightCells = rightFixedColumns.map((column, index) => {
      return (
        <td
          class={['el-new-table__right-fixed']}
          style={{ right: column._offsetRight + 'px', textAlign: column.align }}
        >
          {rowData[column.prop]}
        </td>
      )
    })
    return (
      <tr class='el-new-table__row'>
        {leftCells}
        {staticCells}
        {rightCells}
      </tr>
    )
  }
}
</script>
