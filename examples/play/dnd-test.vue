<template>
  <el-dnd class="container">
    <el-dnd-item v-for="item of items" :id="item.id" :key="item.id" class="item">
      {{item.label}}
    </el-dnd-item>

  </el-dnd>
</template>

<script>
export default {
  data: () => ({
    items: [
      { id: 1, label: '测试1' },
      { id: 2, label: '测试2' },
      { id: 3, label: '测试3' }
    ]
  })
}
</script>

<style lang="scss" scoped>
.item {
  width: 100px;
  height: 100px;
  display: inline-block;
  background: #f2f2f2;
  margin-left: 10px;
}

.container {
  width: 100%;
  height: 400px;
}
</style>