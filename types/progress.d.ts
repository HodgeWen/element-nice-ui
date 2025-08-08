import Vue from 'vue'
export interface ElProgressProps {
  type?: string
  percentage: number
  status?: string
  strokeWidth?: number
  strokeLinecap?: string
  textInside?: boolean
  width?: number
  showText?: boolean
  color?: string
  format?: (...args: any[]) => any
}
export declare class ElProgress extends Vue {
  $props: ElProgressProps
}
export default ElProgress
