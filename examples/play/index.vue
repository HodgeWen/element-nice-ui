<template>
  <div style="height: 100%">
    <!-- query-label-width: 所有的query元素的label宽度, 默认50 -->
    <el-table
      :headers="headers"
      api="aa"
      :query="query"
      stripe
      row-key="id"
      border
      pagination
      ref="table"
      query-label-width="60"
    >
      <template #tools>
        <!-- <el-btn @click="selected = null">清除</el-btn> -->
        <el-popconfirm>
          <el-btn>你好啊</el-btn>
        </el-popconfirm>
        <el-btn type="primary" @click="visible = true">新增</el-btn>
        <el-btn :disabled="selected && selected.length">删除</el-btn>
      </template>

      <template #column.action="{ row, index }">
        <el-action-item @click="onTest(index)">测试</el-action-item>
      </template>

      <template #searcher>
        <el-input v-model="query.name" t-label="名称" />
        <el-input v-model="query.age" t-label="年龄" />
        <el-select v-model="query.test" option-label="label1" t-label="测试" api="select" />
        <el-select v-model="disabled" :options="{ true: '开', false: '关' }" />
      </template>

      <template #outer>
        <el-dialog v-model="visible" :confirm="onConfirm">
          <el-form :form="form" ref="form" size="small" label-width="60px">
            <el-select t-label="测试" t-prop="select" :options="{ 0: '0', 1: '1' }" />
            <el-input :disabled="disabled === 'true'" t-prop="name" t-label="名字" />
            <el-input t-prop="height" t-label="身高" t-modifier="number" />
            <el-radio-group t-prop="type" t-label="类型">
              <el-radio-button label="1">显示</el-radio-button>
              <el-radio-button label="2">隐藏</el-radio-button>
            </el-radio-group>
            <el-cascader
            @change="$log"
              t-label="级联"
              :props="{ checkStrictly: true }"
              :show-all-levels="false"
              :options="options"
              t-prop="cas"
            />
          </el-form>
        </el-dialog>
      </template>
    </el-table>
  </div>
</template>

<script>
import Element from 'main/index.js'

export default {
  components: {
    ElInput: Element.Input
  },
  data() {
    return {
      selected: null,
      headers: [
        { label: '名称', prop: 'name', align: 'left' },
        { label: '图标', prop: 'icon' },
        { label: '排序', prop: 'sort' },
        { label: '路由地址', prop: 'path' },
        { label: '类型', prop: 'type' },
        { label: '类型', prop: 'type' },
        { label: '权限表示', prop: 'permission' },
        { label: '操作', type: 'action', fixed: 'right', width: 150, slotName: 'action' }
      ],

      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],

      query: {
        name: 'a',
        age: 20,
        select: null
      },

      data: [],

      visible: false,

      type: 'view',

      form: {
        name: {
          value: '',
          required: '必须的'
        },

        type: {
          value: '1'
        },

        height: null,

        select: '',

        cas: { value: 'basic' }
      },

      disabled: 'false'
    }
  },

  methods: {
    onConfirm() {
      return new Promise((res) => {
        setTimeout(() => {
          let v = this.$refs.form.getValue()
          res(true)
        }, 2000)
      })
    },

    onTest(i) {
      this.$refs.table.update(i, { icon: '11' })
    }
  },

  mounted() {}
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
  padding: 0;
  background: #f2f2f2;
}

.aaa {
  height: 100%;
  width: 200px;
  margin: 0;
  padding: 0;
}
</style>
