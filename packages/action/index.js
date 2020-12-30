import ElAction from './src/action.js'

/* istanbul ignore next */
ElAction.install = function(Vue) {
  Vue.component(ElAction.name, ElAction)
}

export default ElAction
