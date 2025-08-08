<template>
  <el-form :form="form">
    <el-input t-prop="name" />
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: { value: 1 }
      }
    }
  }
}
</script>
