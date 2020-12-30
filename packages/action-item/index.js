import ElActionItem from '../action/src/action-item.js'

/* istanbul ignore next */
ElActionItem.install = function(Vue) {
  Vue.component(ElActionItem.name, ElActionItem)
}

export default ElActionItem
