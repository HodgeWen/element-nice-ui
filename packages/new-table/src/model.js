// 该类用来控制表格的数据来源, 以及提供一些对数据的处理操作
import { getValueByPath } from 'element-nice-ui/src/utils/util'
import Vue from 'vue'

/**
 * 创建数据模型
 * @param {Object} options
 * @param {string} [options.api] 请求地址
 * @param {any[]} [options.data] 表格数据
 * @param {any} [options.http] 请求实例
 * @returns
 */
export default function createModel(options) {
  let vm = new Vue({
    data() {
      const { data, api, pagination, rowKey, showAsTree, query } = options

      const state = {
        /** 表格数据 */
        data: [], // 表格数据
        /** 请求的api */
        api: '', // 表格请求api
        /** 是否是分页类型的表格 */
        pagination, // 是否是分页模式的数据
        /** 分页页码 */
        page: 1,
        /** 分页大小 */
        size: 20,
        /** 数据总数 */
        total: 0,
        /** 数据加载 */
        loading: false,
        /** 是否应该发起请求 */
        _shouldRequest: true,
        /** 请求方法 */
        method: 'get',
        /** 查询触发状态 */
        willQuery: false,
        /** 树状表格属性 */
        childrenKey: 'children',
        /** 行key */
        rowKey,
        /** 是否以树形显示 */
        showAsTree,
        /** 查询条件 */
        query
      }

      // 传入一个自定义
      if (data) {
        state.data = data
        state._shouldRequest = false
      }

      if (api) {
        let apiArray = api.split(':').map(s => s.trim())
        if (apiArray.length === 1) {
          state.api = api
        } else {
          state.method = apiArray[0].toLowerCase()
          state.api = apiArray[1]
        }
      }

      return state
    },

    watch: {
      willQuery(v) {
        v &&
          void (async () => {
            await this.fetchData()
            this.notifyToCompleteTheQuery()
          })()
      },

      api: {
        immediate: true,
        handler() {
          this.notifyToQuery()
        }
      },
      page() {
        this.notifyToQuery()
      },
      size() {
        this.notifyToQuery()
      }
    },

    methods: {
      /** 请求远端数据 */
      async fetchData() {
        const { api, method, $EL_TABLE_PROP_CONFIG, page, size, pagination, $http } = this
        if (!$http || !api || !this.$data._shouldRequest) return

        const {
          // 分页数据路径
          pageDataPath,
          // 列表数据路径
          listDataPath,
          // 总数路径
          totalPath,
          pageKey = 'current',
          // 分页数据大小
          sizeKey = 'size'
        } = $EL_TABLE_PROP_CONFIG

        const params = {}

        if (pagination) {
          params[pageKey] = page
          params[sizeKey] = size
        }

        this.loading = true
        const { data, code } = await $http[method](api, { params })
        this.loading = false

        if (code !== 200) return
        // TODO  使用树形表格时
        this.data = getValueByPath(data, pagination ? pageDataPath : listDataPath)

        if (pagination) {
          this.total = getValueByPath(data, totalPath)
        }
      },

      /** 通知侦听器即将发起查询 */
      notifyToQuery() {
        this.willQuery = true
      },

      /** 完成查询 */
      notifyToCompleteTheQuery() {
        this.willQuery = false
      },

      /** 新增数据 */
      create(index, record) {
        if (typeof record === 'undefined' && typeof index === 'object') {
          record = index
          this.data.unshift(record)
        } else if (Array.isArray(index) && typeof record === 'object') {
          this.find(index)?.children?.unshift(record)
        }
      },

      /** 删除数据 */
      delete(index) {
        if (typeof index === 'number') {
          this.data.splice(index, 1)
        } else if (Array.isArray(index)) {
        }
      },

      /** 更新数据 */
      update() {

      },

      /** 查找数据 */
      find(conditions) {
        if (typeof conditions === 'undefined') {
          return this.data
        }
        if (typeof conditions === 'number') {
          return this.data[conditions]
        }

        if (Array.isArray(conditions)) {
          const children = this.childrenKey
          const initialValue = {
            [children]: this.data
          }
          return conditions.reduce((acc, cur) => {
            let item = acc[children]
            if (item) {
              return item[cur]
            }
            return null
          }, initialValue)
        }

        if (typeof conditions === 'object' && conditions !== null) {
          let conditionKeys = Object.keys(conditions)
          let ret = []

          this.data.forEach(item => {
            conditionKeys.every(key => item[key] === conditions[key]) && ret.push(item)
          })

          return ret
        }

        return this.data
      }
    }
  })

  return vm
}
