<script>
export default {
  name: 'ElTableRow',

  props: {
    rowData: {
      type: Object
    }
  },

  inject: ['table', 'column'],

  render(h) {
    const { rowData } = this
    const { staticColumns, leftFixedColumns, rightFixedColumns } = this.column

    let leftCells = leftFixedColumns.map((column, index) => {
      return (
        <td
          class={[
            'el-new-table__left-fixed',
            { 'el-new-table__left-last': index === leftFixedColumns.length - 1 }
          ]}
          style={{ left: column._offsetLeft + 'px' }}
        >
          {rowData[column.prop]}
        </td>
      )
    })
    let staticCells = staticColumns.map(column => {
      return <td>{rowData[column.prop]}</td>
    })
    let rightCells = rightFixedColumns.map((column, index) => {
      return (
        <td
          class={['el-new-table__right-fixed', { 'el-new-table__right-first': index === 0 }]}
          style={{ right: column._offsetRight + 'px' }}
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
