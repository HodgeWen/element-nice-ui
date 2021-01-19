<template>
  <el-submenu :index="menu.path" v-if="menu.children && menu.children.length">
    <template #title>
      <i class="el-icon-location"></i>
      <span>{{ menu.name }}</span>
    </template>

    <layout-aside-menu-item :menu="item" :key="i" v-for="(item, i) of menu.children" />
  </el-submenu>
  <el-menu-item :index="menu.path" v-else>
    <i class="el-icon-menu"></i>
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import Vue from 'vue'
export default {
  name: 'LayoutAsideMenuItem',

  props: {
    menu: {
      type: Object,
      required: true
    }
  }
}
</script>
