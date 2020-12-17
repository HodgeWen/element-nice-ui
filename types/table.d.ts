import { ElementUIComponent } from './component'
import { TooltipEffect } from './tooltip'

export type SortOrder = 'ascending' | 'descending'

/** Options to set the default sort column and order */
export interface DefaultSortOptions {
  /** Default sort column */
  prop: string,

  /** Default sort order */
  order: SortOrder
}

export interface SummaryMethodParams {
  columns: object[],
  data: object
}

export interface rowCallbackParams {
  row: object,
  rowIndex: number
}

export interface cellCallbackParams {
  row: object,
  rowIndex: number,
  column: object,
  columnIndex: number
}

export interface treeNode {
  rowKey: string | number,
  isLeaf: boolean,
  level: number,
  expanded: boolean,
  loaded: boolean
}

export interface TableColumnItem{
  /** 列类型 */
  type?: 'selection' | 'index' | 'expand';
  /** 自定义索引 */
  index?: number | ((index: number) => number)
  /** 列的key值, 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 */
  columnKey?: string;
  /** 表头的标题 */
  label?: string;
  /** 对应列内容的字段名 */
  prop?: string;
  /** 对应列的宽度 */
  width?: string | number;
  /** 列的最小宽度，与width的区别是 width 是固定的，minWidth 会把剩余宽度按比例分配给设置了 minWidth 的列 */
  minWidth?: string | number;
  /** 列是否固定在左侧或者右侧，true 表示固定在左侧 */
  fixed?: true | 'left' | 'right';
  /** 对应列是否可以排序, 这是远程排序 */
  sortable?: boolean;
  /** 列是否可以拖拽来改变宽度  */
  resizable?: boolean;
  /** 格式化列内容 */
  formatter?: (row: any, column: any, cellValue: any, index: number) => string
  /** 当内容过长被隐藏时显示 tooltip */
  showOverflowTooltip?: boolean;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 表头对齐方式，若不设置该项，则使用表格的对齐方式 */
  headerAlign?: 'left' | 'center' | 'right';
  /** 数据过滤的选项 */
  filters?: Array<{ text: string, value: string }>;
  /** 数据过滤使用的方法 */
  filterMethod?: (value: any, row: any. column) => boolean;
  /** 仅对type=selection的列有效 */
  selectable?: (row: any, index: number) => boolean
}

export type TableColumns = Array<TableColumnItem>

/** Table Component */
export declare class ElTable extends ElementUIComponent {
  /** Table data */
  data: object[]

  /** Table's height. By default it has an auto height. If its value is a number, the height is measured in pixels; if its value is a string, the height is affected by external styles */
  height: string | number

  /** Table's max-height. The height of the table starts from auto until it reaches the maxHeight limit. The maxHeight is measured in pixels, same as height */
  maxHeight: string | number

  /** Whether table is striped */
  stripe: boolean

  /** Whether table has vertical border */
  border: boolean

  /** Whether width of column automatically fits its container */
  fit: boolean

  /** Whether table header is visible */
  showHeader: boolean

  /** Whether current row is highlighted */
  highlightCurrentRow: boolean

  /** Key of current row, a set only prop */
  currentRowKey: string | number

  /** Whether to lazy load tree structure data, used with load attribute */
  lazy: boolean

  /** Horizontal indentation of nodes in adjacent levels in pixels */
  indent: number

  /** Function that returns custom class names for a row, or a string assigning class names for every row */
  rowClassName: string | ((param: rowCallbackParams) => string)

  /** Function that returns custom style for a row, or an object assigning custom style for every row */
  rowStyle: object | ((param: rowCallbackParams) => object)

  /** Function that returns custom class names for a cell, or a string assigning class names for every cell */
  cellClassName: string | ((param: cellCallbackParams) => string)

  /** Function that returns custom style for a cell, or an object assigning custom style for every cell */
  cellStyle: object | ((param: cellCallbackParams) => object)

  /** Function that returns custom class names for a row in table header, or a string assigning class names for every row in table header */
  headerRowClassName: string | ((param: rowCallbackParams) => string)

  /** Function that returns custom style for a row in table header, or an object assigning custom style for every row in table header */
  headerRowStyle: object | ((param: rowCallbackParams) => object)

  /** Function that returns custom class names for a cell in table header, or a string assigning class names for every cell in table header */
  headerCellClassName: string | ((param: cellCallbackParams) => string)

  /** Function that returns custom style for a cell in table header, or an object assigning custom style for every cell in table header */
  headerCellStyle: object | ((param: cellCallbackParams) => object)

  /** Key of row data, used for optimizing rendering. Required if reserve-selection is on */
  rowKey: (row: object) => any

  /** Displayed text when data is empty. You can customize this area with `slot="empty"` */
  emptyText: String

  /** Whether expand all rows by default. Only works when the table has a column `type="expand"` */
  defaultExpandAll: Boolean

  /** Set expanded rows by this prop. Prop's value is the keys of expand rows, you should set row-key before using this prop */
  expandRowKeys: any[]

  /** Set the default sort column and order */
  defaultSort: DefaultSortOptions

  /** Tooltip effect property */
  tooltipEffect: TooltipEffect

  /** Whether to display a summary row */
  showSummary: boolean

  /** Displayed text for the first column of summary row */
  sumText: string

  /** Custom summary method */
  summaryMethod: (param: SummaryMethodParams) => any[]

  /** Controls the behavior of master checkbox in multi-select tables when only some rows are selected */
  selectOnIndeterminate: boolean

  /** Clear selection. Might be useful when `reserve-selection` is on */
  clearSelection (): void

  /**
   * Toggle or set if a certain row is selected
   *
   * @param row The row that is going to set its selected state
   * @param selected Whether the row is selected. The selected state will be toggled if not set
   */
  toggleRowSelection (row: object, selected?: boolean): void

  /**
   * Toggle or set all rows
   */
  toggleAllSelection (): void

  /**
   * Set a certain row as selected
   *
   * @param row The row that is going to set as selected
   */
  setCurrentRow (row?: object): void

  /**
   * Toggle or set if a certain row is expanded
   *
   * @param row The row that is going to set its expanded state
   * @param expanded Whether the row is expanded. The expanded state will be toggled if not set
   */
  toggleRowExpansion (row: object, expanded?: boolean): void

  /** Clear sort status, reset the table to unsorted  */
  clearSort (): void

  /** Clear filter, reset the table to unfiltered  */
  clearFilter (): void

  /** Relayout the table, maybe needed when change the table or it's ancestors visibility */
  doLayout (): void

  /** Sort Table manually */
  sort (prop: string, order: string): void

  /** method for lazy load subtree data */
  load (row: object, treeNode: treeNode, resolve: Function): void
}
