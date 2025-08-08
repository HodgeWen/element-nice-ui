import Vue from 'vue'
export interface ElRadioProps {
  value?: any
  disabled?: boolean
  name?: string
  border?: boolean
  size?: string
}
export declare class ElRadio extends Vue {
  $props: ElRadioProps
}
export default ElRadio
