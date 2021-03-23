<script>
export default {
  name: 'ElDnd',

  props: {
    tag: {
      default: 'div',
      type: String
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
        on: {
          dragenter: e => {

          },

          dragleave: e => {

          },

          dragover: e => {
            e.preventDefault()
          },

          drop: e => {
            // console.log(e)
          },

          dragstart: e => {
            console.log(e)
          }

        }
      },
      this.$slots.default
    )
  }
}
</script>
