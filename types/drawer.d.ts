import Vue from 'vue'
export interface ElDrawerProps {
  appendToBody?: boolean
  beforeClose?: (...args: any[]) => any
  customClass?: string
  closeOnPressEscape?: boolean
  destroyOnClose?: boolean
  modal?: boolean
  direction?: string
  modalAppendToBody?: boolean
  showClose?: boolean
  size?: string
  title?: string
  visible?: boolean
  wrapperClosable?: boolean
  withHeader?: boolean
}
export declare class ElDrawer extends Vue {
  $props: ElDrawerProps
}
export default ElDrawer
