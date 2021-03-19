import Modeler from '../bpmn-js/Modeler'
import customPalette from './customPalette'

export default function CustomModeler(options) {
  Modeler.call(this, options)

  this._customElements = []
}

CustomModeler.super_ = Modeler
CustomModeler.prototype = Object.create(Modeler.prototype, {
  constructor: {
    value: CustomModeler,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

CustomModeler.prototype._modules.push(customPalette)

