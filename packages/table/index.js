import ElTable from './src/main.vue';

/* istanbul ignore next */
ElTable.install = function(Vue) {
  Vue.component(ElTable.name, ElTable);
};

export default ElTable;
