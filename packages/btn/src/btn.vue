<template>
  <button
    class="el-btn"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-btn--' + type : '',
      buttonSize ? 'el-btn--' + buttonSize : '',
      {
        'is-active': value,
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="'el-icon-' + icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
    <i :class="'el-icon-' + suffixIcon" v-if="suffixIcon && !loading"></i>
  </button>
</template>
<script>
export default {
  name: 'ElBtn',

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    suffixIcon: {
      type: String
    },
    size: String,
    icon: {
      type: String
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    value: {
      type: Boolean
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit('input', !this.value)
      this.$emit('click', evt)
    }
  }
}
</script>
