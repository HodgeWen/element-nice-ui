<template>
  <el-form :form="form">
    <el-input t-prop="name" />
  </el-form>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      form: {
        name: { value: 1 }
      }
    }
  }
})
</script>
