import Vue from 'vue'
export interface ElSpinnerProps {
  type?: string
  radius?: number
  strokeWidth?: number
  strokeColor?: string
}
export declare class ElSpinner extends Vue {
  $props: ElSpinnerProps
}
export default ElSpinner
