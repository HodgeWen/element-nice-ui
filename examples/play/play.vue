<template>
  <div ref="page" style="height: 100%">
    <el-new-table
      pagination
      style="height: 300px"
      :headers="headers"
      :data="data"
    ></el-new-table>
  </div>
</template>

<script>
import Vue from 'vue'
import E from 'main/index.js'
import TestTree from './tree/tree.vue'
Vue.use(E.Loading.directive)

export default {
  components: {
    ElProgress: E.Progress,
    ElBpmnViewer: E.BpmnViewer,
    ElBpmn: E.Bpmn,
    ElTree: E.Tree,
    ElTable: E.Table,
    ElForm: E.Form,
    ElInput: E.Input,
    ElInputNumber: E.InputNumber,
    ElBtn: E.Btn,
    ElTimePicker: E.TimePicker,
    ElDatePicker: E.DatePicker,
    ElSlider: E.Slider,
    ElCascader: E.Cascader,
    ElCheckboxGroup: E.CheckboxGroup,
    ElRadioGroup: E.RadioGroup,
    ElCheckboxButton: E.CheckboxButton,
    ElRadio: E.Radio,
    ElSwitch: E.Switch,
    ElSelect: E.Select,
    ElFormItem: E.FormItem,
    PS: E.PerfectScrollbar,
    ElDialog: E.Dialog,
    ElSection: E.Section,
    ElPage: E.Page,
    ElTableSelect: E.TableSelect,
    TestTree,
    ElNewTable: E.NewTable,
    ElAction: E.Action,
    ElActionItem: E.ActionItem,
    ElTaskBtn: E.TaskBtn
  },

  data: () => ({
    headers: [
      { label: '序号', prop: 'index', fixed: 'left', width: 100 },
      { label: '随机数', prop: 'id', fixed: 'left', width: 200 },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '操作', slotName: 'action', width: 160, fixed: 'right', type: 'action' }
    ],

    data: []
  }),

  methods: {
    getData() {
      this.data = Array(20)
        .fill(null)
        .map((v, i) => ({
          index: i,
          id: Math.random()
        }))
    }
  },

  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss">
body,
html {
  height: 100%;
  margin: 0;
}
</style>
