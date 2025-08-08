import Vue from 'vue'
export interface ElGanttProps {
  tasks: any[]
  columns: any[]
}
export declare class ElGantt extends Vue {
  $props: ElGanttProps
}
export default ElGantt
