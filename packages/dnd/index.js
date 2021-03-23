import ElDnd from './src/dnd.vue'

ElDnd.install = function(Vue) {
  Vue.component(ElDnd.name, ElDnd)
}

export default ElDnd
