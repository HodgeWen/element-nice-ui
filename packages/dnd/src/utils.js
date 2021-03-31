
/**
 * 获取dom元素矩形数据
 * @param {HTMLElement} dom
 */
export function getDomRect(dom) {
  return dom.getBoundingClientRect()
}

/**
 * 获取dom元素矩形数据
 * @param {HTMLElement} dom 拷贝的元素
 * @param {number} left 到屏幕的左边距
 * @param {HTMLElement} top 到屏幕的上边距
 */
export function cloneDraggingNode(dom, left, top) {
  /** @type {HTMLElement} */
  const clonedNode = dom.cloneNode(true)

  const cloneBox = document.createElement('div')
  cloneBox.appendChild(clonedNode)

  /** @type {CSSStyleSheet} */
  const styles = {
    zIndex: 999,
    boxSizing: 'border-box',
    position: 'fixed',
    top: '0',
    left: '0',
    transform: `translate3d(${left}px, ${top}px, 0)`,
    userSelect: 'none',
    pointerEvents: 'none'
  }

  Object.keys(styles).forEach(key => cloneBox.style[key] = styles[key])

  return cloneBox
}