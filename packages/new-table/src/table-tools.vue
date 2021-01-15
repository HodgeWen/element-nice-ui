<template>
<div>
  <el-btn @click="onClick">aa</el-btn>
</div>
</template>

<script>
export default {
  name: 'ElTableSum',

  inject: ['store'],

  methods: {
    onClick() {
      this.store.commit('setCount', Date.now())
    }
  }

}
</script>