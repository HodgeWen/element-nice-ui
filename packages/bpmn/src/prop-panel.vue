<template>
  <transition name="el-bpmn__transform">
    <section v-if="visible" class="el-bpmn__prop-panel">
      <div>节点信息</div>
      <el-form
        size="mini"
        :show-message="false"
        :form="nodeForm"
        ref="nodeForm"
        colspan="24"
        label-width="70px"
      >
        <el-input disabled placeholder="无" t-label="节点ID" t-prop="id" />
        <el-input disabled placeholder="无" t-label="节点名称" t-prop="name" />
        <el-input disabled placeholder="无" t-label="节点类型" t-prop="type" />
      </el-form>
    </section>
  </transition>
</template>

<script>
// 全局设置
// 流程设置

// 当前节点信息
import ElForm from 'element-nice-ui/packages/form'
export default {
  name: 'ElBpmnPropPanel',

  components: {
    ElForm
  },

  data: () => ({
    visible: false,

    nodeForm: {
      id: '',
      name: '',
      type: ''
    }
  }),

  methods: {
    // 渲染
    render(shape) {
      this.show()
      const { type, businessObject } = shape
      this.updateNodeInfo(businessObject)
      this.nodeForm.type = type
    },
    //
    updateNodeInfo(businessObject) {
      this.$nextTick(() => {
        const { nodeForm } = this.$refs
        nodeForm.resetFields()
        nodeForm.setValue(businessObject)
      })
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
