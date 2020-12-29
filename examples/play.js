import Vue from 'vue'
import Element from 'main/index.js'
import App from './play/index.vue'
import 'packages/theme-chalk/src/index.scss'

Vue.use(Element)

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
