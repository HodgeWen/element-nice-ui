import Vue from 'vue'
export interface ElPageProps {
  tag?: string
  title?: string
}
export declare class ElPage extends Vue {
  $props: ElPageProps
}
export default ElPage
