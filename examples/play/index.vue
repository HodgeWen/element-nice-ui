<template>
  <div style="height: 100%">
    <!-- query-label-width: 所有的query元素的label宽度, 默认50 -->
    <el-table
      size="small"
      :headers="headers"
      api="aa"
      :query="query"
      :data="data"
      pagination
      :auto-queried="['name', 'age']"
      query-label-width="60"
    >
      <template #column.aa="{ value }">
        <span>{{ value }}</span>
      </template>
      <template #tools>
        <el-btn type="primary" @click="visible = true">新增</el-btn>
        <el-btn @click="query.name += 'a'">改变name</el-btn>
        <el-btn @click="query.age++">改变age</el-btn>
        <el-btn @click="query.name += 'a';query.age++">改变name+age</el-btn>
      </template>

      <template #searcher>
        <!--
          s-label 给一个label名称并生成一个label元素,
          s-label-width label元素的宽度,
          s-width 整个 query项的宽度
        -->
        <el-input v-model="query.name" t-label="名称" />
        <el-input v-model="query.age" t-label="年龄" t-width="300" />
      </template>
    </el-table>

    <el-icon name="setting" />
    <el-icon name="user" />

    <!--
      不需要手动验证, 只要是在dialog下的所有form都可以在确认的时候自动验证,
      传入一个confirm方法就会显示确认弹框
    -->
    <el-dialog v-model="visible" :confirm="onConfirm">
      <el-form :colspan="24" :model="form" :rules="formRules" size="small" label-width="60px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="身高" prop="height">
          <el-input v-model="form.height" />
        </el-form-item>
      </el-form>
    </el-dialog>
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
          prop: 'hello',
          slotName: 'aa'
        },
        { label: '你好啊2', prop: 'b.c' }
      ],

      query: {
        name: 'a',
        age: 20
      },

      data: [
        { hello: 'aa', b: { c: '1' } },
        { hello: 'aa', b: { c: '1' } },
        { hello: 'aa', b: { c: '1' } },
        { hello: 'aa', b: { c: '1' } },
        { hello: 'aa', b: { c: '1' } },
        { hello: 'aa', b: { c: '1' } }
      ],

      visible: false,

      form: {
        name: '',

        height: null
      },

      formRules: {
        name: [{ required: true, message: '不能为空' }]
      }
    }
  },


  methods: {
    onConfirm() {
      return new Promise((res) => {
        setTimeout(() => {
          console.log(11)
          res(true)
        }, 2000)
      })
    }
  },

  mounted() {

  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
  padding: 0;
  background: #f2f2f2;
}

.aaa {
  height: 100%;
  width: 200px;
  margin: 0;
  padding: 0;
}
</style>
