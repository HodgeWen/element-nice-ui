<script>
export default {
  name: "ElPageAnchor",

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    title: String
  },

  inject: ['elPage'],

  data: () => ({

  }),

  render(h) {
    return h(this.tag, [this.title].concat(this.$slots.default))
  },

  mounted() {
    this.elPage.addAnchor({
      title: this.title || '锚点',
      top: this.$el.getBoundingClientRect().top
    })
  },

  beforeDestroy() {

  }
}
</script>