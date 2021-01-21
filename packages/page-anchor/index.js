import ElPageAnchor from '../page/src/page-anchor';

/* istanbul ignore next */
ElPageAnchor.install = function(Vue) {
  Vue.component(ElPageAnchor.name, ElPageAnchor);
};

export default ElPageAnchor;
