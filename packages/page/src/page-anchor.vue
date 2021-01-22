<script>
export default {
  name: 'ElPageAnchor',

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    title: {
      type: String,
      default: ''
    }
  },

  inject: ['elPage'],

  computed: {
    rerender() {
      return this.elPage.rerender
    }
  },

  watch: {
    rerender(v) {
      v && this.$destroy()
    }
  },

  render(h) {
    return h(this.tag, [this.title].concat(this.$slots.default))
  },

  mounted() {
    // 开始显示
    if (this.elPage) {
      this.elPage.addAnchor(this.title, this.$el)
    }
  }
}
</script>
