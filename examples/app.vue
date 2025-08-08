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

<script>
// import { use } from 'element-nice-ui/lib/locale'
// import zhLocale from 'element-nice-ui/lib/locale/lang/zh-CN'

// use(zhLocale)
import { RouterView } from 'vue-router'

export default {
  components: { RouterView },
  name: 'app',

  computed: {}
}
</script>
