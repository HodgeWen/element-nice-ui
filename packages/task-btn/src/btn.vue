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
  name: 'ElTaskBtn',

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
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    task: Function
  },

  data() {
    return {
      loading: false
    }
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
      this.executeTask()
      this.$emit('click', evt)
    },

    /** 执行任务 */
    executeTask() {
      if (!this.task) return

      this.loading = true
      let result = this.task()

      if (result instanceof Promise) {
        result.then(() => {
          this.loading = false
        }).catch((err) => {
          this.loading = false
          throw err
        })
      } else {
        if (result !== false) {
          this.loading = false
        }
      }

    }
  }
}
</script>
