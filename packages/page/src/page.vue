<template>
  <div class="el-page" :class="{ 'el-page--without-footer': !showFooter() }">
    <el-perfect-scrollbar ref="pageBody" class="el-page__body">
      <slot />
    </el-perfect-scrollbar>

    <el-context v-if="showFooter()" class="el-page__footer" :ctx="ctx" :depth="2">
      <section class="el-page__footer-left">
        <el-btn v-if="showBack" @click="goBack">返回</el-btn>
        <slot name="footer-left" />
      </section>

      <section class="el-page__footer-right">
        <slot name="footer-right" />
        <el-btn v-if="submit" type="primary" :loading="loading" @click="onSubmit">提交</el-btn>
      </section>
    </el-context>

    <el-perfect-scrollbar class="el-page__anchor-list" tag="ul">
      <li v-for="(anchor, key) of anchorList" :key="key" @click="onAnchorClick(anchor)">
        {{ anchor.title }}
      </li>
    </el-perfect-scrollbar>

    <el-backtop v-if="!noBacktop" target=".el-page__body" />
  </div>
</template>

<script>
import ElBtn from 'element-nice-ui/packages/btn'
import ElContext from 'element-nice-ui/packages/context'
import ElPerfectScrollbar from 'element-nice-ui/packages/perfect-scrollbar'
import ElBacktop from 'element-nice-ui/packages/backtop'
export default {
  name: 'ElPage',

  components: {
    ElBtn,
    ElContext,
    ElPerfectScrollbar,
    ElBacktop
  },

  inheritAttrs: false,

  provide() {
    return {
      elPage: this
    }
  },

  props: {
    size: {
      type: String,
      default: 'small'
    },

    noBacktop: {
      type: Boolean
    },

    submit: Function
  },

  data: () => ({
    loading: false,

    anchorList: []
  }),

  computed: {
    ctx() {
      return {
        size: this.size
      }
    },

    showBack() {
      return !!this.$router
    }
  },

  methods: {
    addAnchor(anchor) {
      this.anchorList.push(anchor)
    },

    showFooter() {
      return (
        this.$slots['footer-left'] || this.$slots['footer-right'] || this.submit || this.showBack
      )
    },

    goBack() {
      this.$router.go(-1)
    },

    resetLoading() {
      this.loading = false
    },

    onAnchorClick(anchor) {
      this.$refs.pageBody.scrollY(anchor.top)
      // console.log(anchor)
    },

    onSubmit() {
      this.loading = true
      if (this.submit) {
        let ret = this.submit()
        if (ret && ret.then) {
          ret
            .then(res => {
              if (res === false) return
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          if (ret === false) return
          this.loading = false
        }
      }
    }
  }
}
</script>
