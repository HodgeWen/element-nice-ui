/**
 * 拷贝拖拽元素
 * @param {HTMLElement} dom 拷贝的元素
 * @param {DOMRect} rect domRect
 */
export function cloneDraggingNode(dom, rect) {
  /** @type {HTMLElement} */
  const clonedNode = dom.cloneNode(true)

  const clonedBox = document.createElement('div')
  clonedBox.appendChild(clonedNode)

  /** @type {CSSStyleSheet} */
  const styles = {
    zIndex: 999,
    boxSizing: 'border-box',
    position: 'fixed',
    top: '0',
    left: '0',
    width: rect.width + 'px',
    height: rect.height + 'px',
    transform: `translate3d(${rect.left}px, ${rect.top}px, 0)`,
    userSelect: 'none',
    pointerEvents: 'none'
  }
  Object.keys(styles).forEach(key => (clonedBox.style[key] = styles[key]))

  return clonedBox
}

export class Draggor {
  /** @type { HTMLElement | null } */
  dragBox = null

  /** 拖拽图片队列 */
  draggingImageQueue = []

  /** 当前拖拽的元素的索引 */
  currentDraggerIndex = -1

  /** 当前覆盖的元素的索引 */
  currentOver = -1

  constructor(container, options) {
    if (typeof container === 'string') {
      this.dragBox = document.querySelector(container)
    } else if (container instanceof HTMLElement) {
      this.dragBox = container
    }

    this.init()

    Object.keys(options).forEach(key => {
      this[key] = options[key]
    })
  }

  get lastDragImage() {
    return this.draggingImageQueue[this.draggingImageQueue.length - 1]
  }

  /**
   * 开始拖拽
   * @param {DragEvent} e 拖拽开始事件
   */
  onDragStart = e => {
    this.beautifyDraggingImage(e)

    const index = e.target.getAttribute('data-index')
    this.currentDraggerIndex = index

    e.dataTransfer.setData('from', index)
  }

  /**
   * 拖拽事件
   * @param {DragEvent} e
   */
  onDrag = e => {
    const { dom, offsetX, offsetY } = this.lastDragImage
    dom.style.transform = `translate3d(${e.clientX - offsetX}px, ${e.clientY - offsetY}px,0)`
    e.target.style.visibility = 'hidden'
  }

  /**
   * 结束拖拽
   * @param {DragEvent} e 拖拽结束事件
   */
  onDragEnd = e => {
    const { dom, rect } = this.draggingImageQueue.shift()
    const handler = ev => {
      document.body.removeChild(dom)
      e.target.style.visibility = 'visible'
      this.dragEnd && this.dragEnd()
      dom.removeEventListener('transitionend', handler)
    }

    dom.addEventListener('transitionend', handler)

    dom.style.transition = 'transform .2s ease-in-out'
    dom.style.transform = `translate3d(${rect.left}px, ${rect.top}px,0)`
  }

  /**
   * @param {DragEvent} e 拖拽结束事件
   */
  onDragOver(e) {
    e.preventDefault()
  }

  onDrop = e => {
    const dataIndex = e.target.getAttribute('data-index')

    if (!dataIndex) return
    this.drop &&
      this.drop({
        from: +e.dataTransfer.getData('from'),
        to: +dataIndex
      })
  }

  /**
   * 进入拖拽元素
   * @param {DragEvent} e
   */
  onDragEnter = e => {
    const draggerItem = e.target.closest("[draggable='true']")
    const { rect } = this.lastDragImage

  }

  /**
   * 美化拖拽图片
   * @param {DragEvent} e
   */
  beautifyDraggingImage(e) {
    const dt = e.dataTransfer

    const img = new Image()
    img.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E"
    dt.setDragImage(img, 0, 0)

    /** @type { HTMLElement } */
    const originDom = e.target

    const rect = originDom.getBoundingClientRect()
    const clonedDom = cloneDraggingNode(originDom, rect)

    const offsetX = e.clientX - rect.left,
      offsetY = e.clientY - rect.top

    this.draggingImageQueue.push({
      offsetX,
      offsetY,
      rect,
      dom: clonedDom
    })

    document.body.appendChild(clonedDom)
  }

  addEvent() {
    const { dragBox } = this

    const eventAndHandlers = [
      'onDragStart',
      'onDrag',
      'onDragOver',
      'onDragEnter',
      'onDragEnd',
      'onDrop'
    ]

    eventAndHandlers.forEach(eventName => {
      dragBox.addEventListener(eventName.slice(2).toLowerCase(), this[eventName])
    })
  }

  init() {
    this.addEvent()
  }
}
