<template>
  <transition name="el-bpmn__transform">
    <section v-if="visible" class="el-bpmn__prop-panel"></section>
  </transition>
</template>

<script>
// 全局设置
// 流程设置

// 当前节点信息

export default {
  name: 'ElBpmnPropPanel',

  data: () => ({
    visible: false
  }),

  methods: {
    render(shape) {
      this.show()
      const { type, businessObject } = shape
    },

    show() {
      this.visible = true
    },

    hide() {
      this.visible = false
    }
  }
}
</script>
