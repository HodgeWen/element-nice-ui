import Vue from 'vue'
import Element from 'main/index.js'

import App from './play/table.vue'
// import App from './play/index.vue'

import 'theme/components/base'
import 'theme/components/table'
import 'theme/components/action'
import 'theme/components/btn'
import 'theme/components/dialog'
import 'theme/components/form'
import 'theme/components/loading'
import 'theme/components/input'
import 'theme/components/input-number'
import 'theme/components/popconfirm'
import 'theme/components/select'
import 'theme/components/radio'
import 'theme/components/radio-group'
import 'theme/components/radio-button'
import 'theme/components/cascader'
import 'theme/components/tree'
import 'theme/components/menu'
import 'theme/components/perfect-scrollbar'
import 'theme/components/page'
// import 'theme/src/.scss'

Vue.use(Element.NewTable)
Vue.use(Element.Table)
Vue.use(Element.ActionItem)
Vue.use(Element.Page)
Vue.use(Element.PageAnchor)
Vue.use(Element.Btn)
Vue.use(Element.Dialog)
Vue.use(Element.Form)
Vue.use(Element.FormItem)
Vue.use(Element.Loading)
Vue.use(Element.Popconfirm)
Vue.use(Element.Select)
Vue.use(Element.RadioGroup)
Vue.use(Element.RadioButton)
Vue.use(Element.Cascader)
Vue.use(Element.InputNumber)
Vue.use(Element.Input)
Vue.use(Element.Menu)
Vue.use(Element.MenuItem)
Vue.use(Element.Submenu)
Vue.use(Element.PerfectScrollbar)
Vue.prototype.$confirm = Element.MessageBox.confirm

Vue.prototype.$log = console.log
Vue.prototype.$EL_TABLE_PROP_CONFIG = {
  page: 'data.records',
  total: 'data.total',
  list: 'data.records'
}
Vue.prototype.$EL_SELECT_PROP_CONFIG = {
  baseUrl: '',
  option: 'data'
}

