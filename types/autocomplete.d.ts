import Vue from 'vue'
export interface ElAutocompleteProps {
  valueKey?: string
  popperClass?: string
  popperOptions?: Record<string, any>
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  name?: string
  size?: string
  value?: string
  maxlength?: number
  minlength?: number
  autofocus?: boolean
  fetchSuggestions?: (...args: any[]) => any
  triggerOnFocus?: boolean
  customItem?: string
  selectWhenUnmatched?: boolean
  prefixIcon?: string
  suffixIcon?: string
  label?: string
  debounce?: number
  placement?: string
  hideLoading?: boolean
  popperAppendToBody?: boolean
  highlightFirstItem?: boolean
}
export declare class ElAutocomplete extends Vue {
  $props: ElAutocompleteProps
}
export default ElAutocomplete
