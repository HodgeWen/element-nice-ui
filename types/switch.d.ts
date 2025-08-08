import Vue from 'vue'
export interface ElSwitchProps {
  value?: string
  disabled?: boolean
  width?: number
  activeIconClass?: string
  inactiveIconClass?: string
  activeText?: string
  inactiveText?: string
  activeColor?: string
  inactiveColor?: string
  activeValue?: string
  inactiveValue?: string
  name?: string
  validateEvent?: boolean
  id?: string
}
export declare class ElSwitch extends Vue {
  $props: ElSwitchProps
}
export default ElSwitch
