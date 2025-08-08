import Vue from 'vue'
export interface ElImageProps {
  src?: string
  fit?: string
  lazy?: boolean
  scrollContainer?: any[]
  zIndex?: number
}
export declare class ElImage extends Vue {
  $props: ElImageProps
}
export default ElImage
