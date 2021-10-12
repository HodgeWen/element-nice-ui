// 创建 或 连接 数据库
// 使用 获取store, 进行增删改查

/**
 * 数据库操作的异步包装器
 * @param {IDBRequest<any>} request 操作的请求
 * @param {(callback: (res: any) => void, request: IDBRequest<any>) => void} resolveCall
 * @returns
 */
function promiseWrap(request, resolveCall) {
  return new Promise((rs, rj) => {
    function success() {
      resolveCall(rs, request)
      request.removeEventListener('success', success)
    }

    function error() {
      rj(request.error)
      request.removeEventListener('error', error)
    }

    request.addEventListener('success', success)
    request.addEventListener('error', error)
  })
}

export class Store {
  /** @type {IDBObjectStore} 存储对象 */
  store = null

  /**
   * @param {IDBDatabase} db 数据库
   * @param {string} storeName 存储对象
   * @param {IDBTransactionMode} [mode] 模式
   */
  constructor(db, storeName, mode) {
    let transaction = db.transaction(storeName, mode)
    this.store = transaction.objectStore(storeName)
  }

  /**
   * 新增数据
   * @param {any} value 要添加的值
   * @param {IDBValidKey} [key] 合法的键
   * @returns {Promise<IDBValidKey>}
   */
  add(value, key) {
    return promiseWrap(this.store.add(value, key), (rs, request) => rs(request.result))
  }

  /**
   * 删除数据
   * @param {IDBValidKey | IDBKeyRange} query 查询条件
   * @returns {Promise<undefined}
   */
  delete(query) {
    return promiseWrap(this.store.delete(query), rs => rs())
  }

  /**
   * 获取值
   * @param {IDBValidKey | IDBKeyRange} query
   * @returns {Promise<any>}
   */
  get(query) {
    return promiseWrap(this.store.get(query), (rs, request) => rs(request.result))
  }

  /**
   * 查找多个或全部的数据
   * @param {IDBValidKey | IDBKeyRang} query 查询条件
   * @param {number} count 查询的数量
   * @returns {Promise<any[]>} 返回的数据
   */
  getAll(query, count) {
    return promiseWrap(this.store.getAll(query, count), (rs, request) => rs(request.result))
  }

  /**
   * 更新数据
   * @param {any} value 更新的值
   * @param {IDBValidKey} [key] 指定有效的key进行更新
   */
  put(value, key) {
    return promiseWrap(this.store.put(value, key), (rs, request) => rs(request.result))
  }

  clear() {
    return promiseWrap(this.store.clear(), rs => rs())
  }
}

/**
 * 打开一个数据库
 * @param {string} name 数据库名称
 * @param {number} version 数据库版本
 * @param {(db: IDBDatabase) => void} upgradeneededCallback 数据库刚链接或者版本升级
 * @returns {Promise<IDBDatabase>}
 */
export function openDB(name, version, upgradeneededCallback) {
  return new Promise((rs, rj) => {
    const request = indexedDB.open(name, version)

    request.addEventListener('success', function() {
      rs(this.result)
    })

    request.addEventListener('error', function() {
      rj(this.error)
    })

    request.addEventListener('upgradeneeded', function() {
      let db = this.result
      upgradeneededCallback && upgradeneededCallback(db)
    })
  })
}
