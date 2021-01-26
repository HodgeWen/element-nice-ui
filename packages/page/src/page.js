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

    anchorList: [],

    anchorId: 0
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
    addAnchor(title, el) {
      this.anchorList.push({
        title,
        el,
        _id: this.anchorId++
      })
    },

    showFooter() {
      return (
        this.$slots['footer-left'] || this.$slots['footer-right'] || this.submit || this.showBack
      )
    },

    goBack() {
      this.$router.go(-1)
    },

    scrollTo(top, mode = 'y') {
      this.$refs.pageBody[mode === 'x' ? 'scrollX' : 'scrollY'](top)
    },

    onSubmit() {
      this.loading = true
      if (this.submit) {
        let ret = this.submit()
        if (ret && ret.then) {
          ret
            .then(res => {
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.loading = false
        }
      }
    }
  },

  render(h) {
    const showFooter = this.showFooter()
    return (
      <div class={{ 'el-page': true, 'el-page--without-footer': !showFooter }}>
        {/* body */}
        <el-perfect-scrollbar ref='pageBody' class='el-page__body'>
          {this.$slots.default}
        </el-perfect-scrollbar>

        {/* 页脚 */}
        {showFooter ? (
          <el-context class='el-page__footer' ctx={this.ctx} depth={2}>
            <section class='el-page__footer-left'>
              {this.showBack ? <el-btn onClick={this.goBack}>返回</el-btn> : null}
              {this.$slots['footer-left']}
            </section>

            <section class='el-page__footer-right'>
              {this.$slots['footer-right']}
              {this.submit ? (
                <el-btn type='primary' loading={this.loading} onClick={this.onSubmit}>
                  提交
                </el-btn>
              ) : null}
            </section>
          </el-context>
        ) : null}

        {/* 锚点列表 */}
        {this.anchorList && this.anchorList.length ? (
          <el-perfect-scrollbar class='el-page__anchor-list' tag='ul'>
            {this.anchorList.map(({ title, el, _id }) => (
              <li
                key={_id}
                onClick={() =>
                  this.scrollTo(el.getBoundingClientRect().top + this.$refs.pageBody.$el.scrollTop)
                }
              >
                {title}
              </li>
            ))}
          </el-perfect-scrollbar>
        ) : null}

        {/* 回到顶部 */}
        {!this.noBacktop ? <el-backtop target='.el-page__body' /> : null}
      </div>
    )
  }
}
