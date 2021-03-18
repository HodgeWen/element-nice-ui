// 自定义渲染
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'

const shapeConfig = {
  'bpmn:StartEvent': {
    fill: '#12c2e9',
    stroke: '#12c2e9'
  },
  'bpmn:UserTask': {
    stroke: '#c471ed',
    strokeWidth: 2
  },
  'bpmn:EndEvent': {
    stroke: '#f64f59',
    fill: '#f64f59'
  },
  'bpmn:ExclusiveGateway': {
    stroke: '#c471ed',
    strokeWidth: 2
  }
}

class CustomRenderer extends BaseRenderer {
  static $inject = ['eventBus', 'bpmnRenderer'] // 依赖注入

  constructor(eventBus, bpmnRenderer) {
    super(eventBus, 1500)

    this.bpmnRenderer = bpmnRenderer
  }

  canRender(element) {
    return !element.labelTarget
  }

  // 绘制图形
  drawShape(parentNode, element) {
    // 绘制图形 生成dom元素
    let shapeDom = this.bpmnRenderer.drawShape(parentNode, element)

    const { type } = element
    Array.prototype.forEach.call(parentNode.childNodes, node => {
      if (node.tagName === 'polygon') return
      // node.style.fill = 'red'
      node.style.stroke = 'red'
    })
    const config = shapeConfig[type]
    if (config) {
      Object.keys(config).forEach(prop => {
        shapeDom.style[prop] = config[prop]
      })
    } else {
      shapeDom.style.stroke = '#c471ed'
    }

    return shapeDom
  }

  drawConnection(parentNode, connection) {
    let connectionDom = this.bpmnRenderer.drawConnection(parentNode, connection)
    // console.log(visuals, connection)
    connectionDom.style.stroke = '#c471ed'
    // this.bpmnRenderer.drawConnection()
    // Array.prototype.forEach.call(visuals.childNodes, node => {
    //   node.style.stroke = '#f64f59'
    // })
    // return visuals
    return connectionDom
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape)
  }
}

export default {
  __init__: ['customRenderer'],
  customRenderer: ['type', CustomRenderer]
}
