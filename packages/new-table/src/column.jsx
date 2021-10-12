import Vue from 'vue'
import { treeMap } from './util'
import { openDB, Store } from './db'
import ElCheckbox from 'element-nice-ui/packages/checkbox'
import ElRadio from 'element-nice-ui/packages/radio'

/**
 * 创建列数据
 * @param {Object} options 配置
 * @param {string} options.tableCode 表格标识
 * @param {boolean} options.checkable 可选择的
 */
export default function createColumns(options) {
  return new Vue({
    data() {
      const state = {
        tableCode: '',

        align: 'center',

        defaultWidth: 100,

        allColumns: [],

        /** 左侧固定列 */
        leftFixedColumns: [],

        /** 静态列 */
        staticColumns: [],

        /** 右侧固定列 */
        rightFixedColumns: [],

        storeName: 'table',

        _db: null,

        checkable: false,
        checked: [],

        selectable: false,
        selected: null,

        showAsTree: false,

        /** 可选中列的列宽 */
        _checkableColumnWidth: 60,
        /** 可展开的列宽 */
        _treeExpandableColumnWidth: 60
      }
      options &&
        Object.keys(options).forEach(key => {
          if (options[key] === undefined) return
          state[key] = options[key]
        })

      return state
    },

    computed: {
      /** 初始左侧偏移量, 根据当前的表格可否选择和可否展开来决定 */
      initialOffsetLeft() {
        let offsetLeft = 0
        if (this.checkable) {
          offsetLeft += this.$data._checkableColumnWidth
        }
        if (this.showAsTree) {
          offsetLeft += this.$data._treeExpandableColumnWidth
        }
        return offsetLeft
      },

      // 渲染函数用来缓存checkable和showAsTree计算
      /** 渲染额外表头 */
      extraFixedHeaders() {
        let nodeList = []
        if (this.checkable) {
          nodeList.push(
            <th class='el-new-table__left-fixed' style='text-align: center; left: 0'>
              <ElCheckbox />
            </th>
          )
        } else if (this.selectable) {
          nodeList.push(
            <th class='el-new-table__left-fixed' style='text-align: center; left: 0'>
              <ElRadio />
            </th>
          )
        }

        if (this.showAsTree) {
          nodeList.push(
            <th class='el-new-table__left-fixed'>
              <i class='el-icon-right'></i>
            </th>
          )
        }

        return nodeList
      },

      /** 渲染额外单元格 */
      renderExtraFixedCells(row) {
        let nodeList = []
        if (this.checkable) {
          nodeList.push(() => (
            <td class='el-new-table__left-fixed' style='text-align: center; left: 0'>
              <ElCheckbox />
            </td>
          ))
        } else if (this.selectable) {
          nodeList.push(() => (
            <td class='el-new-table__left-fixed' style='text-align: center; left: 0'>
              <ElRadio />
            </td>
          ))
        }

        if (this.showAsTree) {
          nodeList.push(() => (
            <td class='el-new-table__left-fixed'>
              <i class='el-icon-right'></i>
            </td>
          ))
        }

        return function() {
          return nodeList.map(r => r())
        }
      },

      /** 渲染额外的列组 */
      extraColumns() {
        let extraCols = []
        if (this.checkable || this.selectable) {
          extraCols.push({
            _id: 999,
            width: 60,
            fixed: 'left',
            _offsetLeft: 0
          })
        }

        if (this.showAsTree) {
          extraCols.push({
            _id: 1000,
            width: 60,
            fixed: 'left',
            _offsetLeft: 0
          })
        }

        return extraCols
      }
    },

    methods: {
      async connectDB() {
        const { storeName } = this
        const db = await openDB('el-element', 1, db => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, {
              keyPath: 'code'
            })
          }
        })

        this.$data._db = db
      },

      getStore() {
        return new Store(this.$data._db, this.storeName, 'readwrite')
      },

      /**
       * 改造表头, 主要是加入一些自定义属性, 比如唯一标识等等
       * @param {any[]} columns 列信息
       */
      initColumns(columns) {
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
      },

      /**
       * 设置左右固定列和静态列的布局, 并且存入数据库中
       */
      setColumnsLayout() {
        let leftFixedColumns = []
        let staticColumns = []
        let rightFixedColumns = []

        // 列分组
        this.allColumns.forEach(column => {
          if (column.visible === false) return

          if (!column.fixed) {
            return staticColumns.push(column)
          }
          if (column.fixed === 'left') {
            leftFixedColumns.push(column)
          } else {
            rightFixedColumns.push(column)
          }
        })

        // 根据列宽定义所有左固定列的左偏移量 (需加上额外的固定列)
        this.extraColumns.concat(leftFixedColumns).reduce((acc, cur) => {
          cur._offsetLeft = acc
          return acc + cur.width
        }, 0)

        // 根据列宽定义所有列的右偏移量
        rightFixedColumns.reduceRight((acc, cur) => {
          cur._offsetRight = acc
          return acc + cur.width
        }, 0)

        this.leftFixedColumns = leftFixedColumns
        this.staticColumns = staticColumns
        this.rightFixedColumns = rightFixedColumns

        this.save()
      },

      /** 保存至数据库 */
      save() {
        this.tableCode &&
          this.getStore().put({
            code: this.tableCode,
            columns: [...this.allColumns]
          })
      },

      /** 初始化 */
      async init(columns) {
        let { tableCode } = this

        // 未启用数据库保存
        if (!tableCode) {
          this.initColumns(columns)
          this.setColumnsLayout()
          return
        }

        // 启用数据库保存
        await this.connectDB()
        let record = await this.getStore().get(this.tableCode)

        // 查到该条数据, 不用进行初始化
        if (record) {
          this.allColumns = record.columns
          this.setColumnsLayout()
        }
        // 未查到该条数据
        else {
          this.initColumns(columns)
          this.setColumnsLayout()
        }
      }
    }
  })
}
