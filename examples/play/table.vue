<template>
  <div>
    <el-table :headers="headers" v-if="show"></el-table>
  </div>
</template>

<script>
import MenuItem from './menu-item.vue'
export default {
  components: {
    MenuItem
  },
  data: () => ({
    headers: [{ label: '你好' }],

    show: true
  }),

  mounted() {
    setTimeout(() => {
      this.show = false
    }, 3000)
  }
}
</script>
