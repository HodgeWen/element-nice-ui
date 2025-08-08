import Vue from 'vue'
export interface ElBacktopProps {
  visibilityHeight?: number
  target?: string
  right?: number
  bottom?: number
}
export declare class ElBacktop extends Vue {
  $props: ElBacktopProps
}
export default ElBacktop