Vue.prototype.$http = {
  get(url = '') {
    if (url === 'arr') {
      return Promise.resolve({
        code: 200,
        data: {
          records: Array(20).fill().map((_, i) => ({
            id: i,
            icon: null,
            name: '用户新增',
            spread: false,
            path: null,
            keepAlive: '0',
            permission: 'sys_user_add',
            type: '1',
            label: '用户新增',
            sort: null
          })),

          total: 100
        }
      })
    }
    if (url === 'select') {
      return new Promise((res) => {
        setTimeout(() => {
          res({
            code: 200,
            data: [
              { label: '测试1', label1: '测试一', value: 1, value1: '1' },
              { label: '测试2', label1: '测试二', value: 2, value1: '2' },
              { label: '测试3', label1: '测试三', value: 3, value1: '3' }
            ]
          })
        }, 200)
      })
    }
    if (url === '/select/tree') {
      return new Promise((res) => {
        setTimeout(() => {
          res({
            code: 200,
            data: [
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
                        value: 'form1',
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
            ]
          })
        }, 200)
      })
    }

    return Promise.resolve({
      code: 200,
      data: {
        records: [
          {
            id: 1000,
            parentId: -1,
            children: [
              {
                id: 1100,
                parentId: 1000,
                children: [
                  {
                    id: 1101,
                    parentId: 1100,
                    children: [],
                    icon: null,
                    name: '用户新增',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_user_add',
                    type: '1',
                    label: '用户新增',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 1102,
                    parentId: 1100,
                    children: [],
                    icon: null,
                    name: '用户修改',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_user_edit',
                    type: '1',
                    label: '用户修改',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 1103,
                    parentId: 1100,
                    children: [],
                    icon: null,
                    name: '用户删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_user_del',
                    type: '1',
                    label: '用户删除',
                    sort: null,
                    hasChildren: true
                  }
                ],
                icon: 'icon-yonghuguanli',
                name: '用户管理',
                spread: false,
                path: '/admin/user/index',
                keepAlive: '0',
                permission: null,
                type: '0',
                label: '用户管理',
                sort: 1,
                hasChildren: true
              },
              {
                id: 1200,
                parentId: 1000,
                children: [
                  {
                    id: 1201,
                    parentId: 1200,
                    children: [],
                    icon: null,
                    name: '菜单新增',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_menu_add',
                    type: '1',
                    label: '菜单新增',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 1202,
                    parentId: 1200,
                    children: [],
                    icon: null,
                    name: '菜单修改',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_menu_edit',
                    type: '1',
                    label: '菜单修改',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 1203,
                    parentId: 1200,
                    children: [],
                    icon: null,
                    name: '菜单删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_menu_del',
                    type: '1',
                    label: '菜单删除',
                    sort: null,
                    hasChildren: true
                  }
                ],
                icon: 'icon-caidanguanli',
                name: '菜单管理',
                spread: false,
                path: '/admin/menu/index',
                keepAlive: '0',
                permission: null,
                type: '0',
                label: '菜单管理',
                sort: 2,
                hasChildren: true
              },
              {
                id: 1300,
                parentId: 1000,
                children: [
                  {
                    id: 1301,
                    parentId: 1300,
                    children: [],
                    icon: null,
                    name: '角色新增',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_role_add',
                    type: '1',
                    label: '角色新增',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 1302,
                    parentId: 1300,
                    children: [],
                    icon: null,
                    name: '角色修改',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_role_edit',
                    type: '1',
                    label: '角色修改',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 1303,
                    parentId: 1300,
                    children: [],
                    icon: null,
                    name: '角色删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_role_del',
                    type: '1',
                    label: '角色删除',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 1304,
                    parentId: 1300,
                    children: [],
                    icon: null,
                    name: '分配权限',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_role_perm',
                    type: '1',
                    label: '分配权限',
                    sort: null,
                    hasChildren: true
                  }
                ],
                icon: 'icon-jiaoseguanli',
                name: '角色管理',
                spread: false,
                path: '/admin/role/index',
                keepAlive: '0',
                permission: null,
                type: '0',
                label: '角色管理',
                sort: 3,
                hasChildren: true
              },
              {
                id: 1400,
                parentId: 1000,
                children: [
                  {
                    id: 1401,
                    parentId: 1400,
                    children: [],
                    icon: null,
                    name: '部门新增',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_dept_add',
                    type: '1',
                    label: '部门新增',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 1402,
                    parentId: 1400,
                    children: [],
                    icon: null,
                    name: '部门修改',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_dept_edit',
                    type: '1',
                    label: '部门修改',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 1403,
                    parentId: 1400,
                    children: [],
                    icon: null,
                    name: '部门删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_dept_del',
                    type: '1',
                    label: '部门删除',
                    sort: null,
                    hasChildren: true
                  }
                ],
                icon: 'icon-web-icon-',
                name: '部门管理',
                spread: false,
                path: '/admin/dept/index',
                keepAlive: '0',
                permission: null,
                type: '0',
                label: '部门管理',
                sort: 4,
                hasChildren: true
              },
              {
                id: 1500,
                parentId: 1000,
                children: [
                  {
                    id: 1501,
                    parentId: 1500,
                    children: [],
                    icon: '1',
                    name: '租户新增',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'admin_systenant_add',
                    type: '1',
                    label: '租户新增',
                    sort: 0,
                    hasChildren: true
                  },
                  {
                    id: 1502,
                    parentId: 1500,
                    children: [],
                    icon: '1',
                    name: '租户修改',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'admin_systenant_edit',
                    type: '1',
                    label: '租户修改',
                    sort: 1,
                    hasChildren: true
                  },
                  {
                    id: 1503,
                    parentId: 1500,
                    children: [],
                    icon: '1',
                    name: '租户删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'admin_systenant_del',
                    type: '1',
                    label: '租户删除',
                    sort: 2,
                    hasChildren: true
                  }
                ],
                icon: 'icon-erji-zuhushouye',
                name: '租户管理',
                spread: false,
                path: '/admin/tenant/index',
                keepAlive: '0',
                permission: '',
                type: '0',
                label: '租户管理',
                sort: 5,
                hasChildren: true
              }
            ],
            icon: 'icon-quanxianguanli',
            name: '权限管理',
            spread: false,
            path: '/user',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '权限管理',
            sort: 0,
            hasChildren: true
          },
          {
            id: 2000,
            parentId: -1,
            children: [
              {
                id: 2100,
                parentId: 2000,
                children: [
                  {
                    id: 2101,
                    parentId: 2100,
                    children: [],
                    icon: null,
                    name: '日志删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_log_del',
                    type: '1',
                    label: '日志删除',
                    sort: null
                  }
                ],
                icon: 'icon-rizhiguanli',
                name: '日志管理',
                spread: false,
                path: '/admin/log/index',
                keepAlive: '0',
                permission: null,
                type: '0',
                label: '日志管理',
                sort: 5,
                hasChildren: true
              },
              {
                id: 2200,
                parentId: 2000,
                children: [
                  {
                    id: 2201,
                    parentId: 2200,
                    children: [],
                    icon: null,
                    name: '字典删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_dict_del',
                    type: '1',
                    label: '字典删除',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 2202,
                    parentId: 2200,
                    children: [],
                    icon: null,
                    name: '字典新增',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_dict_add',
                    type: '1',
                    label: '字典新增',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 2203,
                    parentId: 2200,
                    children: [],
                    icon: null,
                    name: '字典修改',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_dict_edit',
                    type: '1',
                    label: '字典修改',
                    sort: null,
                    hasChildren: true
                  }
                ],
                icon: 'icon-navicon-zdgl',
                name: '字典管理',
                spread: false,
                path: '/admin/dict/index',
                keepAlive: '0',
                permission: null,
                type: '0',
                label: '字典管理',
                sort: 6,
                hasChildren: true
              },
              {
                id: 10000,
                parentId: 2000,
                children: [
                  {
                    id: 10001,
                    parentId: 10000,
                    children: [],
                    icon: null,
                    name: '删除文件',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_file_del',
                    type: '1',
                    label: '删除文件',
                    sort: 1,
                    hasChildren: true
                  }
                ],
                icon: 'icon-wenjianguanli',
                name: '文件管理',
                spread: false,
                path: '/admin/file/index',
                keepAlive: '0',
                permission: null,
                type: '0',
                label: '文件管理',
                sort: 6,
                hasChildren: true
              },
              {
                id: 2210,
                parentId: 2000,
                children: [
                  {
                    id: 2211,
                    parentId: 2210,
                    children: [],
                    icon: null,
                    name: '参数新增',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'admin_syspublicparam_add',
                    type: '1',
                    label: '参数新增',
                    sort: 1,
                    hasChildren: true
                  },
                  {
                    id: 2212,
                    parentId: 2210,
                    children: [],
                    icon: null,
                    name: '参数删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'admin_syspublicparam_del',
                    type: '1',
                    label: '参数删除',
                    sort: 1,
                    hasChildren: true
                  },
                  {
                    id: 2213,
                    parentId: 2210,
                    children: [],
                    icon: null,
                    name: '参数编辑',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'admin_syspublicparam_edit',
                    type: '1',
                    label: '参数编辑',
                    sort: 1,
                    hasChildren: true
                  }
                ],
                icon: 'icon-canshu',
                name: '参数管理',
                spread: false,
                path: '/admin/param/index',
                keepAlive: '1',
                permission: null,
                type: '0',
                label: '参数管理',
                sort: 7,
                hasChildren: true
              },
              {
                id: 2800,
                parentId: 2000,
                children: [
                  {
                    id: 2810,
                    parentId: 2800,
                    children: [],
                    icon: '1',
                    name: '任务新增',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'job_sys_job_add',
                    type: '1',
                    label: '任务新增',
                    sort: 0,
                    hasChildren: true
                  },
                  {
                    id: 2820,
                    parentId: 2800,
                    children: [],
                    icon: '1',
                    name: '任务修改',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'job_sys_job_edit',
                    type: '1',
                    label: '任务修改',
                    sort: 0,
                    hasChildren: true
                  },
                  {
                    id: 2830,
                    parentId: 2800,
                    children: [],
                    icon: '1',
                    name: '任务删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'job_sys_job_del',
                    type: '1',
                    label: '任务删除',
                    sort: 0,
                    hasChildren: true
                  },
                  {
                    id: 2840,
                    parentId: 2800,
                    children: [],
                    icon: '1',
                    name: '任务暂停',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'job_sys_job_shutdown_job',
                    type: '1',
                    label: '任务暂停',
                    sort: 0,
                    hasChildren: true
                  },
                  {
                    id: 2850,
                    parentId: 2800,
                    children: [],
                    icon: '1',
                    name: '任务开始',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'job_sys_job_start_job',
                    type: '1',
                    label: '任务开始',
                    sort: 0,
                    hasChildren: true
                  },
                  {
                    id: 2860,
                    parentId: 2800,
                    children: [],
                    icon: '1',
                    name: '任务刷新',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'job_sys_job_refresh_job',
                    type: '1',
                    label: '任务刷新',
                    sort: 0,
                    hasChildren: true
                  },
                  {
                    id: 2870,
                    parentId: 2800,
                    children: [],
                    icon: '1',
                    name: '执行任务',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'job_sys_job_run_job',
                    type: '1',
                    label: '执行任务',
                    sort: 0,
                    hasChildren: true
                  }
                ],
                icon: 'icon-guanwangfangwen',
                name: 'Quartz管理',
                spread: false,
                path: '/daemon/job-manage/index',
                keepAlive: '0',
                permission: '',
                type: '0',
                label: 'Quartz管理',
                sort: 8,
                hasChildren: true
              },
              {
                id: 2400,
                parentId: 2000,
                children: [
                  {
                    id: 2401,
                    parentId: 2400,
                    children: [],
                    icon: '1',
                    name: '客户端新增',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_client_add',
                    type: '1',
                    label: '客户端新增',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 2402,
                    parentId: 2400,
                    children: [],
                    icon: null,
                    name: '客户端修改',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_client_edit',
                    type: '1',
                    label: '客户端修改',
                    sort: null,
                    hasChildren: true
                  },
                  {
                    id: 2403,
                    parentId: 2400,
                    children: [],
                    icon: null,
                    name: '客户端删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_client_del',
                    type: '1',
                    label: '客户端删除',
                    sort: null,
                    hasChildren: true
                  }
                ],
                icon: 'icon-bangzhushouji',
                name: '终端管理',
                spread: false,
                path: '/admin/client/index',
                keepAlive: '1',
                permission: '',
                type: '0',
                label: '终端管理',
                sort: 9,
                hasChildren: true
              },
              {
                id: 2500,
                parentId: 2000,
                children: [
                  {
                    id: 2501,
                    parentId: 2500,
                    children: [],
                    icon: '1',
                    name: '密钥新增',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_social_details_add',
                    type: '1',
                    label: '密钥新增',
                    sort: 0,
                    hasChildren: true
                  },
                  {
                    id: 2502,
                    parentId: 2500,
                    children: [],
                    icon: '1',
                    name: '密钥修改',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_social_details_edit',
                    type: '1',
                    label: '密钥修改',
                    sort: 1,
                    hasChildren: true
                  },
                  {
                    id: 2503,
                    parentId: 2500,
                    children: [],
                    icon: '1',
                    name: '密钥删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_social_details_del',
                    type: '1',
                    label: '密钥删除',
                    sort: 2,
                    hasChildren: true
                  }
                ],
                icon: 'icon-miyue',
                name: '密钥管理',
                spread: false,
                path: '/admin/social/index',
                keepAlive: '0',
                permission: '',
                type: '0',
                label: '密钥管理',
                sort: 10,
                hasChildren: true
              },
              {
                id: 2600,
                parentId: 2000,
                children: [
                  {
                    id: 2601,
                    parentId: 2600,
                    children: [],
                    icon: null,
                    name: '令牌删除',
                    spread: false,
                    path: null,
                    keepAlive: '0',
                    permission: 'sys_token_del',
                    type: '1',
                    label: '令牌删除',
                    sort: 1,
                    hasChildren: true
                  }
                ],
                icon: 'icon-denglvlingpai',
                name: '令牌管理',
                spread: false,
                path: '/admin/token/index',
                keepAlive: '0',
                permission: null,
                type: '0',
                label: '令牌管理',
                sort: 11,
                hasChildren: true
              },
              {
                id: 2700,
                parentId: 2000,
                children: [],
                icon: 'icon-luyou',
                name: '动态路由',
                spread: false,
                path: '/admin/route/index',
                keepAlive: '0',
                permission: null,
                type: '0',
                label: '动态路由',
                sort: 12,
                hasChildren: true
              }
            ],
            icon: 'icon-xitongguanli',
            name: '系统管理',
            spread: false,
            path: '/admin',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '系统管理',
            sort: 1,
            hasChildren: true
          }
        ],

        total: 6
      }
    })
  }
}

new Vue({
  // eslint-disable-line
  render: (h) => h(App)
}).$mount('#app')
