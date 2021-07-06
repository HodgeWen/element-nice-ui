<template>
  <div ref="page" style="height: 100%">
    <el-form :form="form" colspan="24" ref="form">
      <el-input t-label="测试" t-prop="a" />

      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" />
      <el-input t-label="测试" t-prop="a" />
      <el-input t-label="测试" t-prop="a" />
      <el-input t-label="测试" t-prop="a" />

       <el-form-item>
        <el-btn @click="$refs.form.validate()">验证</el-btn>
      </el-form-item>
    </el-form>
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
    TestTree
  },

  data: () => ({
    form: {
      a: { required: true }
    }
  }),

  methods: {}
}
</script>

<style lang="scss">
body,
html {
  height: 100%;
}
</style>
