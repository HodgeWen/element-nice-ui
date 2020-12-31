export interface TableHeaderItem<Prop extends string = string> {
  /** 列类型 */
  type?: 'selection' | 'index' | 'expand' | 'action';
  /** 自定义索引 */
  index?: number | ((index: number) => number)
  /** 列的key值, 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 */
  columnKey?: string;
  /** 表头的标题 */
  label?: string;
  /** 对应列内容的字段名 */
  prop?: Prop;
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
  filterMethod?: (value: any, row: any, column: any) => boolean;
  /** 仅对type=selection的列有效 */
  selectable?: (row: any, index: number) => boolean;
  /** 该列的插槽名称, 列作为一个插槽传入 */
  slotName?: string
}