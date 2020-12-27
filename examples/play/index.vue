<template>
  <div style="height: 100%">
    <!-- query-label-width: 所有的query元素的label宽度, 默认50 -->
    <el-table
      size="medium"
      :headers="headers"
      api="aa"
      pagination
      query-label-width="60"
    >
      <template #tools>
        <el-btn type="primary" @click="visible = true">新增</el-btn>
      </template>

      <template #searcher>
        <!--
          s-label 给一个label名称并生成一个label元素,
          s-label-width label元素的宽度,
          s-width 整个 query项的宽度
        -->
        <el-input t-label="名称" />
        <el-input t-label="很长很长的名称" t-label-width="110" t-width="300" />
      </template>
    </el-table>

    <el-icon name="setting" />
    <el-icon name="user" />

    <!--
      不需要手动验证, 只要是在dialog下的所有form都可以在确认的时候自动验证,
      传入一个confirm方法就会显示确认弹框
    -->
    <el-dialog v-model="visible" :confirm="onConfirm">

      <!--
        用法 demo
        一旦将表单元素置于 el-form 中, 那么 el-form 就会直接接管这些元素
        原来必须包裹表单元素的el-form-item 对开发者而言会隐藏
        trigger 指定表单验证的触发方式
       -->
      <el-form :model="form" trigger="blur" label-width="60px">
        <el-input t-label="姓名" t-span="12" t-prop='name' />
        <el-input t-label="身高" t-prop='height' />
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
          prop: 'hello'
        },
        { label: '你好啊2', prop: 'b.c' }
      ],

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
        name: {
          value: '',
          trigger: 'blur',
          required: '姓名是必填的'
        },

        height: null
      },

      rules: {
        aa: [{ required: true, message: '不能为空' }]
      }
    }
  },

  watch: {
    'form.height' (v) {
      console.log(v)
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
  background: #f2f2f2;
}

.aaa {
  height: 100%;
  width: 200px;
  margin: 0;
  padding: 0;
}
</style>
