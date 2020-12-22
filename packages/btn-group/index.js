import ElBtnGroup from '../btn/src/btn-group';

/* istanbul ignore next */
ElBtnGroup.install = function(Vue) {
  Vue.component(ElBtnGroup.name, ElBtnGroup);
};

export default ElBtnGroup;
