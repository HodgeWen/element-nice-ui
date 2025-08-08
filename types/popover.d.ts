import Vue from 'vue'
export interface ElPopoverProps {
  trigger?: string
  openDelay?: number
  closeDelay?: number
  title?: string
  disabled?: boolean
  content?: string
  reference?: any
  visibleArrow?: any
  arrowOffset?: number
  transition?: string
  tabindex?: number
}
export declare class ElPopover extends Vue {
  $props: ElPopoverProps
}
export default ElPopover
