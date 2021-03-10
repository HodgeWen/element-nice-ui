<template>
  <div>

    <el-form :form="form" ref="form" size="small" label-width="60px">

      <!-- <el-select multiple filterable t-label="测试" t-prop="select" :options="{ 0: '0', 1: '1' }" />
      <el-input t-prop="name" t-label="名字" append="测试" /> -->
      <el-input-number
        t-prop="height"
        t-label="身高"
        @change="$log(222)"
      />
      <!-- <el-radio-group t-prop="type" t-label="类型">
        <el-radio label="1">显示</el-radio>
        <el-radio label="2">隐藏</el-radio>
      </el-radio-group>

      <el-checkbox-group t-prop="checked" t-label="检查">
        <el-checkbox-button label="1">测试</el-checkbox-button>
      </el-checkbox-group>

      <el-switch t-prop="swt" active-text="ac" inactive-text="iac"></el-switch>
      <el-select t-label="树形选择器" api="/select/tree" tree filterable t-prop="tree" />

      <el-cascader t-prop="cas" clearable :options="options"></el-cascader>
      <el-slider t-prop="slider" />

      <el-time-picker t-prop="date"/> -->
    </el-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    color: '#760EDD',

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

      height: { value: null, required: true, type: 'number' },

      select: [],

      tree: {},

      cas: {  required: true, trigger: 'change' },

      slider: {},

      date: {}
    },

    options: [
      { value: '1', label: 'aa', children: [{ value: '2', label: 'bb' }] }
    ]
  }),

  methods: {
    onColorInput(color) {
      const mix = (first, second, percent = 0.2) => {
        let map = {
          r: [1, 3],
          g: [3, 5],
          b: [5, 7]
        }
        const ft = type => {
          const [start, end] = map[type]
          return parseInt(first.slice(start, end), 16)
        }
        const st = type => {
          const [start, end] = map[type]
          return parseInt(second.slice(start, end), 16)
        }

        const c = t => `0${Math.round((ft(t) - st(t)) * percent + st(t)).toString(16)}`.slice(-2)
        return '#' + [c('r'), c('g'), c('b')].join('')
      }

      const tintColor = mix('#ffffff', color, 0.2)
      const shadeColor = mix('#000000', color, 0.1)
      const disabledColor = mix('#ffffff', color, 0.5)

      const { style } = document.documentElement

      style.setProperty('--primary-color', color)
      style.setProperty('--primary-tint-color', tintColor)
      style.setProperty('--primary-shade-color', shadeColor)
      style.setProperty('--primary-disabled-color', disabledColor)
    }
  },

  created() {
    this.onColorInput(this.color)
  }
}
</script>
