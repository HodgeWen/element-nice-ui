import CustomStore from 'element-nice-ui/src/utils/store'

// 给每个表格创建一个全局共享状态
export function createStore() {
  return new CustomStore({
    state: {
      data: [],
      headers: []
    },

    mutations: {
      setData(state, payload) {
        state.data = payload
      },

      setHeaders(state, payload) {
        state.headers = payload
      }
    }
  })
}
