<template>
  <div
    @dragstart.prevent
    :class="[
      'el-input-number',
      inputNumberSize ? 'el-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight }
    ]"
  >
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
    >
    </el-input>
  </div>
</template>
<script>
import ElInput from 'element-nice-ui/packages/input'
import Focus from 'element-nice-ui/src/mixins/focus'
import RepeatClick from 'element-nice-ui/src/directives/repeat-click'

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
    disabled: Boolean,
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
      validator(val) {
        return val >= 0 && val === parseInt(val, 10)
      }
    }
  },
  data() {
    return {
      currentValue: 0,
      userInput: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        let newVal = value === undefined || value === null ? value : Number(value)
        if (newVal !== undefined && newVal !== null) {
          if (isNaN(newVal)) {
            return
          }

          if (this.stepStrictly) {
            const stepPrecision = this.getPrecision(this.step)
            const precisionFactor = Math.pow(10, stepPrecision)
            newVal =
              (Math.round(newVal / this.step) * precisionFactor * this.step) / precisionFactor
          }

          // money标记
          if (this.money) {
          }

          if (this.precision !== undefined) {
            newVal = this.toPrecision(newVal, this.precision)
          }
        }

        // money标记
        if (this.money) {
          let max = this.multiply(this.max)
          let min = this.multiply(this.min)

          if (newVal >= max) newVal = max
          if (newVal <= min) newVal = min
        } else {
          if (newVal >= this.max) newVal = this.max
          if (newVal <= this.min) newVal = this.min
        }

        this.currentValue = newVal
        this.userInput = null
        this.$emit('input', newVal)
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
      return this.controls && this.controlsRight
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    inputNumberSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    inputNumberDisabled() {
      return this.disabled || !!(this.elForm || {}).disabled
    },
    displayValue() {
      if (this.userInput !== null) {
        return this.userInput
      }

      let currentValue = this.currentValue

      if (typeof currentValue === 'number') {
        if (this.stepStrictly) {
          const stepPrecision = this.getPrecision(this.step)
          const precisionFactor = Math.pow(10, stepPrecision)
          currentValue =
            (Math.round(currentValue / this.step) * precisionFactor * this.step) / precisionFactor
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
      let mul = typeof this.money === 'number' ? this.money : 100
      return reciprocal ? v / mul : v * mul
    },

    toPrecision(num, precision) {
      if (precision === undefined) precision = this.numPrecision
      return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision))
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
      return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor)
    },
    _decrease(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue

      const precisionFactor = Math.pow(10, this.numPrecision)

      return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor)
    },
    increase() {
      if (this.inputNumberDisabled || this.maxDisabled) return
      // money标记
      const value = this.money ? this.multiply(this.value || 0, true) : (this.value || 0)
      const newVal = this._increase(value, this.step)
      this.setCurrentValue(newVal)
    },
    decrease() {
      if (this.inputNumberDisabled || this.minDisabled) return
      // money标记
      const value = this.money ? this.multiply(this.value || 0, true) : (this.value || 0)
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
