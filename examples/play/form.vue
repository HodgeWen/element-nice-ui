<template>
  <div ref="page">

   <el-form :form="form">
     <el-select :options="options" tree t-prop="aa" />
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
      aa: '1',
    },
    options: [
      {
        value: '1',
        label: '张三',
        children: [
          { value: '2', label: '李四' },
          { value: '3', label: '王五', children: [{ value: '4', label: '张子恒' }] }
        ]
      },
      {
        value: '5',
        label: '赵金鹏',
        children: [{ value: '6', label: '陈龙' }]
      }
    ]
  }),

  methods: {}
}
</script>

<style lang="scss">

</style>
