<script>
import ElCheckbox from 'element-nice-ui/packages/checkbox'
import ElRadio from 'element-nice-ui/packages/radio'
export default {
  name: 'ElTableRow',

  props: {
    rowData: {
      type: Object,
      required: true
    },

    rowIndex: {
      type: Number,
      required: true
    },

    rowRenderQueue: {
      type: Object,
      required: true
    }
  },

  inject: ['column'],

  data() {
    return {
      expanded: false
    }
  },

  watch: {
    rowData(v) {
      this.expanded = v._expanded
    }
  },

  methods: {
    /** 渲染额外单元格 */
    renderExtraFixedCells() {
      const { allColumns, checkable, showAsTree, selectable } = this.column

      // 防止样式出现一瞬间的错乱
      if (!allColumns.length) {
        return []
      }

      let nodeList = []

      if (showAsTree) {
        nodeList.push(
          <td class='el-new-table__left-fixed' style='text-align: left; left: 0'>
            {this.rowData.children && this.rowData.children.length ? (
              <i
                onClick={this.expand}
                class={[this.expanded ? 'el-icon-arrow-down' : 'el-icon-arrow-right']}
                style={{
                  cursor: 'pointer',
                  'margin-left': this.rowData._depth * 10 + 'px'
                }}
              ></i>
            ) : null}
          </td>
        )
      }

      let style = {
        'text-align': 'center',
        left: nodeList.length ? '60px' : '0px'
      }

      if (checkable) {
        nodeList.push(
          <td class='el-new-table__left-fixed' style={style}>
            <ElCheckbox />
          </td>
        )
      } else if (selectable) {
        nodeList.push(
          <td class='el-new-table__left-fixed' style={style}>
            <ElRadio />
          </td>
        )
      }

      return nodeList
    },

    expand() {
      this.expanded = !this.rowData._expanded
      this.$emit('expand', this.rowData)
    }
  },

  render(h) {
    const { rowData, rowRenderQueue, rowIndex } = this

    let extraCells = this.renderExtraFixedCells()

    let leftCells = extraCells.concat(rowRenderQueue.left.map(fn => fn(rowData, rowIndex)))

    let last = leftCells[leftCells.length - 1]
    if (last) {
      last.data.class += ' el-new-table__left-last'
    }

    let staticCells = rowRenderQueue.static.map(fn => fn(rowData, rowIndex))

    let rightCells = rowRenderQueue.right.map(fn => fn(rowData, rowIndex))

    let first = rightCells[0]
    if (first) {
      first.data.class += ' el-new-table__right-first'
    }

    return [
      <tr class='el-new-table__row'>
        {leftCells}
        {staticCells}
        {rightCells}
      </tr>
    ]
  }
}
</script>
