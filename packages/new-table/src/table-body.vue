<script>
import ElTableRow from './table-row.vue'

export default {
  name: 'ElTableBody',

  components: {
    ElTableRow
  },

  inject: ['model', 'column', 'root', 'layout'],

  data: () => ({
    flatData: []
  }),

  computed: {
    // TODO renderQueue
    rowRenderQueue() {
      const { root } = this
      const { leftFixedColumns, staticColumns, rightFixedColumns, showAsTree } = this.column
      const { childrenKey } = this.model
      const { size } = this.layout

      let getExpandPadding = (column, row) => {
        return [
          <i style={{ 'margin-left': row._depth * 20 + 'px' }}></i>,
          row[childrenKey] && row[childrenKey].length ? (
            <i
              class={[row.$_expanded ? 'el-icon-arrow-down' : 'el-icon-arrow-right']}
              onClick={() => this.expand(row)}
              style={{
                cursor: 'pointer'
              }}
            ></i>
          ) : null
        ]
      }


      let getCellRender = (column, leftColumnIndex) => {
        // 如果是树形显示
        if (showAsTree && leftColumnIndex === 0) {
          if (column.formatter) {
            return (rowData, rowIndex) => [
              getExpandPadding(column, rowData),
              column.formatter(rowData, rowData[column.prop], rowIndex)
            ]
          } else if (column.slotName) {
            return (rowData, rowIndex) => {
              let fn = root.$scopedSlots[`column.${column.slotName}`]
              return [
                getExpandPadding(column, rowData),
                fn ? fn({ row: rowData, index: rowIndex, value: rowData[column.prop], size }) : '--'
              ]
            }
          } else {
            return  rowData => [
              getExpandPadding(column, rowData),
              rowData[column.prop]
            ]
          }
        }

        if (column.formatter) {
          return (rowData, rowIndex) => [column.formatter(rowData, rowData[column.prop], rowIndex)]
        } else if (column.slotName) {
          return (rowData, rowIndex) => {
            let fn = root.$scopedSlots[`column.${column.slotName}`]
            return [fn ? fn({ row: rowData, index: rowIndex, value: rowData[column.prop], size }) : '--']
          }
        } else {
          return rowData => rowData[column.prop]
        }
      }

      // 渲染队列, 直接根据column信息生成每个单元格的渲染队列
      let leftRenderQueue = leftFixedColumns.map((column, index) => {
        let cellRender = getCellRender(column, index)
        let className = 'el-new-table__left-fixed'

        return (rowData, rowIndex) => {
          return (
            <td
              class={className}
              key={column._id}
              style={{ left: column._offsetLeft + 'px', textAlign: column.align }}
            >
              {cellRender(rowData, rowIndex)}
            </td>
          )
        }
      })

      let staticRenderQueue = staticColumns.map(column => {
        let cellRender = getCellRender(column)

        return (rowData, rowIndex) => {
          return (
            <td class='el-new-table__static' key={column._id} style={{ textAlign: column.align }}>
              {cellRender(rowData, rowIndex)}
            </td>
          )
        }
      })

      let rightRenderQueue = rightFixedColumns.map(column => {
        let cellRender = getCellRender(column)
        let className = 'el-new-table__right-fixed'

        return (rowData, rowIndex) => {
          return (
            <td
              class={className}
              key={column._id}
              style={{ right: column._offsetRight + 'px', textAlign: column.align }}
            >
              {cellRender(rowData, rowIndex)}
            </td>
          )
        }
      })

      return {
        left: leftRenderQueue,
        static: staticRenderQueue,
        right: rightRenderQueue
      }
    }
  },

  methods: {
    expand(item) {
      item.$_expanded = !item.$_expanded
      this.getFlatData()
    },

    getFlatData() {
      let ret = []
      const { childrenKey, showAsTree } = this.model

      if (!showAsTree) {
        this.flatData = this.model.data
      }

      function recurse(data) {
        data.forEach((item, i) => {
          ret.push(item)
          if (item[childrenKey] && item.$_expanded) {
            recurse(item[childrenKey])
          }
        })
      }

      recurse(this.model.data)

      this.flatData = ret
    }
  },

  watch: {
    'model.data': {
      handler() {
        this.getFlatData()
      },
      immediate: true
    }
  },

  render() {
    const flatData = this.flatData
    const { rowKey } = this.model
    // 有时候, 会因为在数据库中取值导致第一次无法取得有效的列
    // 因此可以过滤掉一次无效的渲染, 保证每个row只会被渲染一次
    let hasColumn = ['left', 'static', 'right'].some(key => {
      return this.rowRenderQueue[key].length
    })
    return (
      <tbody class='el-new-table__body'>
        {hasColumn
          ? flatData.map((row, i) => (
              <el-table-row
                row-render-queue={this.rowRenderQueue}
                row-data={row}
                row-index={i}
                row-key={rowKey}
                key={rowKey ? row[rowKey] : i}
              />
            ))
          : null}
      </tbody>
    )
  }
}
</script>
