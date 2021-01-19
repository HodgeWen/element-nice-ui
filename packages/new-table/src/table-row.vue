

<script>
export default {
  name: 'ElTableRow',

  props: {
    row: {
      type: Object
    },

    columns: {
      type: Array
    }
  },



  inject: ['store'],

  render(h) {
    const { headers } = this.store.state
    const { row } = this
    let cells = headers.map(header => {
      return <td>{row[header.prop]}</td>
    })
    return (
      <tr class="el-table__row">
        {cells}
      </tr>
    )
  }
}
</script>