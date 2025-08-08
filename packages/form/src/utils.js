export const modifierMethod = {
  number(v) {
    let parsed = Number.parseFloat(v)
    return isNaN(parsed) ? v : parsed
  },
  trim(v) {
    return v.trim()
  }
}

export const components = new Set([
  'el-input',
  'el-upload',
  'el-input-number',
  'el-date-picker',
  'el-select',
  'el-switch',
  'el-radio-group',
  'el-radio',
  'el-checkbox',
  'el-checkbox-group',
  'el-slider',
  'el-cascader',
  'el-time-picker',
  'el-date-time-picker',
  'el-table-select',
  'el-wang-editor'
  // 'ElInput', 'ElInputNumber', 'ElDatePicker', 'ElSelect', 'ElSwitch', 'ElRadioGroup', 'ElRadio', 'ElCheckbox', 'ElCheckboxGroup', 'ElSlider', 'ElCascader', 'ElTimePicker', 'ElDateTimePicker'
])

let ruleMap = {
  required: required => ({
    required: required !== false,
    message: typeof required === 'string' ? required : '该项是必填项'
  }),

  len: len => {
    let isArr = Array.isArray(len)
    let lenVal = isArr ? len[0] : len

    return {
      len: lenVal,
      message: isArr && len[1] ? len[1] : `字符长度应为 ${lenVal}`
    }
  },

  min: (min, type) => {
    let isArr = Array.isArray(min)
    let minVal = isArr ? min[0] : min
    let message =
      type === 'number' ? `值不能小于 ${minVal}` : `字符长度不能小于 ${minVal}`
    return {
      min: minVal,
      message: isArr && min[1] ? min[1] : message
    }
  },
  max: (max, type) => {
    let isArr = Array.isArray(max)
    let maxVal = isArr ? max[0] : max
    let message =
      type === 'number' ? `值不能大于 ${maxVal}` : `字符长度不能大于 ${maxVal}`
    return {
      max: maxVal,
      message: isArr && max[1] ? max[1] : message
    }
  },

  range: (range, type) => {
    let message =
      type === 'number'
        ? `值的范围在 ${range[0]} ~ ${range[1]} 之间`
        : `字符长度应在 ${range[0]} ~ ${range[1]} 之间`
    return {
      min: range[0],
      max: range[1],
      message: range[2] || message
    }
  },

  match: match => {
    let isArr = Array.isArray(match)
    let matcher = isArr ? match[0] : match
    let message

    if (typeof matcher === 'string') {
      let preset = {
        phone: [/^1\d{10}$/, '手机号格式不正确'],
        id: [
          /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
          '身份证格式不正确'
        ],
        email: [
          /^([\w\_\-]+)@([\w\-]+[\.]?)*[\w]+\.[a-zA-Z]{2,10}$/,
          '电子邮件格式不正确'
        ]
      }
      let presetMatcher = preset[matcher]
      if (presetMatcher) {
        matcher = presetMatcher[0]
        message = presetMatcher[1]
      } else {
        console.error('match格式错误')
      }
    }

    if (isArr && match[1]) {
      message = match[1]
    }

    return {
      pattern: matcher,
      message
    }
  },

  validator: validator => {
    return { validator }
  }
}

export function form(form, trigger = 'blur') {
  const model = {}
  const rules = {}

  // 初始化数据
  Object.keys(form).forEach(key => {
    if (Object.prototype.toString.call(form[key]) === '[object Object]') {
      model[key] = form[key].value
    } else {
      model[key] = form[key]
    }
  })

  Object.keys(form).forEach(key => {
    let valueModel = form[key]

    if (!valueModel) return

    let _trigger = valueModel.trigger || trigger
    let type =
      valueModel.type ||
      (![undefined, null].includes(valueModel.value)
        ? Object.prototype.toString
            .call(valueModel.value)
            .slice(8, -1)
            .toLowerCase()
        : 'string')

    Object.keys(valueModel).forEach(vk => {
      // 如果key为这几种直接跳过ƒ
      if (vk === 'value' || vk === 'trigger' || vk === 'type') return

      // 规则工厂
      let ruleFactory = ruleMap[vk]
      if (!ruleFactory) return

      // 生成具体规则
      let rule = {
        ...ruleFactory(valueModel[vk], type),
        trigger: _trigger,
        type
      }

      if (rules[key]) {
        rules[key].push(rule)
      } else {
        rules[key] = [rule]
      }
    })
  })
  return {
    model,
    rules
  }
}
