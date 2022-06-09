<template>
  <div ref="page" style="height: 100%; background: #f2f2f2">
    <!-- <el-gantt :tasks="tasks" :columns="columns"></el-gantt> -->
    <!-- <el-select
      filterable
      allow-create
      :options="options"
      v-model="aa"
    /> -->
    <el-input-number v-model="n" :money="1" />
    {{ n }}
    <el-dialog v-model="visible"> </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import E from 'main/index.js'
Vue.use(E.Loading.directive)

export default {
  components: {
    ElGantt: E.Gantt,
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
    ElNewTable: E.NewTable,
    ElAction: E.Action,
    ElActionItem: E.ActionItem,
    ElTaskBtn: E.TaskBtn,
    ElWangEditor: E.WangEditor,
    ElNewTree: E.NewTree,
    ElGantt: E.Gantt
  },

  data: () => ({
    tasks: [
      {
        start: '2021-10-01',
        end: '2022-01-10',
        actualStart: '2021-10-09',
        actualEnd: '2022-01-20',
        name: '测试1'
      },

      {
        start: '2021-10-01',
        end: '2022-01-10',
        actualStart: '2021-10-09',
        actualEnd: '2022-01-20',
        name: '测试2'
      },
      {
        start: '2021-10-01',
        end: '2022-01-10',
        actualStart: '2021-10-09',
        actualEnd: '2022-01-20',
        name: '测试2'
      },
      {
        start: '2021-10-01',
        end: '2022-01-10',
        actualStart: '2021-10-09',
        actualEnd: '2022-01-20',
        name: '测试2'
      },
      {
        start: '2021-10-01',
        end: '2022-01-10',
        actualStart: '2021-10-09',
        actualEnd: '2022-01-20',
        name: '测试2'
      }
    ],

    n: undefined,

    columns: [
      { label: '名称', prop: 'name' },
      { label: '开始日期', prop: 'start' },
      { label: '结束日期', prop: 'end' }
    ],

    aa: '',

    options: Array(1000)
      .fill(null)
      .map((_, i) => ({
        label: i + '',
        value: i + ''
      })),

    visible: false
  }),

  methods: {
    remote(query) {
      this.options = Array(10)
      .fill(null)
      .map((_, i) => ({
        label: i + '',
        value: i + ''
      })).filter(item => String(item.label).includes(query))
    }
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
