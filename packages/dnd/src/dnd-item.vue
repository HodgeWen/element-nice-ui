<script>
export default {
  name: 'ElDndItem',

  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },

  render(h) {
    return h(
      this.tag,
      {
        domProps: {
          draggable: true
        },

        on: {
          drag: e => {},

          dragend: e => {
            // console.log(e)
          },
          /**
           * 开始事件
           * @param {DragEvent} e
           */
          dragstart: e => {
            // e.target.style.visible = false
            // console.log(e)
            // e.dataTransfer.setData('text/plain')
            // e.dataTransfer.effectAllowed = "move"

          },


        }
      },
      this.$slots.default
    )
  }
}
</script>
