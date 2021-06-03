<template>
  <div>
    <span>
      {{form}}
    </span>
    <!-- :origin-model="form" :origin-rules="rules" -->
    <el-form :form="form"  ref="form" size="small" label-width="60px">
      <el-form-item prop="name" span="24" label="名字">
        <el-input v-model="form.name" append="测试" />
      </el-form-item>
      <el-form-item prop="height" label="身高">
        <el-input-number v-model="form.height" money />
      </el-form-item>
      <el-form-item prop="type" label="类型">
        <el-radio-group v-model="form.type">
          <el-radio label="1">显示</el-radio>
          <el-radio label="2">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="日期" prop="date">
         <el-date-picker value-format="yyyy-MM-dd" type="date" v-model="form.date" />
      </el-form-item>

      <el-form-item label="级联选择器">
        <el-cascader :props="{ multiple: true }" :show-all-levels="false" :options="options" v-model="form.cas" />
      </el-form-item>

       <el-switch t-prop="swt" active-text="ac" inactive-text="iac"></el-switch>
      <!-- <el-checkbox-group t-prop="checked" t-label="检查">
        <el-checkbox-button label="1">测试</el-checkbox-button>
      </el-checkbox-group>



      <el-slider t-prop="slider" />



      <el-select t-prop="selectArr" tree multiple :options="options" check-strictly  /> -->
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
    PS: E.PerfectScrollbar
  },
  data: () => ({
    form: {
      swt: false,
      name: '',

      checked: [],

      type: '',

      height: 10,

      tree: {},

      cas: [],

      slider: {},

      date: '',

      select: '',

      selectArr: []
    },

    rules: {
      name: [{ required: true, message: '必填' },  { max: 10, message: '100' }],
      type: [{ required: true, message: '必填' }],
      date: [
        { max: 100, message: '100' }
      ]
    },

    options: [
      {
        value: '1',
        label: 'aa',
        children: [
          { value: '2', label: 'bb' },
          { value: '3', label: 'cc' }
        ]
      }
    ]
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
