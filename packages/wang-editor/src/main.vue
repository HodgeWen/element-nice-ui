<template>
  <div class="el-wang-editor" ref="editor"></div>
</template>

<script>
import Editor from 'wangeditor'

export default {
  name: 'ElWangEditor',

  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object
    }
  },

  data: () => ({
    _editor: null
  }),

  watch: {
    value: {
      immediate: true,
      async handler(v) {
        await this.$nextTick()
        this.$data._editor.txt.html(v)
      }
    }
  },

  methods: {
    init() {
      const editor = new Editor(this.$refs.editor)

      Object.assign(editor.config, this.config)

      editor.config.onchange = v => this.$emit('input', v)

      editor.create()

      this.$data._editor = editor
    }
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    this.$data._editor?.destroy()
    this.$data._editor = null
  }
}
</script>
