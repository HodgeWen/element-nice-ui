import { treeMap } from './util'
import { openDB } from 'idb'

/** 该类用以提供表格的列数据和列操作 */
export default class Column {
  align = 'left'

  /** 当前的表格标识 */
  tableCode = ''

  /** @type {import('idb').IDBPDatabase} idb数据库  */
  db = null

  defaultWidth = 100

  /** store名称 */
  storeName = 'table_columns'

  allColumns = []

  /** 左侧固定列 */
  leftFixedColumns = []

  /** 静态列 */
  staticColumns = []

  /** 右侧固定列 */
  rightFixedColumns = []

  constructor(columns, configs) {
    configs &&
      Object.keys(configs).forEach(key => {
        this[key] = configs[key]
      })

    // tableCode需链接Idb数据库
    if (this.tableCode) {
      this._openDataBase(this.tableCode, columns)
    } else {
      this._initColumns(columns)
    }
  }

  /**
   * 初始化表头
   * @param {any[]} columns 列信息
   */
  _initColumns(columns) {
    let id = 0
    this.allColumns = treeMap(columns, column => {
      column._id = id++
      column.visible = true
      if (!column.align) {
        column.align = this.align
      }
    }).map(column => {
      // 只针对一级列设置
      if (!column.width && !column.minWidth) {
        column.width = this.defaultWidth
      }

      return column
    })
  }

  /**
   * 更新列的显示隐藏
   */
  _setColumnsLayout() {
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

    this.db?.put(this.storeName, { code: this.tableCode, columns: this.allColumns })
  }

  /** 打开列数据库, 读取或存入数据 */
  async _openDataBase(code, columns) {
    const { storeName } = this

    // 打开或创建数据库
    const db = await openDB('element_db', 1, {
      upgrade(db) {
        db.createObjectStore(storeName, {
          keyPath: 'code'
        })
      }
    })

    this.db = db

    const record = await db.get(storeName, code)

    if (record) {

      this.allColumns = record.columns
      this._setColumnsLayout()
    } else {
      this._initColumns(columns)
      this._setColumnsLayout()

      await db.add(storeName, {
        code,
        columns: this.allColumns
      })
    }
    return db
  }

  /** 重置列 */
  resetColumns(columns) {
    this._initColumns(columns)
    this._setColumnsLayout()
  }

  async _mergeColumns() {
    const { allColumns } = this
    // 打开或创建数据库
    const db = await openDB('element_db', 1, {
      upgrade(db) {
        db.createObjectStore(storeName, {
          keyPath: 'code'
        })
      }
    })


  }
}
