<template>
 <section class="el-bpmn__prop-panel">

 </section>
</template>

<script>
// 全局设置
// 流程设置

// 当前节点信息
//
export default {
  name: 'ElBpmnPropPanel',

  methods: {
    render(shape) {
      const { type, businessObject } = shape
      console.log(type)
    }
  }
}
</script>
