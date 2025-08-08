import Vue from 'vue'
export interface ElCascaderProps {
  placement?: string
  appendToBody?: any
  visibleArrow?: boolean
  arrowOffset?: any
  offset?: any
  boundariesPadding?: any
  popperOptions?: any
}
export declare class ElCascader extends Vue {
  $props: ElCascaderProps
}
export default ElCascader
