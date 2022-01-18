/**
 * @typedef {Object} LineConfig
 * @property {[number, number][]}  path 路径
 * @property { string } stroke 线的样式
 */

class Canvas {
  /** @type {CanvasRenderingContext2D}  */
  ctx = null

  constructor(id) {
    /** @type {HTMLCanvasElement} */
    let canvas = document.getElementById(id)
    this.ctx = canvas.getContext('2d')
  }

  /**
   *
   * @param {LineConfig} config
   */
  drawLine(config) {
    const { ctx } = this
    const { path, stroke } = config

    if (path.length < 2) {
      throw new Error(`path的路径最少应该有2个`)
    }

    ctx.beginPath()
    ctx.moveTo(...path[0])
    path.slice(1).forEach(([x, y]) => {
      ctx.lineTo(x, y)
    })

    if (stroke) {
      ctx.strokeStyle = stroke
      ctx.stroke()
    }
  }
}

const canvas = new Canvas('#canvas')

canvas.drawLine({
  path: [
    [30, 40],
    [30, 80]
  ],
  stroke: 'stroke'
})
