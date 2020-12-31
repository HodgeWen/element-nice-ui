<template>
  <div style="height: 100%">
    <!-- query-label-width: 所有的query元素的label宽度, 默认50 -->
    <el-table
      :headers="headers"
      api="aa"
      :query="query"
      stripe
      pagination
      query-label-width="60"
      v-model="selected"
      @input="$log"
    >
      <template #column.bb="{ value, row }">
        <el-action-item @click="$log(row)" need-to-confirm>删除</el-action-item>
        <el-action-item @click="$log(row)">查看</el-action-item>
        <el-action-item @click="$log(row)">编辑</el-action-item>
        <el-action-item @click="$log(row)">编辑</el-action-item>
        <el-action-item @click="$log(row)">编辑</el-action-item>
      </template>

      <template #column.name="{ value, row }">
        <el-btn type="text" @click="$log(value)">{{ value }}</el-btn>
      </template>

      <template #tools>
        <!-- <el-btn @click="selected = null">清除</el-btn> -->
        <el-btn type="primary" @click="visible = true">新增</el-btn>
        <el-btn :disabled="selected && selected.length">删除</el-btn>
      </template>

      <template #searcher>
        <!--
          s-label 给一个label名称并生成一个label元素,
          s-label-width label元素的宽度,
          s-width 整个 query项的宽度
        -->
        <el-input v-model="query.name" t-label="名称" />
        <el-input v-model="query.age" t-label="年龄" />
      </template>

      <template #outer>
        <el-dialog v-model="visible">
          <el-form :colspan="24" :model="form" :rules="formRules" size="small" label-width="60px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-form>

          <template #footer>
            <el-btn>草稿</el-btn>
          </template>
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
        {
          label: '你好啊',
          prop: 'hello',
          type: 'action',
          slotName: 'bb'
        },
        { label: '你好啊2', prop: 'b', slotName: 'name', fixed: 'right' }
      ],

      query: {
        name: 'a',
        age: 20
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
