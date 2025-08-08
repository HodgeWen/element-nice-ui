import Vue from 'vue'
export interface ElStepsProps {
  title?: string
  icon?: string
  description?: string
  status?: string
}
export declare class ElSteps extends Vue {
  $props: ElStepsProps
}
export default ElSteps
