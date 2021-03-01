import ElBpmn from './src/bpmn.vue'

ElBpmn.install = function(Vue) {
  Vue.component(ElBpmn.name, ElBpmn)
}

export default ElBpmn
