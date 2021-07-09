<template>
  <section class="el-section" :class="{ 'el-section--expanded': expanded }">
    <header class="el-section__header">
      <slot name="title">
        <span class="el-section__title">
          {{ title }}
        </span>
      </slot>

      <i class="el-icon-arrow-right" @click="toggleExpand"></i>
    </header>
    <transition name="el-section">
      <div class="el-section__body" v-show="expanded">
        <slot  />
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'ElSection',

  props: {
    title: {
      type: String,
      required: true
    }
  },

  data: () => ({
    expanded: true
  }),

  methods: {
    toggleExpand() {
      this.expanded = !this.expanded
    }
  }
}
</script>
