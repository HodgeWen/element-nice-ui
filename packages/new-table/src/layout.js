import Vue from 'vue'
import { openDB, Store } from './db'

import Cache from 'ts-web-cache'

/**
 * 创建布局对象, 用以支撑表格的布局
 * @param {Object} config 布局配置项
 */
export default function createLayout(config) {
  return new Vue({
    data() {
      let state = {
        _dom: {
          container: null,
          searcher: null,
          tools: null,
          pagination: null
        },

        // 该容器只会加载一次大小
        container: {
          height: 0
        },

        // 该容器会根据size的大小实时变化大小
        searcher: {
          height: 0,
          visible: true
        },

        // 该容器会根据size的大小改变自身的大小尺寸
        tools: {
          height: 0,
          visible: true
        },

        // 该大小需要根据
        // container.height - searcher.height - tools.height - pagination.height 实时计算而来
        main: {
          height: 0
        },

        // 分页会根据size大小而改变自身大小
        pagination: {
          height: 0,
          visible: false
        },

        // 表格尺寸大小, 单元格padding, 单元格内组件size和字体的大小会有差异
        size: 'medium',

        // 合并策略
        willComputeHeight: false,

        // 本地存储所使用的键的名称
        layoutKey: 'el-table-layout',

      }

      config &&
        Object.keys(config).forEach(key => {
          if (config[key] === undefined) return
          state[key] = config[key]
        })

      return state
    },

    computed: {
      /** 本地缓存 */

      localCache() {
        return Cache.create('local')
      }
    },

    methods: {
      notifyToCompute() {
        this.willComputeHeight = true
      },

      notifyToCompleteCompute() {
        this.willComputeHeight = false
      },

      /** 计算主视图高度 */
      computeMainHeight() {
        let { _dom } = this.$data
        // 其他组件的高度为 searcher(搜索栏), tool(工具栏), pagination(分页) 之和
        let componentsHeight = ['searcher', 'tools', 'pagination'].reduce((acc, cur) => {
          let component = this[cur]
          let dom = _dom[cur]
          return acc + (component.visible !== false ? dom?.offsetHeight ?? component.height : 0)
        }, 0)

        componentsHeight += ['searcher', 'tools'].reduce((acc, cur) => {
          if (this[cur].visible) {
            acc += 8
          }
          return acc
        }, 0)

        // 表格主体高度为容器高度减去组件高度之和
        this.main.height = this.container.height - componentsHeight
      },

      /**
       * 设置参数
       */
      setState(param1, param2) {
        // 第一个参数是string且第二个参数不为空
        if (typeof param1 === 'string' && this[param1] && param2 instanceof Object) {
          let target = this[param1]
          Object.keys(param2).forEach(key => {
            if (target[key] !== undefined && param2[key] !== undefined) {
              target[key] = param2[key]
            }
          })
        } else if (param1 instanceof Object) {
          // 对象批量
          Object.keys(param1).forEach(key => {
            let target = this[key]
            Object.keys(param1[key]).forEach(childKey => {
              target[childKey] = param1[key][childKey]
            })
          })
        }
      },

      /** 观察状态, 用来即时更新表格的宽高大小布局等等 */
      watchState() {
        let handler = () => this.notifyToCompute()

        /** 监听各个部件的属性变化 */
        ~['container', 'searcher', 'tools', 'pagination'].forEach(key => {
          this.$watch(key, handler, { deep: true })
        })

        // 计算高度
        this.$watch(
          'willComputeHeight',
          async v => {
            if (!v) return
            // 需要等待dom更新完成再计算值的大小
            await this.$nextTick()
            this.computeMainHeight()
            this.notifyToCompleteCompute()
          },
          { immediate: true }
        )

        // 配置更新处理函数, 将用户更改的配置存入缓存中
        let configUpdateHandler = () => {
          this.notifyToCompute()
          this.localCache.set(this.layoutKey, this.getLayoutConfig())
        }

        // 尺寸的大小变化会实时更新到本地数据库中去
        ~['size'].forEach(key => {
          this.$watch(key, configUpdateHandler)
        })
      },

      /** 初始化数据库的布局 */
      initDBLayout() {
        const { localCache, layoutKey } = this
        let tableLayout = localCache.get(layoutKey)

        if (!tableLayout) {
          // 未查到该数据则将数据存入
          localCache.set(layoutKey, this.getLayoutConfig())
        } else {
          Object.keys(tableLayout).forEach(key => {
            this[key] = tableLayout[key]
          })
        }
      },

      /** 获取布局配置 */
      getLayoutConfig() {
        const { size } = this
        return {
          size
        }
      },

      /** 引用dom节点 */
      refDom(name, element) {
        this.$data._dom[name] = element
        let component = this[name]
        if (component) {
          component.height = element.offsetHeight
        }
      }
    },

    created() {
      this.watchState()

      this.initDBLayout()
    }
  })
}
