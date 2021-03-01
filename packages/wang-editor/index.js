import WangEditor from './src/main'

WangEditor.install = function(Vue) {
  Vue.component(WangEditor.name, WangEditor)
}

export default WangEditor
