import { defineSetter } from "./util"

/** 该类用以提供表格的布局支撑 */
export default class Layout {
  container = {
    height: 0
  }

  searcher = {
    height: 0,
    visible: true
  }

  tools = {
    height: 0,
    visible: true
  }

  main = {
    height: 0
  }

  pagination = {
    height: 0,
    visible: false
  }

  constructor() {
    let _this = this

    function setter(v) {
      _this.computeMainHeight()
    }

    ~['searcher', 'tools', 'pagination'].forEach(key => {
      defineSetter(this[key], setter)
    })
  }

  /** dom渲染后的初始化 */
  _set(param1, param2) {
    // 第一个参数是string且第二个参数不为空
    if (typeof param1 === 'string' && this[param1] && param2 instanceof Object) {
      let target = this[param1]
      Object.keys(param2).forEach(key => {
        if (target[key] !== undefined && param2[key] !== undefined) {
          target[key] = param2[key]
        }
      })
    } else if (param1 instanceof Object) {
      // 对象批量
      Object.keys(param1).forEach(key => {
        let target = this[key]
        Object.keys(param1[key]).forEach(childKey => {
          target[childKey] = param1[key][childKey]
        })
      })
    }
  }

  computeMainHeight() {
    this.main = {
      height: this.container.height -
      ['searcher', 'tools', 'pagination'].reduce((acc, cur) => {
        let component = this[cur]
        return acc + (component.visible !== false ? component.height : 0)
      }, 0)
    }

  }
}