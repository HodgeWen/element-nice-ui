<template>
  <div
    @dragstart.prevent
    :class="[
      'el-input-number',
      inputNumberSize ? 'el-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls || append || $slots.append },
      { 'is-controls-right': controlsAtRight },
      { 'el-input-number--with-step': !(append || $slots.append) }
    ]"
  >
    <template v-if="!(append || $slots.append)">
      <span
        class="el-input-number__decrease"
        role="button"
        v-if="controls"
        v-repeat-click="decrease"
        :class="{ 'is-disabled': minDisabled }"
        @keydown.enter="decrease"
      >
        <i :class="`el-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
      </span>
      <span
        class="el-input-number__increase"
        role="button"
        v-if="controls"
        v-repeat-click="increase"
        :class="{ 'is-disabled': maxDisabled }"
        @keydown.enter="increase"
      >
        <i :class="`el-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
      </span>
    </template>

    <el-input
      ref="input"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange"
      :append="append"
      :prepend="prepend"
    >
      <template #prepend>
        <slot name="prepend" />
      </template>
      <template #append>
        <slot name="append" />
      </template>
    </el-input>
  </div>
</template>
<script>
import ElInput from 'element-nice-ui/packages/input'
import Focus from 'element-nice-ui/src/mixins/focus'
import RepeatClick from 'element-nice-ui/src/directives/repeat-click'
import { getDefined } from 'element-nice-ui/src/utils/util'

