import Vue from 'vue'
export interface ElNewTreeProps {
  treeData?: any[]
  checkableFilter?: (...args: any[]) => any
  selectableFilter?: (...args: any[]) => any
  defaultShowAll?: boolean
  filterNodeMethod?: (...args: any[]) => any
  checkable?: boolean
  bubble?: boolean
}
export declare class ElNewTree extends Vue {
  $props: ElNewTreeProps
}
export default ElNewTree
