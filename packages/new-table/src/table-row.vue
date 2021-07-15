

<script>
export default {
  name: 'ElTableRow',

  props: {
    rowData: {
      type: Object
    },

    columns: {
      type: Array
    }
  },

  inject: ['table'],

  render(h) {
    const { rowData } = this
    const { computedHeaders } = this.table
    let cells = computedHeaders.map(header => {
      return <td>{rowData[header.prop]}</td>
    })
    return (
      <tr class="el-table__row">
        {cells}
      </tr>
    )
  }
}
</script>