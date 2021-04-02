class CustomPalette {
  static $inject = ['bpmnFactory', 'create', 'elementFactory', 'palette', 'lassoTool']

  constructor(bpmnFactory, create, elementFactory, palette, lassoTool) {
    this.bpmnFactory = bpmnFactory
    this.create = create
    this.elementFactory = elementFactory
    this.lassoTool = lassoTool

    palette.registerProvider(this)
  }

  createElementHandler(type, name) {
    const { bpmnFactory, elementFactory, create } = this
    type = 'bpmn:' + type
    return event => {
      const businessObject = bpmnFactory.create(type, {
        name
      })
      const shape = elementFactory.createShape({
        type,
        businessObject
      })

      create.start(event, shape)
    }
  }

  /**
   * 创建组
   * @param {string} group 组名
   * @param {Array<string []>} elements 元素
   */
  createGroup(group, elements) {
    let ret = {}

    elements.forEach(([eleType, eleIcon, title]) => {
      const handler = this.createElementHandler(eleType, title)
      ret[`${eleType}`] = {
        group,
        className: 'bpmn-icon-' + eleIcon,
        title,
        action: {
          dragstart: handler,
          click: handler
        }
      }
    })
    return ret
  }

  /** 生成左侧图形面板 */
  getPaletteEntries(element) {
    const { elementFactory, create, bpmnFactory } = this

    /** 创建子流程 */
    function createSubprocess(event) {
      const subProcess = elementFactory.createShape({
        type: 'bpmn:SubProcess',
        x: 0,
        y: 0,
        isExpanded: true
      })
      const businessObject =  bpmnFactory.create('bpmn:StartEvent', {
        name: '开始事件'
      })
      const startEvent = elementFactory.createShape({
        type: 'bpmn:StartEvent',
        x: 40,
        y: 82,
        parent: subProcess,
        businessObject
      })

      create.start(event, [subProcess, startEvent], {
        hints: {
          autoSelect: [startEvent]
        }
      })
    }

    return {
      'lasso-tool': {
        group: 'tools',
        className: 'bpmn-icon-lasso-tool',
        title: '套索工具',
        action: {
          click: event => {
            this.lassoTool.activateSelection(event)
          }
        }
      },
      'tool-separator': {
        group: 'tools',
        separator: true
      },

      ...this.createGroup('shape', [
        // [类型, 图标, 标题]
        ['Task', 'task', '任务'],
        ['StartEvent', 'start-event-none', '开始事件'],
        ['EndEvent', 'end-event-none', '结束事件'],
        ['EndEvent', 'end-event-none', '结束事件'],
        ['Gateway', 'gateway-none', '网关'],
        ['DataObjectReference', 'data-object', '数据对象'],
        ['DataStoreReference', 'data-store', '数据存储']
      ]),

      'tool-separator2': {
        group: 'shape',
        separator: true
      },
      'create.subprocess-expanded': {
        group: 'other',
        className: 'bpmn-icon-subprocess-expanded',
        title: '子流程',
        action: {
          dragstart: createSubprocess,
          click: createSubprocess
        }
      }
    }
  }
}

export default {
  __init__: ['paletteProvider'],
  paletteProvider: ['type', CustomPalette]
}
