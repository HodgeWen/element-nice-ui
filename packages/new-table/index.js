import ElTable from './src/table.vue'

ElTable.install = function(Vue) {
  Vue.component(ElTable.name, ElTable)
}

export default ElTable
