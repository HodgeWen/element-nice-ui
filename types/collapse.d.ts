import Vue from 'vue'
export interface ElCollapseProps {
  title?: string
  name?: string
  disabled?: boolean
}
export declare class ElCollapse extends Vue {
  $props: ElCollapseProps
}
export default ElCollapse
