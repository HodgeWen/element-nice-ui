import Vue from 'vue'
export interface ElPopconfirmProps {
  title?: string
  confirmButtonText?: string
  cancelBtnText?: string
  confirmButtonType?: string
  cancElBtnType?: string
  icon?: string
  iconColor?: string
  hideIcon?: boolean
}
export declare class ElPopconfirm extends Vue {
  $props: ElPopconfirmProps
}
export default ElPopconfirm
