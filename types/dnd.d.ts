import Vue from 'vue'
export interface ElDndProps {
  tag?: string
  id: string
  index: number
}
export declare class ElDnd extends Vue {
  $props: ElDndProps
}
export default ElDnd
