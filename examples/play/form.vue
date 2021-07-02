<template>
  <div ref="page">
    <el-table
      :headers="[
        { label: 'aaa', prop: 'aa' },
        { label: 'aaa', slotName: 'aa' },
        { label: 'aaa', slotName: 'action' }
      ]"
      :data="data"
      auto-height
      row-key="aa"
      ref="table"
      :tree-props="{ children: 'childs' }"
    >
      <template #column.aa="{ indexPath }">
        {{ indexPath }}
      </template>

      <template #column.action="{ indexPath }">
        <el-btn @click="$refs.table.create({ aa: Math.random() }, indexPath)">新增子级</el-btn>
        <el-btn @click="$refs.table.update(indexPath, row => (row.aa = Math.random()))"
          >编辑</el-btn
        >
        <el-btn @click="$refs.table.delete(indexPath)">删除</el-btn>
      </template>
    </el-table>
    <el-form :form="form">
      <el-select @change="$log" api="/select/tree" filterable tree t-prop="aa" />

      <el-cascader @change="$log" :props="{ checkStrictly: true }" :options="options" t-prop="bb" />
    </el-form>

    <el-tree
      :data="data"
      :show-checkbox="node => node.isLeaf"
      :props="{ children: 'childs', label: 'aa', value: 'aa' }"
      node-key="aa"
      check-strictly
      @check="$log"
    >
    </el-tree>
  </div>
</template>

<script>
import Vue from 'vue'
import E from 'main/index.js'
import TestTree from './tree/tree.vue'
Vue.use(E.Loading.directive)
export default {
  components: {
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
      aa: 'zhinan',
      bb: []
    },

    data: [
      { aa: '1', childs: [{ aa: '2' }, { aa: '3' }, { aa: '4' }] },
      { aa: '5' },
      { aa: '6', childs: [{ aa: '7' }] }
    ],
    options: [
      {
        value: '1',
        label1: '张三',
        children: [
          { value: '2', label1: '李四' },
          { value: '3', label1: '王五', children: [{ value: '4', label1: '张子恒' }] }
        ]
      },
      {
        value: '5',
        label1: '赵金鹏',
        children: [{ value: '6', label1: '陈龙' }]
      }
    ]
  }),

  methods: {}
}
</script>

<style lang="scss"></style>
