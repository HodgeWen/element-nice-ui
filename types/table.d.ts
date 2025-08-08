import Vue from 'vue'
export interface ElTableProps {
  api?: string
  requestBody?: Record<string, any>
  stripe?: boolean
  placeholder?: string
  pagination?: boolean
  treeProps?: Record<string, any>
  data?: any[]
  headers?: any[]
  query?: Record<string, any>
  queryLabelWidth?: string
  pageConfig?: Record<string, any>
  autoQueried?: any[]
  size?: string
  showTools?: boolean
  height?: string
  autoHeight?: boolean
  align?: string
  value?: any[]
  cache?: boolean
  noSearcher?: boolean
  filter?: (...args: any[]) => any
  dataMap?: (...args: any[]) => any
  dataPath?: string
  defaultPageSize?: number
  selectable?: (...args: any[]) => any
}
export declare class ElTable extends Vue {
  $props: ElTableProps
}
export default ElTable
