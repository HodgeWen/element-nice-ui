import Vue from 'vue'
export interface ElInputNumberProps {
  clearable?: any
  append?: string
  money?: number
  step?: number
  stepStrictly?: boolean
  max?: number
  min?: number
  value?: boolean
  size?: string
  controls?: boolean
  controlsRight?: boolean
  name?: string
  label?: string
  placeholder?: string
  precision?: number
}
export declare class ElInputNumber extends Vue {
  $props: ElInputNumberProps
}
export default ElInputNumber
