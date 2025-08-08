import Vue from 'vue'
export interface ElColorPickerProps {
  value?: string
  showAlpha?: boolean
  colorFormat?: string
  disabled?: boolean
  size?: string
  popperClass?: string
  predefine?: any[]
}
export declare class ElColorPicker extends Vue {
  $props: ElColorPickerProps
}
export default ElColorPicker
