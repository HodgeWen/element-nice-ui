<template>
  <div>
    <el-select
      multiple
      filterable
      t-label="测试"
      v-model="form.select"
      :options="{ 0: '0', 1: '1' }"
    />
    <el-select
        t-label="树形选择器"
        api="/select/tree"
        tree
        filterable
        multiple
        v-model="form.tree"
        option-value="value"
        option-label="label"
      />
    <el-form :form="form" ref="form" size="small" label-width="60px">
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


      <el-cascader t-prop="cas" clearable :options="options" />

      <el-slider t-prop="slider" />

      <el-time-picker t-prop="date" />
    </el-form>
  </div>
</template>

<script>
export default {
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

      select: [],

      tree: {},

      cas: { required: true, trigger: 'change' },

      slider: {},

      date: {}
    },

    options: [{ value: '1', label: 'aa', children: [{ value: '2', label: 'bb' }] }]
  }),

  methods: {
    submit() {
      this.$refs.form.validate().then(valid => {
        if (!valid) return
        this.$msg.success('成功')
      })
    }
  },

  mounted() {
    this.form.tree = ['cexiangdaohang']
  }
}
</script>
