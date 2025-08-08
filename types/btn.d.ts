import Vue from 'vue'
export interface ElBtnProps {
  type?: string
  suffixIcon?: string
  size?: string
  icon?: string
  nativeType?: string
  value?: boolean
  loading?: boolean
  disabled?: boolean
  plain?: boolean
  autofocus?: boolean
  round?: boolean
  circle?: boolean
}
export declare class ElBtn extends Vue {
  $props: ElBtnProps
}
export default ElBtn
