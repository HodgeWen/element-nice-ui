import Vue from 'vue'
export interface ElFormProps {
  label?: string
  labelWidth?: string
  span?: string
  prop?: string
  required?: boolean
  rules?: Record<string, any>
  error?: string
  validateStatus?: string
  for?: string
  showMessage?: boolean
  size?: string
}
export declare class ElForm extends Vue {
  $props: ElFormProps
}
export default ElForm
