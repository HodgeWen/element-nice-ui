export function isDef(val) {
  return val !== undefined && val !== null
}
export function isKorean(text) {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi
  return reg.test(text)
}

export function extendQuery(origin, target) {
  if (!origin || !target) return

  Object.keys(origin).forEach((key) => {
    let v = target[key]
    if (v !== undefined) {
      origin[key] = (typeof origin[key] === 'number' && v !== '') ? +v : v
    }
  })
}

export function getUrlSearchObj() {
  try {
    const body = location.search
      .replace(/^\?/, '')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
    return body ? JSON.parse('{"' + decodeURIComponent(body) + '"}') : {}
  } catch(err) {
    console.warn('数据格式应满足 "key=value&key1=value1" 格式')
    return {}
  }
}

export function historyReplace(query) {
  let ret = ''
  Object.keys(query).forEach(key => {
    if (query[key] === undefined) {
      return ret += `${key}=&`
    }
    ret += `${key}=${encodeURIComponent(query[key])}&`
  })

  history.replaceState({}, '', location.pathname + `?${ret.slice(0, -1)}`)
}

// 遍历树形节点, 如果该节点有子节点则遍历
export function walkTreeNode(root, cb, childrenKey = 'children') {
  const notEmpty = (array) => Array.isArray(array) && array.length

  function _walker(parent, children, level) {
    cb(parent, children, level)

    if (!notEmpty(children)) return

    children.forEach((item) => _walker(item,  item[childrenKey], level + 1))
  }

  root.forEach((item) => _walker(item, item[childrenKey], 0))
}