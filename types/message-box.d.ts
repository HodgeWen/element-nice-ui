import Vue from 'vue'
export interface ElMessageBoxProps {
  modal?: any
  lockScroll?: any
  showClose?: boolean
  closeOnClickModal?: any
  closeOnPressEscape?: any
  closeOnHashChange?: any
  center?: boolean
  roundButton?: boolean
}
export declare class ElMessageBox extends Vue {
  $props: ElMessageBoxProps
}
export default ElMessageBox
