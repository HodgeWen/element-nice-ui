import Vue from 'vue'
export interface ElDataProps {
  api?: string
  pagination?: boolean
  wrapTag?: string
  data?: any[]
  query?: Record<string, any>
  queryLabelWidth?: string
  pageConfig?: Record<string, any>
  autoQueried?: any[]
  size?: string
  showTools?: boolean
  height?: string
  autoHeight?: boolean
  value?: any[]
  noCache?: boolean
  noSearcher?: boolean
  filter?: (...args: any[]) => any
  defaultPageSize?: number
}
export declare class ElData extends Vue {
  $props: ElDataProps
}
export default ElData
