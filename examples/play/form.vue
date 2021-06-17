<template>
  <el-page ref="page" :submit="onSubmit">
    <el-btn @click="onSetValue">设置值</el-btn>
    <el-btn @click="visible = true">aa</el-btn>
    <el-dialog v-model="visible">
      <template #footer v-if="api && templateApi">
        <el-btn v-if="resultUrl">
          <a
            style="color: var(--primary-color)"
            :href="resultUrl"
            target="_blank"
            download="导入结果.xlsx"
          >
            下载结果
          </a>
        </el-btn>
        <el-btn icon="download" type="warning">下载模板</el-btn>
      </template>
    </el-dialog>

    <el-section title="标题">
      <el-form :form="form" ref="form" size="small" label-width="60px">
        <el-input t-prop="name" t-label="名字" append="测试" />
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
          <el-date-picker value-format="yyyy-MM-dd" type="datetimerange" v-model="form.date" />
        </el-form-item>

        <el-form-item label="级联选择器">
          <el-cascader
            :props="{ multiple: true }"
            :show-all-levels="false"
            :options="options"
            v-model="form.cas"
          />
        </el-form-item>

        <el-switch t-prop="swt" active-text="ac" inactive-text="iac"></el-switch>
        <!-- <el-checkbox-group t-prop="checked" t-label="检查">
        <el-checkbox-button label="1">测试</el-checkbox-button>

      </el-checkbox-group>




      <el-slider t-prop="slider" />



      <el-select t-prop="selectArr" tree multiple :options="options" check-strictly  /> -->
      </el-form>
    </el-section>

    <el-section title="标题2">
      <el-form :form="form2">
        <el-input t-label="测试" t-prop="test" />

        <el-table-select
          :headers="[{ label: '名称', prop: 'name' }]"
          api="arr"
          t-label="测试2"
          t-prop="test2"
          pagination
          option-label="name"
          option-value="id"
        >
          <template #searcher>
            <el-input style="width: 150px" v-model="aa" />
          </template>
        </el-table-select>
      </el-form>
    </el-section>

    <el-btn @click="getValue">获取所有表单的值</el-btn>
  </el-page>
</template>

<script>
import Vue from 'vue'
import E from 'main/index.js'
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
    ElTableSelect: E.TableSelect
  },

  data: () => ({
    form: {
      swt: false,
      name: {
        required: true
      },

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

    form2: {
      test: {
        required: true
      },

      test2: ''
    },
    aa: '',

    api: 'aa',
    templateApi: 'bb',
    resultUrl: '',

    visible: false,

    rules: {
      name: [
        { required: true, message: '必填' },
        { max: 10, message: '100' }
      ],
      type: [{ required: true, message: '必填' }],
      date: [{ max: 100, message: '100' }]
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
    },

    getValue() {
      console.log(this.$refs.page.getAllFormValues())
    },

    onSubmit() {
      console.log(1)
    }
  }
}
</script>
