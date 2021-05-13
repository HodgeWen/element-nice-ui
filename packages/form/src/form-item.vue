<script>
import AsyncValidator from 'async-validator'
import emitter from 'element-nice-ui/src/mixins/emitter'
import objectAssign from 'element-nice-ui/src/utils/merge'
import { noop, getPropByPath } from 'element-nice-ui/src/utils/util'
import LabelWrap from './label-wrap'
import ElCol from '../../col/src/col'
export default {
  name: 'ElFormItem',

  componentName: 'ElFormItem',

  mixins: [emitter],

  provide() {
    return {
      elFormItem: this
    }
  },

  inject: ['elForm'],

  props: {
    label: String,
    labelWidth: String,
    span: {
      type: [String, Number]
    },
    prop: String,
    required: {
      type: Boolean,
      default: undefined
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String
  },
  components: {
    // use this component to calculate auto width
    LabelWrap,
    ElCol
  },
  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value
        this.validateState = value ? 'error' : ''
      }
    },
    validateStatus(value) {
      this.validateState = value
    }
  },
  computed: {
    labelFor() {
      return this.for || this.prop
    },

    computedSpan() {
      const { span, elForm } = this
      if (elForm.inline) return

      let cols = +(span || elForm.colspan)
      return isNaN(cols) ? 12 : cols
    },
    labelStyle() {
      const ret = {}
      if (this.form.labelPosition === 'top') return ret
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        ret.width = labelWidth
      }
      return ret
    },
    contentStyle() {
      const ret = {}
      const label = this.label
      if (this.form.labelPosition === 'top' || this.form.inline) return ret
      if (!label && !this.labelWidth && this.isNested) return ret
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth === 'auto') {
        if (this.labelWidth === 'auto') {
          ret.marginLeft = this.computedLabelWidth
        } else if (this.form.labelWidth === 'auto') {
          ret.marginLeft = this.elForm.autoLabelWidth
        }
      } else {
        ret.marginLeft = labelWidth
      }
      return ret
    },
    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'ElForm') {
        if (parentName === 'ElFormItem') {
          this.isNested = true
        }
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    },
    fieldValue() {
      const model = this.form.model
      if (!model || !this.prop) {
        return
      }

      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      return getPropByPath(model, path, true).v
    },
    isRequired() {
      let rules = this.getRules()
      let isRequired = false

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            isRequired = true
            return false
          }
          return true
        })
      }
      return isRequired
    },
    _formSize() {
      return this.elForm.size
    },
    elFormItemSize() {
      return this.size || this._formSize
    },
    sizeClass() {
      return this.elFormItemSize || (this.$ELEMENT || {}).size
    }
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false,
      computedLabelWidth: ''
    }
  },

  render(h) {
    const formItemClass = ['el-form-item']

    this.showMessage && this.form.showMessage && formItemClass.push('el-form-item--showerror')
    this.validateState && formItemClass.push(`is-${this.validateState}`)
    this.isRequired || (this.required && formItemClass.push('is-required'))
    this.elForm && this.elForm.hideRequiredAsterisk && formItemClass.push('is-no-asterisk')
    this.elForm && this.elForm.statusIcon && formItemClass.push('el-form-item--feedback')
    this.sizeClass && formItemClass.push('el-form-item--' + this.sizeClass)

    const children = [
      <label-wrap
        is-auto-width={this.labelStyle && this.labelStyle.width === 'auto'}
        update-all={this.form.labelWidth === 'auto'}
      >
        {this.label || this.$slots.label ? (
          <label
            for={this.labelFor}
            class='el-form-item__label'
            title={this.label}
            style={this.labelStyle}
          >
            {this.$slots.label || this.label + this.form.labelSuffix}
          </label>
        ) : null}
      </label-wrap>,
      <div class='el-form-item__content' style={this.contentStyle}>
        {this.$slots.default}
        <transition name='el-zoom-in-top'>
          {this.validateState === 'error' && this.showMessage && this.form.showMessage ? (
            this.$scopedSlots.error ? (
              this.$scopedSlots.error({ error: this.validateMessage })
            ) : (
              <div class='el-form-item__error'>{this.validateMessage}</div>
            )
          ) : null}
        </transition>
      </div>
    ]

    return (this.elForm.grid || this.span) ? (
      <el-col span={this.computedSpan} class={formItemClass}>
        {children}
      </el-col>
    ) : (
      <div class={formItemClass}>{children}</div>
    )
  },
  methods: {
    validate(trigger, callback = noop) {
      this.validateDisabled = false
      const rules = this.getFilteredRule(trigger)
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback()
        return true
      }

      this.validateState = 'validating'

      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = this.elForm.model || { [this.prop]: this.fieldValue }

      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage, invalidFields)
        this.elForm &&
          this.elForm.$emit('validate', this.prop, !errors, this.validateMessage || null)
      })
    },
    clearValidate() {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = true

      this.$nextTick(() => {
        this.validateDisabled = false
      })
    },
    resetField() {
      this.validateState = ''
      this.validateMessage = ''

      let model = this.form.model
      let value = this.fieldValue
      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      let prop = getPropByPath(model, path, true)

      this.validateDisabled = true
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue)
      } else {
        prop.o[prop.k] = this.initialValue
      }

      // reset validateDisabled after onFieldChange triggered
      this.$nextTick(() => {
        this.validateDisabled = false
      })

      this.broadcast('ElTimeSelect', 'fieldReset', this.initialValue)
    },
    getRules() {
      let formRules = this.form.rules
      const selfRules = this.rules
      const requiredRule = this.required !== undefined ? { required: !!this.required } : []

      const prop = getPropByPath(formRules, this.prop || '')
      formRules = formRules ? prop.o[this.prop || ''] || prop.v : []

      return [].concat(selfRules || formRules || []).concat(requiredRule)
    },
    getFilteredRule(trigger) {
      const rules = this.getRules()

      return rules
        .filter(rule => {
          if (!rule.trigger || trigger === '') return true
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1
          } else {
            return rule.trigger === trigger
          }
        })
        .map(rule => objectAssign({}, rule))
    },
    onFieldBlur() {
      this.validate('blur')
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }

      this.validate('change')
    },
    updateComputedLabelWidth(width) {
      this.computedLabelWidth = width ? `${width}px` : ''
    },
    addValidateEvents() {
      const rules = this.getRules()

      if (rules.length || this.required !== undefined) {
        this.$on('el.form.blur', this.onFieldBlur)
        this.$on('el.form.change', this.onFieldChange)
      }
    },
    removeValidateEvents() {
      this.$off()
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('ElForm', 'el.form.addField', [this])

      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })

      this.addValidateEvents()
    }
  },
  beforeDestroy() {
    this.dispatch('ElForm', 'el.form.removeField', [this])
  }
}
</script>
