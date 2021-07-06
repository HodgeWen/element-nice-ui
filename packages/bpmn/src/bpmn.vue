<template>
  <div class="el-bpmn">
    <!-- bpmn画布 start -->
    <section class="el-bpmn__canvas" ref="canvas"></section>
    <!-- bpmn画布 end -->

    <!-- 顶部工具 start -->
    <section class="el-bpmn__tools">
      <el-context :ctx="{ size: 'mini' }" :depth="2">
        <el-btn-group class="el-bpmn__btn-group">
          <el-btn icon="back" title="上一步" @click="onHistoryChange('back')">
            <!-- 撤销 -->
          </el-btn>
          <el-btn icon="right" title="下一步" @click="onHistoryChange('forward')">
            <!-- 恢复 -->
          </el-btn>
          <el-btn icon="delete" title="清空" @click="onClear"></el-btn>
        </el-btn-group>

        <el-btn-group class="el-bpmn__btn-group">
          <el-btn @click="onImport">导入流程文件</el-btn>
          <el-btn @click="saveAsSVG">保存为图片</el-btn>
          <el-btn @click="saveAsXML">下载流程文件</el-btn>
        </el-btn-group>

        <el-btn-group class="el-bpmn__btn-group">
          <el-btn @click="onValidate">流程校验</el-btn>
          <el-btn @click="onSave">保存</el-btn>
          <el-btn @click="onSaveAndPublish">保存并发布</el-btn>
        </el-btn-group>

        <el-btn @click="tipDialogVisible = true">教程</el-btn>
      </el-context>
    </section>
    <!-- 顶部工具 end -->

    <!-- 缩放工具 start -->
    <section class="el-bpmn__scale-tools">
      <el-btn size="mini" circle icon="aim" @click="zoom('reset')"></el-btn>
      <el-btn size="mini" circle icon="minus" @click="zoom('out')"></el-btn>
      <el-btn size="mini" circle icon="plus" @click="zoom('in')"></el-btn>
    </section>
    <!-- 缩放工具 end -->

    <!-- 属性面板 start -->
    <el-prop-panel ref="propPanel" />
    <!-- 属性面板 end -->

    <el-dialog title="使用教程" v-model="tipDialogVisible"></el-dialog>
  </div>
</template>

<script>
import BpmnModeler from './custom/customModeler'
import customTranslate from './translate'
import ElBtn from 'element-nice-ui/packages/btn'
import ElBtnGroup from 'element-nice-ui/packages/btn-group'
import ElContext from 'element-nice-ui/packages/context'
import ElDialog from 'element-nice-ui/packages/dialog'
import ElPropPanel from './prop-panel.vue'
import customColor from './custom/customColor'

export default {
  name: 'ElBpmn',

  components: {
    ElBtn,
    ElContext,
    ElBtnGroup,
    ElDialog,
    ElPropPanel
  },

  props: {
    xml: String
  },

  data: () => ({
    modeler: null,

    modeling: null,

    tipDialogVisible: false
  }),

  methods: {
    /** 初始化 */
    init() {
      const container = this.$refs.canvas
      if (!container) return

      const modeler = new BpmnModeler({
        container,
        additionalModules: [customTranslate]
      })

      this.modeler = modeler
      this.modeling = modeler.get('modeling')

      this.addModelerListener()

      this.xml && this.draw(this.xml)
    },

    /** 添加模型事件 */
    addModelerListener() {
      const { modeler } = this
      if (!modeler) return
      console.log(modeler)
      const eventBus = modeler.get('eventBus')
      Object.keys(eventBus._listeners).forEach(key => {
        if (key.includes('context')) {
          // console.log(key)
        }
      })

      // 获取当前图形类型
      const getShape = e => {
        const elementRegistry = modeler.get('elementRegistry')
        return e.element ? elementRegistry.get(e.element.id) : e.shape
      }

      modeler.on('shape.added', e => {
        this.setColor(e.element)
      })

      modeler.on('connection.added', e => {
        this.setColor(e.element)
      })

      modeler.on('shape.move.end', e => {
        const shape = getShape(e)
        // console.log('shape.move.end')
      })

      modeler.on('shape.removed', e => {
        const shape = getShape(e)
        // console.log('shape.removed')
      })

      // 选择的节点发生改变
      modeler.on('selection.changed', e => {
        const [shape] = e.newSelection
        // TODO 此处 应当获取所有的shape
        if (!shape) return
        this.$refs.propPanel.render(shape)
      })

      // 元素被点击时发生改变
      modeler.on('element.click', e => {
        if (e.element.type === 'bpmn:Process') {
          this.$refs.propPanel.hide()
        }
      })

      // 发生改变的节点
      modeler.on('element.changed', e => {
        // 更新属性面板的节点信息
        if (this.$refs.propPanel.visible && e.element.type === 'label') {
          this.$refs.propPanel.updateNodeInfo(e.element.businessObject)
        }
      })
    },

    /** 获取每个元素的大类别 */
    getType(type) {
      if (['bpmn:StartEvent', 'bpmn:EndEvent'].includes(type)) return type
      return ['Event', 'Gateway', 'Task'].find(_type => {
        return !!type.match(_type)
      })
    },

    /** 设置不同元素的颜色 */
    setColor(element) {
      const type = this.getType(element.type === 'label' ? element.labelTarget.type : element.type)
      this.$nextTick(() => {
        this.modeling.setColor(element, customColor[type] || customColor.default)
      })
    },

    /** 绘制 */
    draw(xml) {
      this.modeler && this.modeler.importXML(xml)
    },

    /** 保存为xml文件 */
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

    /** 保存为SVG图片 */
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

    /** 下载文件 */
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

    /** 保存回调 */
    save(callback) {
      this.modeler &&
        this.modeler
          .saveXML({ format: true })
          .then(callback)
          .catch(err => {
            console.error(err)
          })
    },

    /** 数据保存 */
    onSave() {
      this.save(res => this.$emit('save', res.xml))
    },

    /** 保存并发布 */
    onSaveAndPublish() {
      this.save(res => this.$emit('save-and-publish', res.xml))
    },

    /** in 放大 /  out 缩小 / reset 还原 */
    zoom(type) {
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
    onImport() {}
  },

  mounted() {
    this.init()
  }
}
</script>
