<template>
  <div style="padding: 8px">

    <el-table
      :headers="headers"
      pagination
      query-label-width="100"
      :crud="{
        update: () => {},
        create: () => {}
      }"
    >
      <template #tools>
        <el-btn type='primary'>新增</el-btn>
      </template>

      <template #searcher>
        <el-input label="名称" />
        <el-input />
      </template>
    </el-table>
    <el-icon name="setting" />
    <el-icon name="user" />
  </div>
</template>

<script>
// TODO table属性需要添加到json文件中
// import 'packages/theme-chalk/src/base.scss'
// import 'packages/theme-chalk/src/table.scss'
// import ElTable from 'packages/table'
// import ElIcon from 'packages/icon'
// import 'packages/theme-chalk/src/icon.scss'
// import ElDialog from 'packages/dialog'
// import 'packages/theme-chalk/src/dialog.scss'
// import ElBtn from 'packages/btn'
// import 'packages/theme-chalk/src/btn.scss'
// import ElMenu from 'packages/menu'
// import ElMenuItem from 'packages/menu-item'
// import ElSubmenu from 'packages/submenu'
// import 'packages/theme-chalk/src/menu.scss'
// import ElContext from 'packages/context'

export default {
  // components: {
  //   ElIcon,
  //   ElDialog,
  //   ElContext,
  //   ElBtn,
  //   ElTable,
  //   ElMenu,
  //   ElMenuItem,
  //   ElSubmenu
  // },
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
