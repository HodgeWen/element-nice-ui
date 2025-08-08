import Vue from 'vue'
export interface ElRateProps {
  value?: number
  lowThreshold?: number
  highThreshold?: number
  max?: number
  colors?: any[]
  voidColor?: string
  disabledVoidColor?: string
  iconClasses?: any[]
  voidIconClass?: string
  disabledVoidIconClass?: string
  disabled?: boolean
  allowHalf?: boolean
  showText?: boolean
  showScore?: boolean
  textColor?: string
  texts?: any[]
  scoreTemplate?: string
}
export declare class ElRate extends Vue {
  $props: ElRateProps
}
export default ElRate
