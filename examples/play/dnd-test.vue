<template>
  <el-form :grid="false" ref="container" class="container" :form="form" label-width="80px">
    <el-form-item
      v-for="(item, index) of items"
      draggable
      :prop="item.field"
      :label="item.label"
    >
      <el-input />
    </el-form-item>

    <el-form-item>
      <el-btn @click="onAdd">+</el-btn>
    </el-form-item>
  </el-form>
</template>

<script>
import { Draggor } from './drag'
import Sortable from 'sortablejs'
export default {
  data: () => ({
    items: [],
    form: {}
  }),

  methods: {
    change(a) {
      // console.log(a)
    },

    onAdd() {
      this.form[`a${this.items.length + 1}`] = `a${this.items.length + 1}`
      this.items.push({
        id: this.items.length,
        field: `a${this.items.length + 1}`,
        label: `字段${this.items.length + 1}`
      })
    }
  },

  created() {
    this.items = Array(12)
      .fill()
      .map((v, i) => {
        this.form[`a${i + 1}`] = `a${i + 1}`
        return { id: i, field: `a${i + 1}`, label: `字段${i + 1}` }
      })
  },

  mounted() {
    new Sortable(this.$refs.container.$el, {
      animation: 150,
      ghostClass: 'ghost',
      dragClass: "drag",



      onEnd(e) {

        console.log(e)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.item {
  background: #fff;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 4px;
}

.container {
  width: 100%;
  min-height: 400px;
  padding: 20px;
  background: #f2f2f2;
  box-sizing: border-box;
}

.ghost {
  visibility: hidden;
}

</style>
