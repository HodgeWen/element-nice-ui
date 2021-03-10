<template>
  <div style="height: 100%">
    <!-- query-label-width: 所有的query元素的label宽度, 默认50 -->
    <el-table
      :headers="headers"
      api="arr"
      :query="query"
      stripe
      row-key="id"
      border
      pagination
      auto-height
      ref="table"
      query-label-width="60"
      v-model="aa"
      :data-map="dataMap"
    >

      <!-- 搜索栏插槽 -->
      <template #searcher>
        <el-input v-model="query.name" t-label="名称" />
        <el-input v-model="query.age" t-label="年龄" />
        <el-select
          v-model="query.test"
          t-label="测试"
          tree
          option-value="value"
          option-label="label"
          api="/select/tree"
        />
        <el-select v-model="disabled" :options="{ true: '开', false: '关' }" />
      </template>

      <!-- 工具栏插槽 -->
      <template #tools>
        <el-color-picker @input="onColorInput" value="#f00" size="mini" />
        <el-context :ctx="{ type: 'primary', size: 'small' }" :depth="2">
          <div>
            <el-btn @click="visible = true">新增</el-btn>
            <el-btn @click=";(visible = true), (type = 'update')">编辑(有选择)</el-btn>
            <el-btn @click=";(visible = true), (type = 'view')">查看(无选择)</el-btn>
            <el-btn @click="onToggle">
              {{ selected && selected.length !== undefined ? '多选' : '单选' }}
            </el-btn>
          </div>
        </el-context>

        <el-btn @click="$msg.success('成功')">成功</el-btn>
        <el-btn @click="$msg.error('失败')">失败(单例)</el-btn>
        <el-btn :disabled="selected && !!selected.length">删除</el-btn>
      </template>

      <!-- column.开头的为动态插槽 start -->
      <template #column.expand="{ row }">
        {{ row.id }}
      </template>

      <!-- 默认的action插槽类型 -->
      <template #column.action="{ row, index }">
        <el-action-item v-if="index % 2 === 0" @click="onTest(index)">测试2</el-action-item>
        <el-action-item @click="onTest(index)" need-to-confirm>测4</el-action-item>
        <el-action-item @click="onTest(index)">测试5</el-action-item>
        <el-action-item @click="onTest(index)">测试6</el-action-item>
      </template>
      <!-- column.开头的为动态插槽 end -->

      <!-- 这里存放一些表单弹框啥的 -->
      <template #outer>
        <el-dialog v-model="visible" :confirm="onConfirm">
          <el-form :form="form" ref="form" size="small" label-width="60px">
            <el-select multiple filterable t-label="测试" t-prop="select" api="select" />

            <el-input
              :disabled="disabled === 'true'"
              t-prop="name"
              t-label="名字"
              prepend="aa"
              append="测试"
            />

            <el-input-number money :precision="2" t-prop="number" t-label="数字" />
            <el-input-number
              slot="data"
              slot-scope="{ type }"
              v-if="type === '1'"
              t-prop="height"
              t-label="身高"
            />
            <el-radio-group t-prop="type" t-label="类型">
              <el-radio label="1">显示</el-radio>
              <el-radio label="2">隐藏</el-radio>
            </el-radio-group>

            <el-checkbox-group t-prop="checked" t-label="检查">
              <el-checkbox label="1">测试</el-checkbox>
            </el-checkbox-group>
            <el-select
              t-label="树形选择器"
              api="/select/tree"
              data-path="data1.records"
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
      selected: [],
      aa: {},
      tableSelected: [],
      headers: [
        {
          label: '名称',
          prop: 'name',
          align: 'left',
          children: [
            { label: '名称', prop: 'name' },
            { label: '排序', prop: 'sort' }
          ]
        },
        { label: '图标', prop: 'icon' },
        { label: '排序', prop: 'sort' },
        { label: '路由地址', prop: 'path' },
        { label: '类型', prop: 'type' },
        { label: '类型', prop: 'type' },
        { label: '权限表示', prop: 'permission' },
        { label: '操作', fixed: 'right', type: 'action', width: 150, slotName: 'action' }
      ],

      query: {
        name: 'a',
        age: 20,
        select: null,
        test: 1
      },

      data: [],

      visible: true,

      type: 'view',

      form: {
        name: {
          required: true,
          range: [2, 5] // 表示2-5个字符
        },

        number: {
          range: [2, 5], //表示2-5值范围
          type: 'number' // 字符串以外的值需要指定值的类型
        },

        checked: [],

        // 通常没有验证的话不这样写, 直接type: '1' 省事
        type: {
          value: '1'
        },

        height: { required: true, type: 'number' },

        select: [],

        cas: { value: '', required: true, trigger: 'change' }
      },

      disabled: 'false'
    }
  },

  methods: {
    onConfirm() {
      return new Promise(res => {
        setTimeout(() => {
          let v = this.$refs.form.getValue()
          res(true)
        }, 2000)
      })
    },

    dataMap(item, index) {
      item.permission += '-' + index
      return item
    },

    onTest(i) {
      this.$refs.table.update(i, { icon: '11' })
    },

    onToggle() {
      if (Array.isArray(this.selected)) {
        this.selected = undefined
      } else {
        this.selected = []
      }
    }
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
