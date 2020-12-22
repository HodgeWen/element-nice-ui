import ElBtn from './src/btn';

/* istanbul ignore next */
ElBtn.install = function(Vue) {
  Vue.component(ElBtn.name, ElBtn);
};

export default ElBtn;
