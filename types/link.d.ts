import Vue from 'vue'
export interface ElLinkProps {
  type?: string
  underline?: boolean
  disabled?: boolean
  href?: string
  icon?: string
}
export declare class ElLink extends Vue {
  $props: ElLinkProps
}
export default ElLink
