import Vue from 'vue'
export interface ElTreeProps {
  data?: any[]
  emptyText?: string
  renderAfterExpand?: boolean
  nodeKey?: string
  checkStrictly?: boolean
  defaultExpandAll?: boolean
  expandOnClickNode?: boolean
  checkOnClickNode?: boolean
  checkDescendants?: boolean
  autoExpandParent?: boolean
  defaultCheckedKeys?: any[]
  defaultExpandedKeys?: any[]
  currentNodeKey?: string
  renderContent?: (...args: any[]) => any
  showCheckbox?: boolean
  draggable?: boolean
  allowDrag?: (...args: any[]) => any
  allowDrop?: (...args: any[]) => any
  props?: any
  lazy?: boolean
  highlightCurrent?: boolean
  load?: (...args: any[]) => any
  filterNodeMethod?: (...args: any[]) => any
  accordion?: boolean
  indent?: number
  iconClass?: string
}
export declare class ElTree extends Vue {
  $props: ElTreeProps
}
export default ElTree
