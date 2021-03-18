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
      :data-map="dataMap"
    >
      <!-- column.开头的为动态插槽 start -->
      <template #column.select="{ row, index }">
        <el-select
          tree
          multiple
          :value="row.$selected"
          :options="row.details"
          option-value="detailId"
          option-label="detailName"
          @input="onSelectDetail(row, $event, index)"
        />
      </template>

      <!-- 默认的action插槽类型 -->
      <template #column.action="{ row, index }">
        <el-action-item v-if="index % 2 === 0" @click="onTest(index)">测试2</el-action-item>
        <el-action-item @click="onTest(index)" need-to-confirm>测4</el-action-item>
        <el-action-item @click="onTest(index)">测试5</el-action-item>
        <el-action-item @click="onTest(index)">测试6</el-action-item>
      </template>
      <!-- column.开头的为动态插槽 end -->
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
        { label: '选择', width: 150, slotName: 'select' },
        { label: '操作', fixed: 'right', type: 'action', width: 150, slotName: 'action' }
      ],

      query: {
        name: 'a',
        age: 20,
        select: null,
        test: 1
      }
    }
  },

  methods: {
    dataMap(item, index) {
      if (item.$selected) return item
      item.$selected = item.details.filter(details => details.selected).map(item => item.detailId)
      return item
    },

    onSelectDetail(row, selected, index) {
      this.$refs.table.update(index, item => {
        item.$selected = selected
      })
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