export default {
  name: 'ElInputNumber',
  mixins: [Focus('input')],
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  directives: {
    repeatClick: RepeatClick
  },
  components: {
    ElInput
  },
  props: {
    clearable: true,

    append: { type: String },

    prepend: { type: String },

    money: {
      type: [Boolean, Number]
    },
    step: {
      type: Number,
      default: 1
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {},
    disabled: {
      type: Boolean,
      default: undefined
    },
    size: String,
    controls: {
      type: Boolean,
      default: true
    },
    controlsRight: {
      type: Boolean,
      default: true
    },
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      default: 2,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10)
      }
    }
  },
  data() {
    return {
      currentValue: 0,
      userInput: null,
      _inUserEvent: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        // 由用户事件更新的属性不再触发更新
        if (this.$data._inUserEvent) {
          return (this.$data._inUserEvent = false)
        }
        // 要根据传入的值进行回显

        // 空值直接返回空串
        if (value === undefined || value === null) {
          return (this.userInput = '')
        }

        // 转化为数字
        value = Number(value)
        if (isNaN(value)) return

        // money模式下需要除以指定的倍数
        let { min, max } = this
        if (this.money) {
          max = this.multiply(max)
          min = this.multiply(min)
        }
        if (value > max) value = max
        if (value < min) value = min

        if (this.precision !== undefined) {
          value = this.toPrecision(value, this.precision)
        }

        // 严格步进精度
        if (this.stepStrictly) {
          const stepPrecision = this.getPrecision(this.step)
          const precisionFactor = Math.pow(10, stepPrecision)
          value =
            (Math.round(value / this.step) * precisionFactor * this.step) /
            precisionFactor
        }

        this.currentValue = value
        this.userInput = null
      }
    }
  },
  computed: {
    minDisabled() {
      // money标记
      let v = this.money ? this.multiply(this.value, true) : this.value
      return this._decrease(v, this.step) < this.min
    },
    maxDisabled() {
      // money标记
      let v = this.money ? this.multiply(this.value, true) : this.value
      return this._increase(v, this.step) > this.max
    },
    numPrecision() {
      const { value, step, getPrecision, precision } = this
      const stepPrecision = getPrecision(step)
      if (precision !== undefined) {
        if (stepPrecision > precision) {
          console.warn(
            '[Element Warn][InputNumber]precision should not be less than the decimal places of step'
          )
        }
        return precision
      } else {
        return Math.max(getPrecision(value), stepPrecision)
      }
    },
    controlsAtRight() {
      return (
        this.controls &&
        this.controlsRight &&
        !this.append &&
        !this.$slots.append
      )
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    inputNumberSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    inputNumberDisabled() {
      return getDefined(this.disabled, (this.elForm || {}).disabled, false)
    },
    displayValue() {
      if (this.userInput !== null) {
        return this.userInput
      }

      let { currentValue } = this
      if (typeof currentValue === 'number') {
        if (this.stepStrictly) {
          const stepPrecision = this.getPrecision(this.step)
          const precisionFactor = Math.pow(10, stepPrecision)
          currentValue =
            (Math.round(currentValue / this.step) *
              precisionFactor *
              this.step) /
            precisionFactor
        }

        if (this.money) {
          currentValue = this.formatter.format(
            currentValue / (typeof this.money === 'number' ? this.money : 100)
          )
        } else if (this.precision !== undefined) {
          currentValue = currentValue.toFixed(this.precision)
        }
      }

      return currentValue
    }
  },
  methods: {
    multiply(v, reciprocal = false) {
      if (v === undefined || v === null) {
        return v
      }
      let strV = v + ''
      let dotIndex = strV.indexOf('.')
      let dotLen = dotIndex === -1 ? 0 : strV.length - 1 - dotIndex

      let factor = Math.pow(10, dotLen)

      v = Math.round(v * factor)

      // 倍数
      let mul = typeof this.money === 'number' ? this.money : 100

      return (reciprocal ? v / mul : v * mul) / factor
    },

    toPrecision(num = 0, precision) {
      if (precision === undefined) precision = this.numPrecision
      return parseFloat(
        Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
      )
    },
    getPrecision(value) {
      if (value === undefined || value === null) return 0
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    },
    _increase(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue

      const precisionFactor = Math.pow(10, this.numPrecision)
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return this.toPrecision(
        (precisionFactor * val + precisionFactor * step) / precisionFactor
      )
    },
    _decrease(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue

      const precisionFactor = Math.pow(10, this.numPrecision)

      return this.toPrecision(
        (precisionFactor * val - precisionFactor * step) / precisionFactor
      )
    },
    increase() {
      if (this.inputNumberDisabled || this.maxDisabled) return
      // money标记
      const value = this.money
        ? this.multiply(this.value || 0, true)
        : this.value || 0
      const newVal = this._increase(value, this.step)
      this.setCurrentValue(newVal)
    },
    decrease() {
      if (this.inputNumberDisabled || this.minDisabled) return
      // money标记
      const value = this.money
        ? this.multiply(this.value || 0, true)
        : this.value || 0
      const newVal = this._decrease(value, this.step)
      this.setCurrentValue(newVal)
    },
    handleBlur(event) {
      this.$emit('blur', event)
    },
    handleFocus(event) {
      this.$emit('focus', event)
    },
    setCurrentValue(newVal) {
      const oldVal = this.currentValue
      if (typeof newVal === 'number') {
        if (this.precision !== undefined) {
          newVal = this.toPrecision(newVal, this.precision)
        }
      }

      if (newVal >= this.max) newVal = this.max
      if (newVal <= this.min) newVal = this.min

      // money标记
      if (this.money) {
        newVal = this.multiply(newVal)
      }

      if (oldVal === newVal) return

      this.userInput = null
      this.$emit('input', newVal)
      this.$emit('change', newVal, oldVal)
      this.currentValue = newVal
    },
    handleInput(value, event) {
      this.userInput = value
    },
    handleInputChange(value) {
      this.$data._inUserEvent = true
      // 替换掉所有的,
      value = value.replace(/,/g, '')
      const newVal = value === '' ? undefined : Number(value)

      if (!isNaN(newVal) || value === '') {
        this.setCurrentValue(newVal)
      }
      this.userInput = null
    },
    select() {
      this.$refs.input.select()
    }
  },
  created() {
    // money标记
    if (this.money) {
      this.formatter = new Intl.NumberFormat(undefined, {
        maximumFractionDigits: this.precision,
        minimumFractionDigits: this.precision
      })
    }
  },
  mounted() {
    let innerInput = this.$refs.input.$refs.input
    innerInput.setAttribute('role', 'spinbutton')
    innerInput.setAttribute('aria-valuemax', this.max)
    innerInput.setAttribute('aria-valuemin', this.min)
    innerInput.setAttribute('aria-valuenow', this.currentValue)
    innerInput.setAttribute('aria-disabled', this.inputNumberDisabled)
  },
  updated() {
    if (!this.$refs || !this.$refs.input) return
    const innerInput = this.$refs.input.$refs.input
    innerInput.setAttribute('aria-valuenow', this.currentValue)
  }
}
</script>
