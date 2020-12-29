<template>
  <el-row
    v-bind="$attrs"
    :gutter="+gutter"
    tag="form"
    type="flex"
    class="el-form"
    :class="[labelPosition ? 'el-form--label-' + labelPosition : '', { 'el-form--inline': inline }]"
  >
    <!-- <template v-if="$slots.default">
      <slot-render
        :node="node"
        :value="node.data.attrs['s-prop']"
        v-for="(node, i) of $slots.default"
        :key="key"
      />
    </template> -->
    <slot />
  </el-row>
</template>

<script>
import objectAssign from 'element-nice-ui/src/utils/merge'
import ElRow from '../../row/src/row'
// import SlotRender from './slot-render'
export default {
  name: 'ElForm',

  componentName: 'ElForm',

  inheritAttrs: false,

  components: {
    ElRow,
    // SlotRender
  },

  provide() {
    return {
      elForm: this
    }
  },

  props: {
    // form: Object,
    model: Object,
    rules: Object,
    trigger: String,
    labelPosition: String,
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: ''
    },
    colspan: {
      type: [Number, String],
      default: 12
    },
    gutter: {
      type: [String, Number],
      default: 12
    },

    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String,
    disabled: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    rules() {
      // remove then add event listeners on form-item after form rules change
      this.fields.forEach((field) => {
        field.removeValidateEvents()
        field.addValidateEvents()
      })

      if (this.validateOnRuleChange) {
        this.validate(() => {})
      }
    }
  },
  computed: {
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length) return 0
      const max = Math.max(...this.potentialLabelWidthArr)
      return max ? `${max}px` : ''
    },

    // model() {
    //   let ret = {}
    //   let { form } = this
    //   return Object.keys(form).forEach((key) => {
    //     if (typeof form[key] === 'object' && form[key] !== null) {
    //       ret[key] = form[key].value
    //     } else {
    //       ret[key] = form[key]
    //     }
    //   })
    // },

    // rules() {
    //   let ret = {}
    //   let { form, trigger } = this
    //   let ruleMap = {
    //     required: (required) => ({
    //       required: true,
    //       message: typeof required === 'string' ? required : '该项是必填项'
    //     }),
    //     min: (min) => {
    //       let isArr = Array.isArray(min)
    //       let minVal = isArr ? min[0] : min
    //       return {
    //         min: minVal,
    //         message: isArr && min[1] ? min[1] : `该项最小值为 ${minVal}`
    //       }
    //     },
    //     max: (max) => {
    //       let isArr = Array.isArray(max)
    //       let maxVal = isArr ? max[0] : max
    //       return {
    //         max: maxVal,
    //         message: isArr && max[1] ? max[1] : `该项最大值为 ${maxVal}`
    //       }
    //     },
    //   }
    //   Object.keys(form).forEach((key) => {
    //     let value = form[key]
    //     if (typeof value !== 'object' || value === null) return
    //     let trigger = value.trigger || trigger

    //     Object.keys(value).forEach((vk) => {
    //       if (vk === 'value' || vk === 'trigger') return

    //       if (ret[key]) {
    //         ret[key].push({ ...ruleMap[vk](value[vk]), trigger })
    //       } else {
    //         ret[key] = [{ ...ruleMap[vk](value[vk]), trigger }]
    //       }
    //     })
    //   })
    // }
  },
  data() {
    return {
      fields: [],
      potentialLabelWidthArr: [] // use this array to calculate auto width
    }
  },
  created() {
    this.$on('el.form.addField', (field) => {
      if (field) {
        this.fields.push(field)
      }
    })
    /* istanbul ignore next */
    this.$on('el.form.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })

    this.notifyParent()
  },
  methods: {
    notifyParent() {
      let p = this.$parent
      while (p) {
        if (p.acceptForm) {
          return p.acceptForm(this)
        }
        p = p.$parent
      }
    },

    resetFields() {
      if (!this.model) {
        console.warn('[warn] 你需要往form中传入一个model方可清除验证')
        return
      }
      this.fields.forEach((field) => {
        field.resetField()
      })
    },
    clearValidate(props = []) {
      const fields = props.length
        ? typeof props === 'string'
          ? this.fields.filter((field) => props === field.prop)
          : this.fields.filter((field) => props.indexOf(field.prop) > -1)
        : this.fields
      fields.forEach((field) => {
        field.clearValidate()
      })
    },
    validate(callback) {
      if (!this.model) {
        console.warn('[warn] 你需要往form中传入一个model方可验证')
        return
      }

      let promise
      // if no callback, return promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve) => {
          callback = function(valid) {
            resolve(valid)
          }
        })
      }

      let valid = true
      let count = 0
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true)
      }
      let invalidFields = {}
      this.fields.forEach((field) => {
        field.validate('', (message, field) => {
          if (message) {
            valid = false
          }
          invalidFields = objectAssign({}, invalidFields, field)
          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid, invalidFields)
          }
        })
      })

      if (promise) {
        return promise
      }
    },
    validateField(props, cb) {
      props = [].concat(props)
      const fields = this.fields.filter((field) => props.indexOf(field.prop) !== -1)
      if (!fields.length) {
        console.warn('[Element Warn]please pass correct props!')
        return
      }

      fields.forEach((field) => {
        field.validate('', cb)
      })
    },
    getLabelWidthIndex(width) {
      const index = this.potentialLabelWidthArr.indexOf(width)
      // it's impossible
      if (index === -1) {
        throw new Error('[ElementForm]unpected width ', width)
      }
      return index
    },
    registerLabelWidth(val, oldVal) {
      if (val && oldVal) {
        const index = this.getLabelWidthIndex(oldVal)
        this.potentialLabelWidthArr.splice(index, 1, val)
      } else if (val) {
        this.potentialLabelWidthArr.push(val)
      }
    },
    deregisterLabelWidth(val) {
      const index = this.getLabelWidthIndex(val)
      this.potentialLabelWidthArr.splice(index, 1)
    }
  }
}
</script>
