<script>
export default {
  name: 'ElDndItem',

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    id: {
      type: [String, Number],
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },

  render(h) {
    return h(
      this.tag,
      {
        class: 'el-dnd-item',
        attrs: {
          draggable: true,
          'data-index': this.index
        },

        on: {
          /**
           * @param {DragEvent} e
           */
          drop: e => {

            // this.$emit('change', {
            //   from: e.dataTransfer.getData('from'),
            //   to: this.id
            // })
          },

          dragenter: e => {
            console.log(e)
          }
        }
      },
      this.$slots.default
    )
  }
}
</script>
