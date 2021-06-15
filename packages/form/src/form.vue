<script>
import objectAssign from 'element-nice-ui/src/utils/merge'
import ElRow from '../../row/src/row'
import { modifierMethod, components } from './utils'
import ElFormItem from './form-item.vue'
import { kebabCase } from 'element-nice-ui/src/utils/util'
export default {
  name: 'ElForm',

  componentName: 'ElForm',

  inheritAttrs: false,

  components: {
    ElRow,
    ElFormItem
  },

  provide() {
    return {
      elForm: this
    }
  },

  props: {
    conceal: Boolean,

    grid: {
      type: Boolean,
      default: true
    },

    originModel: {
      type: Object
    },

    originRules: {
      type: Object
    },

    form: {
      type: Object
    },
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
    readonly: {
      type: Boolean,
      default: undefined
    },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String,
    disabled: {
      type: Boolean,
      default: undefined
    },
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
      this.fields.forEach(field => {
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

    rules() {
      if (this.originRules && this.originModel) return this.originRules

      let ret = {}

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
          let message = type === 'number' ? `值不能小于 ${minVal}` : `字符长度不能小于 ${minVal}`
          return {
            min: minVal,
            message: isArr && min[1] ? min[1] : message
          }
        },
        max: (max, type) => {
          let isArr = Array.isArray(max)
          let maxVal = isArr ? max[0] : max
          let message = type === 'number' ? `值不能大于 ${maxVal}` : `字符长度不能大于 ${maxVal}`
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
              id: [/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/, '身份证格式不正确'],
              email: [/^([\w\_\-]+)@([\w\-]+[\.]?)*[\w]+\.[a-zA-Z]{2,10}$/, '电子邮件格式不正确']
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
      let { form, trigger } = this

      Object.keys(form).forEach(key => {
        let valueModel = form[key]

        if (!valueModel) return

        let trigger = valueModel.trigger || trigger || 'blur'
        let type = valueModel.type || 'string'

        Object.keys(valueModel).forEach(vk => {
          // 如果key为这两种直接跳过
          if (vk === 'value' || vk === 'trigger' || vk === 'type') return

          // 规则工厂
          let ruleFactory = ruleMap[vk]
          if (!ruleFactory) return

          // 生成具体规则
          let rule = { ...ruleFactory(valueModel[vk], type), trigger, type }

          if (ret[key]) {
            ret[key].push(rule)
          } else {
            ret[key] = [rule]
          }
        })
      })

      return ret
    }
  },
  data() {
    return {
      fields: [],
      model: {},
      potentialLabelWidthArr: [] // use this array to calculate auto width
    }
  },

  render(h) {
    let customSlots = []

    if (this.$slots.default) {
      customSlots = this.transSlots(this.$slots.default)
    } else if (this.$scopedSlots.data) {
      customSlots = this.transSlots(this.$scopedSlots.data(this.model))
    }

    const children = customSlots.map(this.getFormNode)

    const props = {
      attrs: this.$attrs,
      class: [
        'el-form',
        this.labelPosition ? 'el-form--label-' + this.labelPosition : '',
        { 'el-form--inline': this.inline }
      ]
    }

    return this.grid ? (
      <el-row {...props} gutter={+this.gutter} tag='form' type='flex'>
        {children}
      </el-row>
    ) : (
      <form {...props}>{children}</form>
    )
  },
  created() {
    this.initModel()

    this.$on('el.form.addField', field => {
      if (field) {
        this.fields.push(field)
      }
    })
    /* istanbul ignore next */
    this.$on('el.form.removeField', field => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })

    !this.conceal && this.notifyParent()
  },
  methods: {
    getFormNode({ node, prop }, i) {
      let { componentOptions: opts, data, tag } = node
      let rawTag = kebabCase(tag.replace(/vue-component-\d+-/, ''))
      if (!opts || !components.has(rawTag)) return node

      let { attrs = {} } = data

      // 所有表单属性
      let formProps = ['prop', 'label', 'span'].reduce((acc, cur) => {
        acc[cur] = attrs[`t-${cur}`]
        return acc
      }, {})

      // 事件定义
      let on = opts.listeners || {}
      let input
      let modifier = attrs['t-modifier']
      if (modifier && modifierMethod[modifier]) {
        input = (v) => {
          this.model[prop] = modifierMethod[modifier](v)
          this.$emit('change', this.model)
        }
      } else {
        input = (v) => {
          this.model[prop] = v
          this.$emit('change', this.model)
        }
      }

      if (on.input) {
        if (Array.isArray(on.input)) {
          on.input.unshift(input)
        } else {
          on.input = [input, on.input]
        }
      } else {
        on.input = input
      }

      opts.listeners = on

      // 生成一个新的节点
      let newNode = this.$createElement(rawTag)

      // 新的属性
      if (opts.propsData) {
        opts.propsData.value = this.model[prop]
      }

      newNode.isRootInsert = node.isRootInsert
      newNode.data = node.data
      newNode.componentOptions = opts

      return <el-form-item {...{ props: formProps }}>{newNode}</el-form-item>
    },

    getValue() {
      return { ...this.model }
    },

    setValue(values) {
      Object.keys(this.model).forEach(key => {
        if (values[key] !== undefined) {
          this.model[key] = values[key]
        }
      })
    },

    onInput(prop, val) {
      if (!prop) return
      this.model[prop] = val
      this.$emit('change', this.model)
    },

    getItemValue(prop) {
      if (!prop) return
      return this.model[prop]
    },

    transSlots(slots) {
      if (!slots) return []
      return slots
        .filter(vnode => vnode.tag)
        .map(node => {
          let { data = {} } = node
          let { attrs = {} } = data
          let prop = attrs['t-prop']
          return {
            prop,
            node
          }
        })
    },

    initModel() {
      // 使用element原始的model
      if (this.originRules && this.originModel) {
        this.model = this.originModel
        return
      }

      if (!this.form) return

      let ret = {}
      let { form } = this
      Object.keys(form).forEach(key => {
        if (Object.prototype.toString.call(form[key]) === '[object Object]') {
          ret[key] = form[key].value
        } else {
          ret[key] = form[key]
        }
      })
      this.model = ret
    },

    notifyParent() {
      let p = this.$parent
      while (p) {
        if (p.acceptForm) {
          return p.acceptForm(this)
        }
        p = p.$parent
      }
    },

    resetFields(excludes = []) {
      if (!this.model) {
        console.warn('[warn] 你需要传入form方可清除验证')
        return
      }

      for (const key in this.model) {
        if (excludes.includes(key)) continue

        let formVal = this.form[key]
        let initialVal
        if (Object.prototype.toString.call(formVal) === '[object Object]') {
          if ('value' in formVal) {
            initialVal = formVal.value
          } else if (!formVal.type || formVal.type === 'string') {
            initialVal = ''
          } else if (formVal.type === 'array') {
            initialVal = []
          } else {
            initialVal = null
          }
        } else {
          initialVal = formVal
        }
        this.model[key] = initialVal
      }
      this.clearValidate()
    },
    clearValidate(props = []) {
      const fields = props.length
        ? typeof props === 'string'
          ? this.fields.filter(field => props === field.prop)
          : this.fields.filter(field => props.indexOf(field.prop) > -1)
        : this.fields
      fields.forEach(field => {
        field.clearValidate()
      })
    },
    validate(callback) {
      if (!this.model) {
        console.warn('[warn] 你需要传入form方可验证')
        return
      }

      let promise
      // if no callback, return promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise(resolve => {
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
      this.fields.forEach(field => {
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
      const fields = this.fields.filter(field => props.indexOf(field.prop) !== -1)
      if (!fields.length) {
        console.warn('[Element Warn]please pass correct props!')
        return
      }

      fields.forEach(field => {
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
