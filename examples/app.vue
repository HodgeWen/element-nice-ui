<template>
  <div id="aa">
    <router-view />
    <!-- <main-header v-if="lang !== 'play'"></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
    <main-footer v-if="lang !== 'play' && !isComponent"></main-footer> -->
  </div>
</template>

<script lang="ts">
// import { use } from 'element-nice-ui/lib/locale'
// import zhLocale from 'element-nice-ui/lib/locale/lang/zh-CN'

// use(zhLocale)

export default {
  name: 'app',

  computed: {}
}
</script>
