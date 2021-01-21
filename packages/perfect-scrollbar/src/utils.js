const raf = window.requestAnimationFrame || (func => setTimeout(func, 16))

const cubic = {
  easeIn(v) {
    return Math.pow(v, 3)
  },

  easeOut(v) {
    return 1 - Math.pow(1 - v, 3)
  },

  easeInOut(v) {
    return v < 0.5 ? Math.pow(v * 2, 3) / 2 : 1 - Math.pow((1 - v) * 2, 3) / 2
  }
}

/**
 * 滚动函数
 * @param {HTMLElement} container 容器
 * @param {number} target 目标距离
 * @param {number} duration 持续时间
 * @param {'x'|'y'} type 横向或纵向
 * @param {'easeIn'|'easeOut'|'easeInOut'} func 缓动函数
 */
export const scrollTo = (container, target, duration = 500, type = 'y', func = 'easeInOut') => {
  if (!container) return Promise.resolve()

  return new Promise(resolve => {
    let prop = ''
    // 最大可滚动距离
    let max = 0
    if (type === 'x') {
      prop = 'scrollLeft'
      max = container.scrollWidth - container.offsetWidth
    } else {
      prop = 'scrollTop'
      max = container.scrollHeight - container.offsetHeight
    }

    let calc = cubic[func]

    // 当前滚动距离
    const current = container[prop]

    // 总滚动距离
    const len = (target < max ? target : max) - current

    const start = Date.now()
    let progress = 0

    const frame = () => {
      progress = (Date.now() - start) / duration

      if (progress > 1) {
        container[prop] = current + len
        resolve()
      } else {
        container[prop] = current + calc(progress) * len
        raf(frame)
      }
    }
    raf(frame)
  })
}
