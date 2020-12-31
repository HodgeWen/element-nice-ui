import Vue from 'vue'
import Element from 'main/index.js'
import App from './play/index.vue'
import 'packages/theme-chalk/src/table.scss'
import 'packages/theme-chalk/src/action.scss'
import 'packages/theme-chalk/src/btn.scss'
import 'packages/theme-chalk/src/dialog.scss'
import 'packages/theme-chalk/src/form.scss'
import 'packages/theme-chalk/src/loading.scss'
import 'packages/theme-chalk/src/input.scss'
// import 'packages/theme-chalk/src/.scss'

Vue.use(Element.Table)
Vue.use(Element.ActionItem)
Vue.use(Element.Btn)
Vue.use(Element.Dialog)
Vue.use(Element.Form)
Vue.use(Element.FormItem)
Vue.use(Element.Loading)
Vue.use(Element.Input)
Vue.prototype.$confirm = Element.MessageBox.confirm

Vue.prototype.$log = console.log
Vue.prototype.$EL_TABLE_PROP_CONFIG = {
  page: 'data.records',
  total: 'data.total'
}

Vue.prototype.$http = {
  get() {
    return Promise.resolve({
      code: 200,
      data: {
        records: [
          { hello: true, b: '某某某项目' },
          { hello: false, b: '测试'},
          { hello: false, b: '某某某项目' },
          { hello: false, b: '某某某项目' },
          { hello: false, b: '某某某项目' },
          { hello: false, b: '某某某项目' }
        ],

        total: 6
      }
    })
  }
}

new Vue({
  // eslint-disable-line
  render: (h) => h(App)
}).$mount('#app')
