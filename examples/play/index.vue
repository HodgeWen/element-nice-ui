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
      ref="table"
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

      <template #column.action="{ row, index }">
        <el-action-item @click="onTest(index)">测试</el-action-item>
      </template>

      <template #searcher>
        <el-input v-model="query.name" t-label="名称" />
        <el-input v-model="query.age" t-label="年龄" />
        <el-select v-model="query.test" option-label="label1" t-label="测试" api="select" />
      </template>

      <template #outer>
        <el-dialog v-model="visible" :confirm="onConfirm">
          <el-form  :form="form" ref="form" colspan="24"  size="small" label-width="60px">
            <template #default="model">
              <!-- <div t-label="显示" v-show="model.type === '1'">hello</div> -->
              <el-input t-prop="name" t-label="名字" />
              <el-input t-prop="height" t-label="身高" t-modifier="number" />
              <el-radio-group t-prop="type" t-label="类型">
                <el-radio-button label="1">显示</el-radio-button>
                <el-radio-button label="2">隐藏</el-radio-button>
              </el-radio-group>
            </template>
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
        select: null
      },

      data: [],

      visible: false,

      form: {
        name: {
          value: '',
          match: ['phone', '格式错误'],
          required: '必须的'
        },

        type: {
          value: '1'
        },

        height: null
      }
    }
  },

  methods: {
    onConfirm() {
      return new Promise((res) => {
        setTimeout(() => {
          let v = this.$refs.form.getValue()
          console.log(v)
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
