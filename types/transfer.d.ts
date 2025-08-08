import Vue from 'vue'
export interface ElTransferProps {
  data?: any[]
  titles?: any[]
  buttonTexts?: any[]
  filterPlaceholder?: string
  filterMethod?: (...args: any[]) => any
  leftDefaultChecked?: any[]
  rightDefaultChecked?: any[]
  renderContent?: (...args: any[]) => any
  value?: any[]
  format?: Record<string, any>
  filterable?: boolean
  props?: Record<string, any>
  targetOrder?: string
}
export declare class ElTransfer extends Vue {
  $props: ElTransferProps
}
export default ElTransfer
