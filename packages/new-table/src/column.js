import { treeMap } from './util'

/** 该类用以提供表格的列数据和列操作 */
export default class Column {
  align = 'left'

  defaultWidth = 100

  minWidth = 100

  allColumns = []

  /** 左侧固定列 */
  leftFixedColumns = []

  /** 静态列 */
  staticColumns = []

  /** 右侧固定列 */
  rightFixedColumns = []

  constructor(columns, configs) {
    this._initColumns(columns)

    configs &&
      Object.keys(configs).forEach(key => {
        this[key] = configs[key]
      })
  }

  /**
   * 初始化表头
   * @param {any[]} columns 列信息
   */
  _initColumns(columns) {
    let id = 0
    this.allColumns = treeMap(columns, column => {
      column._id = id++
    })

    this.allColumns.forEach(column => {
      column.visible = true

      if (!column.fixed) {
        return this.staticColumns.push(column)
      }
      if (column.fixed === 'left') {
        let last = this.leftFixedColumns[this.leftFixedColumns.length - 1]
        this.leftFixedColumns.push({
          ...column,
          _offsetLeft: last ? last._offsetLeft + last.width : 0
        })
      } else {
        let first = this.rightFixedColumns[0]
        this.rightFixedColumns.push({
          ...column,
          _offsetRight: first ? first._offsetRight + first.width : 0
        })
      }
    })
  }

  /**
   * 更新列的显示隐藏
   */
  _updateVisibility() {
    let leftFixedColumns = []
    let staticColumns = []
    let rightFixedColumns = []

    this.allColumns.forEach(column => {
      if (column.visible === false) return

      if (!column.fixed) {
        return staticColumns.push(column)
      }
      if (column.fixed === 'left') {
        let last = leftFixedColumns[leftFixedColumns.length - 1]
        leftFixedColumns.push({
          ...column,
          _offsetLeft: last ? last._offsetLeft + last.width : 0
        })
      } else {
        let first = rightFixedColumns[0]
        rightFixedColumns.push({
          ...column,
          _offsetRight: first ? first._offsetRight + first.width : 0
        })
      }
    })
    this.leftFixedColumns = leftFixedColumns
    this.staticColumns = staticColumns
    this.rightFixedColumns = rightFixedColumns
  }
}
