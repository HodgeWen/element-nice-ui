import Vue from 'vue'
export interface ElSliderProps {
  min?: number
  max?: number
  step?: number
  value?: number
  showInput?: boolean
  showInputControls?: boolean
  inputSize?: string
  showStops?: boolean
  showTooltip?: boolean
  formatTooltip?: (...args: any[]) => any
  disabled?: boolean
  range?: boolean
  vertical?: boolean
  height?: string
  debounce?: number
  label?: string
  tooltipClass?: string
  marks?: Record<string, any>
}
export declare class ElSlider extends Vue {
  $props: ElSliderProps
}
export default ElSlider
