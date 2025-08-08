import Vue from 'vue'
export interface ElWangEditorProps {
  value?: string
  config?: Record<string, any>
}
export declare class ElWangEditor extends Vue {
  $props: ElWangEditorProps
}
export default ElWangEditor
