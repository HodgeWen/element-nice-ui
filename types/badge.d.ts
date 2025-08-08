import Vue from 'vue'
export interface ElBadgeProps {
  value?: string
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: string
}
export declare class ElBadge extends Vue {
  $props: ElBadgeProps
}
export default ElBadge
