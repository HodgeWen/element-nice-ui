import Vue from 'vue'
export interface ElTableSelectProps {
  multiple?: boolean
  value?: any[]
  optionLabel?: any
  optionValue?: any
  placeholder?: any
  clearable?: boolean
  width?: string
  label?: string
  size?: string
  data?: any[]
}
export declare class ElTableSelect extends Vue {
  $props: ElTableSelectProps
}
export default ElTableSelect
