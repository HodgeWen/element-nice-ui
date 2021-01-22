export default class CustomStore {
  constructor(options = {}) {
    if (!options && Object.prototype.toString.call(options) !== '[object Object]') {
      console.error('error: 请传入一个options对象')
    } else {
      this.$vm = new Vue({
        data: {
          state: options.state || {}
        }
      })

      this.state = this.$vm.state

      this._mutations = options.mutations || {}
    }
  }

  commit(type, payload) {
    let mutation = this._mutations[type]
    mutation && mutation(this.$vm.state, payload)
    return this
  }

  /** 销毁实例 */
  destroy() {
    this.$vm.$destroy()
  }
}