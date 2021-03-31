<script>
import { cloneDraggingNode } from './utils'
export default {
  name: 'ElDnd',

  props: {
    tag: {
      default: 'div',
      type: String
    }
  },

  data: () => ({
    domNode: null,

    offsetX: 0,
    offsetY: 0,

    originX: 0,
    originY: 0
  }),

  methods: {
    /**
     * @param {DragEvent} e
     */
    onDragStart(e) {
      const dt = e.dataTransfer

      var img = new Image()
      img.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E"
      dt.setData('text', '')
      dt.setData('from', e.target.getAttribute('data-index'))
      dt.setDragImage(img, 0, 0)

      // dt.effectAllowed = 'move'

      const dom = e.target
      const rect = dom.getBoundingClientRect()

      this.offsetX = e.clientX - rect.left
      this.offsetY = e.clientY - rect.top

      this.originX = rect.left
      this.originY = rect.top

      this.domNode = cloneDraggingNode(dom, rect.left, rect.top)
      document.body.appendChild(this.domNode)
    },
    /**
     * @param {DragEvent} e
     */
    onDragEnd(e) {
      console.log('end')
      if (!this.domNode) return
      const handler = ev => {
        document.body.removeChild(this.domNode)
        e.target.style.visibility = 'visible'
        this.domNode.removeEventListener('transitionend', handler)
        this.domNode = null
      }
      this.domNode.addEventListener('transitionend', handler)

      this.domNode.style.transition = 'transform .2s ease-in-out'
      this.domNode.style.transform = `translate3d(${this.originX}px, ${this.originY}px,0)`
    },
    /**
     * @param {DragEvent} e
     */
    onDrag(e) {
      this.domNode.style.transform = `translate3d(${e.clientX - this.offsetX}px, ${e.clientY -
        this.offsetY}px,0)`
      e.target.style.visibility = 'hidden'
    }
  },

  render(h) {
    const { tag } = this
    return h(
      tag,
      {
        class: 'el-dnd',
        domProps: {
          droppable: true
        },
        ref: 'dnd',
        on: {
          /**
           * @param {DragEvent} e
           */
          dragenter: e => {
            // console.log(e)
          },
          /**
           * @param {DragEvent} e
           */
          dragleave: e => {},
          /**
           * @param {DragEvent} e
           */
          dragover: e => {
            e.preventDefault()
          },

          dragend: this.onDragEnd,

          drag: this.onDrag,

          dragstart: this.onDragStart,

          drop: e => {
            if (e.target.getAttribute('data-index')) {
              this.$emit('sort', {
                from: +e.dataTransfer.getData('from'),
                to: +e.target.getAttribute('data-index')
              })
            }
          }
        }
      },
      this.$slots.default
    )
  }
}
</script>
