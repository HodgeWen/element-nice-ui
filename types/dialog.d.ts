import Vue from 'vue'
export interface ElDialogProps {
  confirm?: (...args: any[]) => any
  renderBodyWithoutOpen?: boolean
  confirmText?: string
  cancelText?: string
  hideFooter?: boolean
  title?: string
  modal?: boolean
  modalAppendToBody?: boolean
  appendToBody?: boolean
  lockScroll?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  width?: string
  customClass?: string
  top?: string
  beforeClose?: (...args: any[]) => any
  center?: boolean
  destroyOnClose?: boolean
  defaultFullScreen?: boolean
}
export declare class ElDialog extends Vue {
  $props: ElDialogProps
}
export default ElDialog
