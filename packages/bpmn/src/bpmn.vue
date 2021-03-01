<template>
  <div class="el-bpmn">
    <!-- 顶部工具 start -->
    <section class="el-bpmn__tools">
      <el-context :ctx="{ size: 'mini' }" :depth="2">
        <el-btn-group class="el-bpmn__btn-group">
          <el-btn @click="onHistoryChange('back')">
            撤销
          </el-btn>
          <el-btn @click="onHistoryChange('forward')">
            恢复
          </el-btn>
          <el-btn @click="onClear">清空</el-btn>
        </el-btn-group>

        <el-btn-group class="el-bpmn__btn-group">
          <el-btn @click="onZoom('out')">缩小</el-btn>
          <el-btn @click="onZoom('in')">放大</el-btn>
          <el-btn @click="onZoom('reset')">还原</el-btn>
        </el-btn-group>

        <el-btn-group class="el-bpmn__btn-group">
          <el-btn @click="onImport">导入流程文件</el-btn>
          <el-btn @click="saveAsSVG">保存为图片</el-btn>
          <el-btn @click="saveAsXML">下载流程文件</el-btn>
        </el-btn-group>

        <el-btn-group class="el-bpmn__btn-group">
          <el-btn @click="onValidate">错误校验</el-btn>
          <el-btn @click="onSave">保存</el-btn>
          <el-btn @click="onSaveAndPublish">保存并发布</el-btn>
        </el-btn-group>

        <el-btn @click="tipDialogVisible = true">提示</el-btn>
      </el-context>
    </section>
    <!-- 顶部工具 end -->

    <!-- 属性面板 start -->
    <section class="el-bpmn__prop-panel">

    </section>
    <!-- 属性面板 end -->

    <section class="el-bpmn__canvas" ref="canvas"></section>

    <el-dialog title="使用教程" v-model="tipDialogVisible"></el-dialog>
  </div>
</template>

<script>
import BpmnModeler from './bpmn-modeler.development'
import customTranslate from './translate'
import customPalette from './customPalette'
import ElBtn from 'element-nice-ui/packages/btn'
import ElBtnGroup from 'element-nice-ui/packages/btn-group'
import ElContext from 'element-nice-ui/packages/context'
import ElDialog from 'element-nice-ui/packages/dialog'

export default {
  name: 'ElBpmn',

  components: {
    ElBtn,
    ElContext,
    ElBtnGroup,
    ElDialog
  },

  props: {
    xml: String
  },

  data: () => ({
    modeler: null,

    tipDialogVisible: false,

    history: 0, // 历史记录总条数

    historyPoint: 0 // 历史记录指针
  }),

  methods: {
    addHistory() {},

    addModelerListener() {
      const { modeler } = this
      if (!modeler) return

      // 获取当前图形是啥
      const getShape = e => {
        const elementRegistry = modeler.get('elementRegistry')
        return e.element ? elementRegistry.get(e.element.id) : e.shape
      }

      modeler.on('shape.added', e => {
        const shape = getShape(e)
        console.log(modeler.get('commandStack'), 11)
      })

      modeler.on('shape.move.end', e => {
        const shape = getShape(e)
      })

      modeler.on('shape.removed', e => {
        const shape = getShape(e)
      })
    },

    addElementListener() {
      const { modeler } = this
      if (!modeler) return

      const eventBus = modeler.get('eventBus')

      eventBus.on('element.click', e => {})

      eventBus.on('element.changed', e => {})

      eventBus.on('selection.changed', e => {})
    },

    init() {
      const container = this.$refs.canvas
      if (!container) return

      this.modeler = new BpmnModeler({
        container,
        additionalModules: [
          {
            translate: ['value', customTranslate],
            customPalette: ['type', customPalette],
            __init__: ['customPalette']
          }
        ]
      })

      this.addModelerListener()
      this.addElementListener()

      // this.adjustPalette()

      this.xml && this.draw(this.xml)
    },

    draw(xml) {
      this.modeler && this.modeler.importXML(xml)
    },

    // 保存为BPMN文件
    saveAsXML() {
      if (this.modeler) {
        return this.modeler
          .saveXML({ format: true })
          .then(res => {
            this.downloadFile(`流程文件.xml`, res.xml, 'application/xml')
          })
          .catch(err => {
            console.error(err)
          })
      }
    },

    // 保存为SVG文件
    saveAsSVG() {
      if (!this.modeler) return
      this.modeler
        .saveSVG()
        .then(res => {
          this.downloadFile('流程图.svg', res.svg, 'image/svg+xml')
        })
        .catch(err => {
          console.log(err)
        })
    },

    downloadFile(name, data, type) {
      var a = document.createElement('a')
      var url = URL.createObjectURL(new Blob([data], { type }))
      a.href = url
      a.download = name
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    },

    /** 校验错误 */
    onValidate() {},

    /** 数据保存 */
    onSave() {
      this.modeler && this.modeler.saveXML({ format: true }).then(res => {
        this.$emit('save', res.xml)
      }).catch(err => {
        console.error(err)
      })

    },

    /** 保存并发布 */
    async onSaveAndPublish() {
      this.modeler && this.modeler.saveXML({ format: true }).then(res => {
        this.$emit('save-and-publish', res.xml)
      }).catch(err => {
        console.error(err)
      })
    },

    /** in 放大 /  out 缩小 / reset 还原 */
    onZoom(type) {
      const { modeler } = this
      if (!modeler) return

      const zoomScroll = modeler.get('zoomScroll')

      if (type === 'in') return zoomScroll.stepZoom(1)
      if (type === 'out') return zoomScroll.stepZoom(-1)
      if (type === 'reset') return zoomScroll.reset()
    },

    /** back 撤销 / forward 前进 */
    onHistoryChange(type) {
      const { modeler } = this
      if (!modeler) return

      const commandStack = modeler.get('commandStack')

      if (type === 'back') return commandStack.undo()
      if (type === 'forward') return commandStack.redo()
    },

    onClear() {
      this.modeler && this.modeler.clear()
    },

    /** 导入 */
    onImport() {},

  },

  mounted() {
    this.init()
  }
}
</script>
