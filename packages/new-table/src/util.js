export function treeMap(tree, fn, depth = 0) {
  depth += 1
  return tree.map((item, i) => {
    let ret = {
      ...item
    }

    fn(ret, depth, i)

    if (ret.children && ret.children.length) {
      ret.children = treeMap(ret.children, fn)
    }
    return ret
  })
}

/**
 * 计算dom元素的高度
 * @param {HTMLElement} dom dom对象
 */
export function computedDomHeight(dom) {
  return dom.offsetHeight
}

/**
 * 定义对象setter
 * @param {Record<string, any} obj 定义的对象
 * @param {any} handler  描述器
 */
export function defineSetter(obj, handler) {
  if (typeof handler === 'function') {
    Object.keys(obj).forEach(key => {
      let val = obj[key]
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        set(v) {
          val = v
          handler(v)
        },
        get() {
          return val
        }
      })
    })

    return obj
  } else if (handler instanceof Object) {
    Object.keys(handler).forEach(prop => {
      let val = obj[prop]
      Object.defineProperty(obj, prop, {
        set(v) {
          val = v
          handler[prop](v)
        },
        get() {
          return val
        },
        enumerable: true,
        configurable: true
      })
    })

    return obj
  }
}

/**
 * 从数组右侧开始循环
 * @template T
 * @param {T[]} arr 数组
 * @param {(v: T, index: number, arr: T[]) => void} cb
 */
export function rightEach(arr, cb) {
  let len = arr.length

  while (--len >= 0) {
    cb(arr[len], len, arr)
  }
}
