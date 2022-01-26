/**
 * @typedef {Object} LineConfig
 * @property {[number, number][]}  path 路径
 * @property { Record<string, any> } style 线的样式
 */

/**
 * @typedef {Object} ManyLineConfig
 * @property {[number, number][][]}  lines 线段路径集合
 * @property { Record<string, any> } style 线的样式
 */

/**
 * @typedef {Object} GridConfig
 * @property {number}  left 网格左起点
 * @property {number}  top 网格上起点
 * @property {number}  colGap 列间距
 * @property {number}  rowGap 行间距
 * @property {number}  rowNumber 行数量
 * @property {number}  colNumber 列数量
 * @property { Record<string, any> } style 线的样式
 */

import { loop } from './utils'


export class Canvas {
  /** @type {CanvasRenderingContext2D}  */
  ctx = null

  constructor(dom) {
    /** @type {HTMLCanvasElement} */
    let canvas = null
    if (typeof dom === 'string') {
      canvas = document.getElementById(id)
    } else if (dom instanceof HTMLCanvasElement) {
      canvas = dom
    } else {
      throw new Error('没有传入canvas实例')
    }

    let ctx = canvas.getContext('2d')
    this.ctx = ctx
    let properties = {}
    for (let key in ctx) {
      if (typeof ctx[key] === 'function') {
        Canvas.prototype[key] = ctx[key]
      } else {
        properties[key] = {
          get() {
            return ctx[key]
          },
          set(v) {
            ctx[key] = v
          }
        }
      }
    }

    let proto = ctx.constructor.prototype
    Object.keys(proto).forEach(key => {
      if (typeof ctx[key] !== 'function') return
      Canvas.prototype[key] = function(...args) {
        ctx[key](...args)
      }
    })

    Object.defineProperties(this, properties)
  }

  /**
   * 绘制单个线段
   * @param {LineConfig} config
   */
  drawLine(config) {
    const { ctx } = this
    const { path, style } = config



    if (path.length < 2) {
      throw new Error(`path的路径最少应该有2个`)
    }

    this.beginPath()
    this.moveTo(...path[0])
    path.slice(1).forEach(([x, y]) => {
      ctx.lineTo(x, y)
    })

    if (style) {
      Object.keys(style).forEach(key => {
        ctx[key] = style[key]
      })
    }

    ctx.stroke()
  }

  /**
   *  绘制多个线段
   * @param {ManyLineConfig} config
   */
  drawManyLine(config) {
    const { ctx } = this
    const { lines, style } = config

    if (style) {
      Object.keys(style).forEach(key => {
        this[key] = style[key]
      })
    }

    lines.forEach(line => {
      ctx.beginPath()
      ctx.moveTo(...line[0])
      line.slice(1).forEach(([x, y]) => {
        ctx.lineTo(x, y)
      })
      ctx.stroke()
    })
  }

  /**
   * 绘制网格
   * @param { GridConfig } config 网格配置
   */
  drawGrid(config) {
    const { style, left, top, rowGap, colGap, rowNumber, colNumber } = config

    // 横线 y相等, x改变,  top声明起点
    let leftEnd = left + colGap * colNumber
    let horizontalLines = loop(rowNumber + 1, (n, i) => {
      let lineTop = top + rowGap * i
      return [
        [left, lineTop],
        [leftEnd, lineTop]
      ]
    })
    this.drawManyLine({
      lines: horizontalLines,
      style
    })

    // 竖线 x相等, left起点,
    let topEnd = top + rowGap * rowNumber // 结束等于横线数量乘以y间隔
    let verticalLines = loop(colNumber + 1, (n, i) => {
      let lineLeft = left + colGap * i
      return [
        [lineLeft, top],
        [lineLeft, topEnd]
      ]
    })
    this.drawManyLine({
      lines: verticalLines
    })
  }
}
