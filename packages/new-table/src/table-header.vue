<script>
export default {
  name: 'ElTableHeader',

  inject: ['table'],

  render(h) {
    const { computedHeaders } = this.table
    const ths = computedHeaders.map((header) => {
      return <th>{header.label}</th>
    })
    return (
      <thead class='el-new-table__header'>
        <tr>
          {ths}
        </tr>
      </thead>
    )
  }
}
</script>
