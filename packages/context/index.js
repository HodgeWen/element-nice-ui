import ElContext from './src/context'

/* istanbul ignore next */
ElContext.install = function(Vue) {
  Vue.component(ElContext.name, ElContext)
}

export default ElContext
