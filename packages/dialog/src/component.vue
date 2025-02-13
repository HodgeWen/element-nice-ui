<template>
  <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div v-show="visible" class="el-dialog__wrapper" @click.self="handleWrapperClick">
      <div
        role="dialog"
        :key="key"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="[
          'el-dialog',
          { 'is-fullscreen': fullscreen, 'el-dialog--center': center },
          customClass
        ]"
        ref="dialog"
        :style="style"
      >
        <div class="el-dialog__header" :style="{ cursor: isMouseDown ? 'grab' : 'default' }" @mousedown="mousedown">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="el-dialog__headerbtn el-dialog__headerbtn-full"
            aria-label="FullScreen"
            @click="onToogleFullScreen"
          >
            <i :class="fullscreen ? 'el-icon-minus' : 'el-icon-full-screen'"></i>
          </button>
          <button
            type="button"
            class="el-dialog__headerbtn el-dialog__headerbtn-close"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose"
          >
            <i class="el-icon-close"></i>
          </button>
        </div>
        <el-perfect-scrollbar class="el-dialog__body" v-if="renderBodyWithoutOpen || rendered">
          <slot />
        </el-perfect-scrollbar>
        <el-context v-if="!hideFooter" :ctx="footerCtx" class="el-dialog__footer">
          <el-btn @click="handleClose">{{ cancelText }}</el-btn>
          <slot name="footer" v-if="$slots.footer" />
          <el-btn v-if="confirm" @click="onConfirm" size="small" type="primary">
            {{ confirmText }}
          </el-btn>
        </el-context>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'element-nice-ui/src/utils/popup'
import Migrating from 'element-nice-ui/src/mixins/migrating'
import emitter from 'element-nice-ui/src/mixins/emitter'
import ElBtn from 'element-nice-ui/packages/btn'
import ElContext from 'element-nice-ui/packages/context'
import ElPerfectScrollbar from 'element-nice-ui/packages/perfect-scrollbar'
export default {
  name: 'ElDialog',

  components: {
    ElBtn,
    ElContext,
    ElPerfectScrollbar
  },

  mixins: [Popup, emitter, Migrating],

  props: {
    confirm: {
      type: Function
    },

    renderBodyWithoutOpen: Boolean,

    confirmText: {
      type: String,
      default: '提交'
    },
    cancelText: {
      type: String,
      default: '取消'
    },

    hideFooter: {
      type: Boolean
    },

    title: {
      type: String,
      default: '对话框'
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: false
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15vh'
    },
    beforeClose: Function,

    center: {
      type: Boolean,
      default: false
    },

    destroyOnClose: Boolean,

    defaultFullScreen: Boolean
  },

  data() {
    return {
      closed: false,
      key: 0,
      loading: false,
      fullscreen: this.defaultFullScreen,

      transform: {
        x: 0,
        _x: 0,
        _y: 0,
        y: 0
      },

      _originX: 0,
      _originY: 0,

      isMouseDown: false
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        if (this.formInstances) {
          this.$nextTick(() => {
            this.formInstances.forEach(instance => {
              instance.resetFields()
            })
          })
        }
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++
          })
        }
      }
    }
  },

  model: {
    prop: 'visible',
    event: 'change'
  },

  computed: {
    style() {
      let style = {}
      if (!this.fullscreen) {
        style.marginTop = this.top
        if (this.width) {
          style.width = this.width
        }
        const { x, y } = this.transform
        style.transform = `translate(${x}px, ${y}px)`
      }
      return style
    },

    footerCtx() {
      return { size: 'small', loading: this.loading }
    }
  },

  methods: {
    acceptForm(instance) {
      if (this.formInstances) {
        this.formInstances.push(instance)
      } else {
        this.formInstances = [instance]
      }
    },

    onToogleFullScreen() {
      this.fullscreen = !this.fullscreen
    },

    mousemove(e) {
      const { transform, $data } = this
      transform.x = transform._x + e.x - $data._originX
      transform.y = transform._y + e.y - $data._originY
    },

    mouseup() {
      const { transform } = this
      this.isMouseDown = false
      transform._x = transform.x
      transform._y = transform.y
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },

    mousedown(e) {
      if (this.fullscreen) return
      this.isMouseDown = true
      const { $data } = this
      $data._originX = e.x
      $data._originY = e.y

      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },

    onConfirm() {
      if (!this.confirm) return

      const excute = () => {
        let p = this.confirm()
        if (p instanceof Promise) {
          this.loading = true
          p.then(res => {
            this.loading = false
            if (res !== false) {
              this.$emit('change', false)
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          p !== false && this.$emit('change', false)
        }
      }

      if (!this.formInstances) {
        return excute()
      }

      Promise.all(this.formInstances.map(item => item.validate())).then(res => {
        if (res.every(v => v)) {
          excute()
        }
      })
    },

    getMigratingConfig() {
      return {
        props: {
          size: 'size is removed.'
        }
      }
    },
    handleWrapperClick() {
      if (!this.closeOnClickModal) return
      this.handleClose()
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('change', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    },
    afterEnter() {
      this.$emit('opened')
    },
    afterLeave() {
      this.$emit('closed')
    }
  },

  mounted() {
    if (this.visible) {
      this.rendered = true
      this.open()
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },

  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
