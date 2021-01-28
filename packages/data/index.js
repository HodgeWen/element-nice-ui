import ElData from './src/data'

/* istanbul ignore next */
ElData.install = function(Vue) {
  Vue.component(ElData.name, ElData)
}

export default ElData
