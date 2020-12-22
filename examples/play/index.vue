<template>
  <div>
    <el-table
      :headers="headers"
      pagination
      :crud="{
        update: () => {},
        create: () => {}
      }"
    >
      <template #tools>

      </template>

      <template #searcher>
        <el-btn>aaa</el-btn>
      </template>
    </el-table>
    <el-icon name="setting" />
    <el-icon name="user" />

    <el-dialog v-model="visible">
      11
    </el-dialog>

    <el-context :ctx="{ size: 'small' }">
      <template>
        <el-btn icon="setting" @click="visible = true">按钮</el-btn>
        <el-btn>按钮1</el-btn>
        <el-btn>按钮2</el-btn>
      </template>
    </el-context>
  </div>
</template>

<script>
import 'packages/theme-chalk/src/base.scss'
import 'packages/theme-chalk/src/table.scss'
import ElTable from 'packages/table'
import ElIcon from 'packages/icon'
import 'packages/theme-chalk/src/icon.scss'
import ElDialog from 'packages/dialog'
import 'packages/theme-chalk/src/dialog.scss'
import ElBtn from 'packages/btn'
import 'packages/theme-chalk/src/btn.scss'
import ElContext from 'packages/context'
export default {
  components: {
    ElIcon,
    ElDialog,
    ElContext,
    ElBtn,
    ElTable
  },
  data() {
    return {
      headers: [
        { type: 'selection' },
        {
          label: '你好啊',
          prop: 'hello'
        },
        { label: '你好啊2', prop: 'b.c' }
      ],

      data: [{ hello: 'aa', b: { c: '1' } }],

      visible: false
    }
  },

  methods: {},

  mounted() {
    setTimeout(() => {
      this.show = true
    }, 5000)
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
  padding: 0;
}

.aaa {
  height: 100%;
  width: 200px;
  margin: 0;
  padding: 0;
}
</style>
