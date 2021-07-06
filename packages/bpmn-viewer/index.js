import ElBpmnViewer from '../bpmn/src/bpmn-viewer.vue'

ElBpmnViewer.install = function(Vue) {
  Vue.component(ElBpmnViewer.name, ElBpmnViewer)
}

export default ElBpmnViewer
