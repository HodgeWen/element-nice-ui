import Vue from 'vue'
export interface ElUploadProps {
  type?: string
  action?: string
  name?: string
  data?: Record<string, any>
  headers?: Record<string, any>
  withCredentials?: boolean
  multiple?: boolean
  accept?: string
  onStart?: (...args: any[]) => any
  onProgress?: (...args: any[]) => any
  onSuccess?: (...args: any[]) => any
  onError?: (...args: any[]) => any
  beforeUpload?: (...args: any[]) => any
  drag?: boolean
  onPreview?: (...args: any[]) => any
  onRemove?: (...args: any[]) => any
  fileList?: any[]
  autoUpload?: boolean
  listType?: string
  httpRequest?: (...args: any[]) => any
  batchRequest?: (...args: any[]) => any
  disabled?: boolean
  limit?: number
  onExceed?: (...args: any[]) => any
}
export declare class ElUpload extends Vue {
  $props: ElUploadProps
}
export default ElUpload
