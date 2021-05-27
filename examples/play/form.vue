<template>
  <div>
    <el-form :form="form" @change="$log" ref="form" size="small" label-width="60px">
      <el-input t-prop="name" t-span="24" t-label="名字" append="测试" />
      <el-input-number t-prop="height" t-label="身高" money />
      <el-radio-group t-prop="type" t-label="类型">
        <el-radio label="1">显示</el-radio>
        <el-radio label="2">隐藏</el-radio>
      </el-radio-group>

      <el-checkbox-group t-prop="checked" t-label="检查">
        <el-checkbox-button label="1">测试</el-checkbox-button>
      </el-checkbox-group>

      <el-switch t-prop="swt" active-text="ac" inactive-text="iac"></el-switch>

      <el-cascader t-label="aa" t-prop="cas" clearable :options="options" />

      <el-slider t-prop="slider" />

      <el-time-picker t-prop="date" />

      <el-select t-prop="select" :options="{ a: '选择1', b: '选择2' }" />
    </el-form>

    <el-btn @click="onSetValue">设置值</el-btn>
  </div>
</template>

<script>
import E from 'main/index.js'
export default {
  components: {
    ElForm: E.Form,
    ElInput: E.Input,
    ElInputNumber: E.InputNumber,
    ElBtn: E.Btn,
    ElTimePicker: E.TimePicker,
    ElSlider: E.Slider,
    ElCascader: E.Cascader,
    ElCheckboxGroup: E.CheckboxGroup,
    ElRadioGroup: E.RadioGroup,
    ElCheckboxButton: E.CheckboxButton,
    ElRadio: E.Radio,
    ElSwitch: E.Switch,
    ElSelect: E.Select,
  },
  data: () => ({
    form: {
      swt: false,
      name: {
        value: '',
        required: '必须的'
      },

      checked: [],

      type: {
        value: '1'
      },

      height: { required: true, type: 'number' },

      tree: {},

      cas: { required: true, trigger: 'change' },

      slider: {},

      date: {},

      select: ''
    },

    options: [{ value: '1', label: 'aa', children: [{ value: '2', label: 'bb' }] }]
  }),

  methods: {
    onSetValue() {
      this.$refs.form.setValue({
        name: '' + Date.now(),
        type: '2',
        swt: true,
        date: Date.now(),
        slider: Math.ceil(Math.random() * 10),
        height: Math.ceil(Math.random() * 1000),
        select: 'a'
      })
    }
  }
}
</script>
