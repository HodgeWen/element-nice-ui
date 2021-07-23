<template>
  <el-page ref="page" style="height: 100%">
    <el-section title="爱仕达">
      <el-form :form="form" label-width="100px">
      <el-input-number clearable t-prop="n" t-label="aa" :money="1" :precision="2">
        <template #append>
          <el-btn icon="search"></el-btn>
        </template>
      </el-input-number>

      <el-cascader :options="options" filterable :props="{
        checkStrictly: true
      }" t-prop="test2" />
    </el-form>

    <el-table :headers="headers" :data="data">
      <template #column.action="{ row,  index }">
        <!-- 奇数显示 -->
        <el-action-item v-if="index % 2 === 0">测试1</el-action-item>
        <el-action-item>测试2</el-action-item>
        <AuditActions :num="index" />
      </template>
    </el-table>
    </el-section>

    <el-section title="你好">
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
    </el-section>
    <!-- <el-new-table height="100%" :headers="headers" :data="data">

    </el-new-table> -->

    <template #footer-right>
      <el-task-btn :task="submit">确定</el-task-btn>
    </template>

  </el-page>
</template>

<script>
import Vue from 'vue'
import E from 'main/index.js'
import TestTree from './tree/tree.vue'
Vue.use(E.Loading.directive)

const GetNodes = {
  methods: {
    extractChildren() {
      let p = this.$parent
      while (p) {
        if (p.receiveChildren) {
          return p.receiveChildren(this.$slots.default)
        }
        p = p.$parent
      }
    }
  },
  render(h) {
    return <span></span>
  },
  created() {
    this.extractChildren()
  }
}

const AuditActions = {
  components: { ElActionItem: E.ActionItem, GetNodes },

  props: {
    num: Number
  },

  render(h) {
    return (
      <get-nodes>
        {this.num > 3 ? <el-action-item>测试3</el-action-item> : null}
        <el-action-item>测试4</el-action-item>
      </get-nodes>
    )
  }
}

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
    ElTaskBtn: E.TaskBtn,

    AuditActions
  },

  data: () => ({
    aa: '',
    visible: false,

    data: Array(10)
      .fill(null)
      .map((v, i) => ({
        index: i,
        id: Math.random()
      })),

    form: {
      test: 'yizhi',
      test1: '',
      test2: [],
      n: { value: null ,type: 'number', required: true }
    },

    headers: [
      { label: '序号', prop: 'index' },
      { label: '随机数', prop: 'id' },
      { label: '操作', slotName: 'action', type: 'action' }
    ],

    options: [
      {
        value: 'zhinan',
        label: '指南',
        children: [
          {
            value: 'shejiyuanze',
            label: '设计原则',
            children: [
              {
                value: 'yizhi',
                label: '一致'
              },
              {
                value: 'fankui',
                label: '反馈'
              },
              {
                value: 'xiaolv',
                label: '效率'
              },
              {
                value: 'kekong',
                label: '可控'
              }
            ]
          },
          {
            value: 'daohang',
            label: '导航',
            children: [
              {
                value: 'cexiangdaohang',
                label: '侧向导航'
              },
              {
                value: 'dingbudaohang',
                label: '顶部导航'
              }
            ]
          }
        ]
      }
    ]
  }),

  methods: {
    changeMax() {
      this.form.num.max += 1
    },

    submit() {
      return new Promise((rs) => {
        setTimeout(() => {
          rs()
        }, 2000)
      })
    }
  },

  mounted() {}
}
</script>

<style lang="scss">
body,
html {
  height: 100%;
  margin: 0;
}
</style>
