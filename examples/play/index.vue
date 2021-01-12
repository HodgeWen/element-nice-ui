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
      pagination
      no-searcher
      no-cache
      ref="table"
      query-label-width="60"
    >
      <template #tools>
        <el-btn type="primary" @click="visible = true">新增</el-btn>
        <el-btn :disabled="selected && selected.length">删除</el-btn>
      </template>

      <template #column.action="{ row, index }">
        <el-action-item @click="onTest(index)">测试</el-action-item>
      </template>

      <template #searcher>
        <el-input v-model="query.name" t-label="名称" />
        <el-input v-model="query.age" t-label="年龄" />
        <el-select v-model="query.test" option-label="label1" t-label="测试" api="select" />
        <el-select v-model="disabled" :options="{ true: '开', false: '关' }" />
      </template>

      <template #outer>
        <el-dialog v-model="visible" :confirm="onConfirm">
          <el-form :form="form" ref="form" size="small" label-width="60px">
            <el-select
              multiple
              filterable
              t-label="测试"
              t-prop="select"
              :options="{ 0: '0', 1: '1' }"
            />
            <el-input :disabled="disabled === 'true'" t-prop="name" t-label="名字" />
            <el-input-number
              slot="data"
              slot-scope="{ type }"
              v-if="type === '1'"
              t-prop="height"
              t-label="身高"
            />
            <el-radio-group t-prop="type" t-label="类型">
              <el-radio-button label="1">显示</el-radio-button>
              <el-radio-button label="2">隐藏</el-radio-button>
            </el-radio-group>
            <el-select
              t-label="树形选择器"
              api="/select/tree"
              tree
              filterable
              t-prop="cas"
            />
          </el-form>
        </el-dialog>
      </template>
    </el-table>
  </div>
</template>

<script>
import Element from 'main/index.js'

export default {
  components: {
    ElInput: Element.Input
  },
  data() {
    return {
      selected: null,
      headers: [
        { label: '名称', prop: 'name', align: 'left' },
        { label: '图标', prop: 'icon' },
        { label: '排序', prop: 'sort' },
        { label: '路由地址', prop: 'path' },
        { label: '类型', prop: 'type' },
        { label: '类型', prop: 'type' },
        { label: '权限表示', prop: 'permission' },
        { label: '操作', type: 'action', fixed: 'right', width: 150, slotName: 'action' }
      ],

      query: {
        name: 'a',
        age: 20,
        select: null,
        test: 1
      },

      data: [],

      visible: false,

      type: 'view',

      form: {
        name: {
          value: '',
          required: '必须的'
        },

        type: {
          value: '1'
        },

        height: { value: null, required: true, type: 'number' },

        select: [],

        cas: { value: 'zhinan' }
      },

      disabled: 'false'
    }
  },

  methods: {
    onConfirm() {
      return new Promise((res) => {
        setTimeout(() => {
          let v = this.$refs.form.getValue()
          res(true)
        }, 2000)
      })
    },

    onTest(i) {
      this.$refs.table.update(i, { icon: '11' })
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
