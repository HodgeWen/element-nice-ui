import Vue from 'vue'
export interface ElCascaderPanelProps {
  value?: boolean
  renderLabel?: (...args: any[]) => any
}
export declare class ElCascaderPanel extends Vue {
  $props: ElCascaderPanelProps
}
export default ElCascaderPanel
