import Vue from 'vue'
export interface ElAlertProps {
  title?: string
  description?: string
  type?: string
  closable?: boolean
  closeText?: string
  showIcon?: boolean
  center?: boolean
  effect?: string
}
export declare class ElAlert extends Vue {
  $props: ElAlertProps
}
export default ElAlert
