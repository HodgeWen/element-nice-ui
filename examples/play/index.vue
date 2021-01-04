<template>
  <div style="height: 100%">
    <!-- query-label-width: 所有的query元素的label宽度, 默认50 -->
    <el-table
      :headers="headers"
      api="aa"
      :query="query"
      stripe
      row-key="id"
      border
      query-label-width="60"
    >
      <template #tools>
        <!-- <el-btn @click="selected = null">清除</el-btn> -->
        <el-popconfirm>
          <el-btn>你好啊</el-btn>
        </el-popconfirm>
        <el-btn type="primary" @click="visible = true">新增</el-btn>
        <el-btn :disabled="selected && selected.length">删除</el-btn>
      </template>

      <template #column.action>
        <el-action-item>操作</el-action-item>
      </template>

      <template #searcher>
        <el-input v-model="query.name" t-label="名称" />
        <el-input v-model="query.age" t-label="年龄" />
        <el-select v-model="query.test" option-label="label1" t-label="测试" api="select" />
      </template>

      <template #outer>
        <el-dialog v-model="visible">
          <el-form :colspan="24" :model="form" :rules="formRules" size="small" label-width="60px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-form>
        </el-dialog>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      headers: [
        { label: '名称', prop: 'name' },
        { label: '图标', prop: 'icon' },
        { label: '排序', prop: 'sort' },
        { label: '路由地址', prop: 'path' },
        { label: '类型', prop: 'type' },
        { label: '类型', prop: 'type' },
        { label: '权限表示', prop: 'permission' }
        // { label: '操作', type: 'action', fixed: 'right', width: 150, slotName: 'action' }
      ],

      query: {
        name: 'a',
        age: 20,
        select: null
      },

      data: [],

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

  mounted() {}
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
