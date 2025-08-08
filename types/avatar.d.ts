import Vue from 'vue'
export interface ElAvatarProps {
  size?: string
  shape?: string
  icon?: string
  src?: string
  alt?: string
  srcSet?: string
  error?: (...args: any[]) => any
  fit?: string
}
export declare class ElAvatar extends Vue {
  $props: ElAvatarProps
}
export default ElAvatar
