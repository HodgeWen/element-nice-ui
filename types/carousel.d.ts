import Vue from 'vue'
export interface ElCarouselProps {
  initialIndex?: number
  height?: string
  trigger?: string
  autoplay?: boolean
  interval?: number
  indicatorPosition?: string
  indicator?: boolean
  arrow?: string
  type?: string
  loop?: boolean
  direction?: string
}
export declare class ElCarousel extends Vue {
  $props: ElCarouselProps
}
export default ElCarousel
