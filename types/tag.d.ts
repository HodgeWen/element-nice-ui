import Vue from 'vue'
export interface ElTagProps {
  text?: string
  closable?: boolean
  type?: string
  hit?: boolean
  disableTransitions?: boolean
  color?: string
  size?: string
  effect?: string
}
export declare class ElTag extends Vue {
  $props: ElTagProps
}
export default ElTag
