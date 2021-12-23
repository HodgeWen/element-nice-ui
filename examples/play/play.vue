<template>
  <div ref="page" style="height: 100%; background: #f2f2f2">
    <!-- <el-select api="/select/tree" tree multiple v-model="list" /> -->

    <el-new-table
      default-expand-all
      code="test"
      :headers="headers"
      row-key="id"
      :checkable="(data, index) => index % 2 === 0"
      :api="api"
      tree
      :auto-queried="['test']"
      :query="query"
    >
      <template #searcher>
        <el-input v-model="query.test" t-label="测试" />
        <el-input t-width="300" t-label="测试测试测试" />
        <el-input t-label="测试" />
        <el-input t-label="测试" />
      </template>

      <template #tools>
        <el-btn>新增</el-btn>
      </template>
    </el-new-table>
  </div>
</template>

<script>
import Vue from 'vue'
import E from 'main/index.js'
import TestTree from './tree/tree.vue'
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
    TestTree,
    ElNewTable: E.NewTable,
    ElAction: E.Action,
    ElActionItem: E.ActionItem,
    ElTaskBtn: E.TaskBtn,
    ElWangEditor: E.WangEditor
  },

  data: () => ({
    headers: [
      { label: '序号', prop: 'index', width: 200 },
      { label: '随机数', prop: 'id', width: 200 },
      { label: '随机数', prop: 'id', slotName: 'aa' },
      {
        label: '随机数',
        prop: 'id',
        formatter(v) {
          return v + 666
        }
      },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '随机数', prop: 'id' },
      { label: '操作', slotName: 'action', width: 160, fixed: 'right', type: 'action' }
    ],

    aa: {
      aa: 12
    },

    api: '/arr',

    data: [],

    s: '',
    list: [],

    test: '<p>123</p>',

    query: {
      test: '测试'
    }
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

  beforeCreate() {
    // console.time('aa')
  },

  mounted() {
    // console.timeEnd('aa')
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
