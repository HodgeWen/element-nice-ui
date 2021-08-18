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