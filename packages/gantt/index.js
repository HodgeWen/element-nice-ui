import ElGantt from './src/gantt.vue'

/* istanbul ignore next */
ElGantt.install = function(Vue) {
  Vue.component(ElGantt.name, ElGantt)
}

export default ElGantt
