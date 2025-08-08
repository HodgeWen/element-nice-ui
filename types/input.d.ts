import Vue from 'vue'
export interface ElInputProps {
  value?: string
  prepend?: string
  append?: string
  size?: string
  resize?: string
  form?: string
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  type?: string
  autosize?: boolean
  autocomplete?: string
  validateEvent?: boolean
  suffixIcon?: string
  prefixIcon?: string
  label?: string
  clearable?: boolean
  showPassword?: boolean
  showWordLimit?: boolean
  tabindex?: string
}
export declare class ElInput extends Vue {
  $props: ElInputProps
}
export default ElInput
