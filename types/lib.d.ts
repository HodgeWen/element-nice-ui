declare module 'element-nice-ui/lib' {
  import { ElMessage } from "./message"
  import { ElMessageBox } from "./message-box"

  const Message: ElMessage
  const MessageBox: ElMessageBox

  export {
    Message, MessageBox
  }
}