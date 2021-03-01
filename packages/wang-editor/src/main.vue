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

  methods: {
    init() {
      const editor = new Editor(this.$refs.editor)

      Object.assign(editor.config, this.config)

      editor.config.onchange = (v) =>  this.$emit('input', v)

      editor.create()

      this.editor = editor
    }
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    this.editor.destroy()
    this.editor = null
  }
}
</script>
