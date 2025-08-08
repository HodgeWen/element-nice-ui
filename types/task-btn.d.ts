import Vue from 'vue'
export interface ElTaskBtnProps {
  type?: string
  suffixIcon?: string
  size?: string
  icon?: string
  nativeType?: string
  disabled?: boolean
  plain?: boolean
  autofocus?: boolean
  round?: boolean
  circle?: boolean
  task?: (...args: any[]) => any
}
export declare class ElTaskBtn extends Vue {
  $props: ElTaskBtnProps
}
export default ElTaskBtn
