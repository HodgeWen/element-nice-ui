<script>
import { t } from 'element-nice-ui/src/locale'
export default {
  name: 'ElTableHeader',

  inject: ['store'],

  render(h) {
    const { headers } = this.store.state
    const ths = headers.map((header) => {
      return <th>{header.label}</th>
    })
    return (
      <thead class='el-table__header'>
        <tr>
          {ths}
        </tr>
      </thead>
    )
  }
}
</script>
