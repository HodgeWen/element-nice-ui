import Vue from 'vue'
export interface ElTabsProps {
  label?: string
  labelContent?: (...args: any[]) => any
  name?: string
  closable?: boolean
  disabled?: boolean
  lazy?: boolean
}
export declare class ElTabs extends Vue {
  $props: ElTabsProps
}
export default ElTabs
