<!-- 新表格, 未完全实现, 考虑用vue3之后再实现会更好 -->

<template>
  <!-- <el-page>
    <el-select style="width: 200px" v-model="selected"  :options="options">
      <template #prepend><i class="el-icon-setting"></i></template>
    </el-select>

    <el-input style="width: 200px">
      <template #prepend>
        <i class="el-icon-setting"></i>
      </template>

      <template #suffix>aa</template>
    </el-input>
    <el-page-anchor title="锚点1" />
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <el-page-anchor title="锚点2" />
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <el-page-anchor title="锚点3" />
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <el-page-anchor title="锚点4" />
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <template #footer-right>
      <el-btn>aaa</el-btn>
    </template>
  </el-page> -->

  <el-data api="arr" pagination>
    <template #default="data">
      <div v-for="(item, index) of data" :key="index" style="">
        {{ item }}
      </div>
    </template>
  </el-data>

  <!-- <el-new-table :headers="headers" :data="data" v-if="show"></el-new-table> -->
</template>

<script>
import LayoutAsideMenuItem from './layout-aside-menu-item.vue'

export default {
  components: {
    LayoutAsideMenuItem
  },

  data: () => ({
    selected: '',

    headers: [
      { label: '名称', prop: 'name' },
      { label: '年龄', prop: 'age' }
    ],

    anchors: [
      { title: '锚点1', id: 'a' }
    ],

    options: Array(20).fill().map((v, i) => ({ label: '测试' + i, value: i })),
    n: null,

    collapse: false,

    menus: [
      {
        id: 1000,
        parentId: -1,
        children: [
          {
            id: 1100,
            parentId: 1000,
            children: [
              {
                icon: 'icon-yonghuguanli',
                name: '用户管理1',
                spread: false,
                path: '/admin/user/index/1',
                keepAlive: '0',
                permission: null,
                type: '0',
                label: '用户管理',
                sort: 1,
                hasChildren: null
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
            hasChildren: null
          },
          {
            id: 1200,
            parentId: 1000,
            children: [],
            icon: 'icon-caidanguanli',
            name: '菜单管理',
            spread: false,
            path: '/admin/menu/index',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '菜单管理',
            sort: 2,
            hasChildren: null
          },
          {
            id: 1300,
            parentId: 1000,
            children: [],
            icon: 'icon-jiaoseguanli',
            name: '角色管理',
            spread: false,
            path: '/admin/role/index',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '角色管理',
            sort: 3,
            hasChildren: null
          },
          {
            id: 1400,
            parentId: 1000,
            children: [],
            icon: 'icon-web-icon-',
            name: '部门管理',
            spread: false,
            path: '/admin/dept/index',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '部门管理',
            sort: 4,
            hasChildren: null
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
        hasChildren: null
      },
      {
        id: 2000,
        parentId: -1,
        children: [
          {
            id: 2100,
            parentId: 2000,
            children: [],
            icon: 'icon-rizhiguanli',
            name: '日志管理',
            spread: false,
            path: '/admin/log/index',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '日志管理',
            sort: 5,
            hasChildren: null
          },
          {
            id: 10000,
            parentId: 2000,
            children: [],
            icon: 'icon-wenjianguanli',
            name: '文件管理',
            spread: false,
            path: '/admin/file/index',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '文件管理',
            sort: 6,
            hasChildren: null
          },
          {
            id: 2200,
            parentId: 2000,
            children: [],
            icon: 'icon-navicon-zdgl',
            name: '字典管理',
            spread: false,
            path: '/admin/dict/index',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '字典管理',
            sort: 6,
            hasChildren: null
          },
          {
            id: 2210,
            parentId: 2000,
            children: [],
            icon: 'icon-canshu',
            name: '参数管理',
            spread: false,
            path: '/admin/param/index',
            keepAlive: '1',
            permission: null,
            type: '0',
            label: '参数管理',
            sort: 7,
            hasChildren: null
          },
          {
            id: 2400,
            parentId: 2000,
            children: [],
            icon: 'icon-bangzhushouji',
            name: '终端管理',
            spread: false,
            path: '/admin/client/index',
            keepAlive: '1',
            permission: '',
            type: '0',
            label: '终端管理',
            sort: 9,
            hasChildren: null
          },
          {
            id: 2600,
            parentId: 2000,
            children: [],
            icon: 'icon-denglvlingpai',
            name: '令牌管理',
            spread: false,
            path: '/admin/token/index',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '令牌管理',
            sort: 11,
            hasChildren: null
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
            hasChildren: null
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
        hasChildren: null
      },
      {
        id: 3000,
        parentId: -1,
        children: [
          {
            id: 3100,
            parentId: 3000,
            children: [],
            icon: 'icon-server',
            name: '服务监控',
            spread: false,
            path: 'http://127.0.0.1:5001',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '服务监控',
            sort: 0,
            hasChildren: null
          },
          {
            id: 3200,
            parentId: 3000,
            children: [],
            icon: 'icon-wendang',
            name: '接口文档',
            spread: false,
            path: 'http://127.0.0.1:9999/swagger-ui.html',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '接口文档',
            sort: 1,
            hasChildren: null
          },
          {
            id: 3110,
            parentId: 3000,
            children: [],
            icon: 'icon-qingchuhuancun',
            name: '缓存监控',
            spread: false,
            path: '/monitor/redis/index',
            keepAlive: '1',
            permission: null,
            type: '0',
            label: '缓存监控',
            sort: 1,
            hasChildren: null
          },
          {
            id: 3500,
            parentId: 3000,
            children: [],
            icon: 'icon-wendang',
            name: '文档扩展',
            spread: false,
            path: 'http://127.0.0.1:9999/doc.html',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '文档扩展',
            sort: 2,
            hasChildren: null
          }
        ],
        icon: 'icon-msnui-supervise',
        name: '系统监控',
        spread: false,
        path: '/daemon',
        keepAlive: '0',
        permission: null,
        type: '0',
        label: '系统监控',
        sort: 2,
        hasChildren: null
      },
      {
        id: 10006,
        parentId: -1,
        children: [
          {
            id: 10007,
            parentId: 10006,
            children: [],
            icon: 'icon-mysql',
            name: '数据源管理',
            spread: false,
            path: '/gen/datasource',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '数据源管理',
            sort: 0,
            hasChildren: null
          },
          {
            id: 2300,
            parentId: 10006,
            children: [],
            icon: 'icon-weibiaoti46',
            name: '代码生成',
            spread: false,
            path: '/gen/index',
            keepAlive: '0',
            permission: '',
            type: '0',
            label: '代码生成',
            sort: 1,
            hasChildren: null
          },
          {
            id: 10008,
            parentId: 10006,
            children: [],
            icon: 'icon-biaodanbiaoqian',
            name: '表单设计',
            spread: false,
            path: '/gen/design',
            keepAlive: '0',
            permission: null,
            type: '0',
            label: '表单设计',
            sort: 2,
            hasChildren: null
          },
          {
            id: 10002,
            parentId: 10006,
            children: [],
            icon: 'icon-record',
            name: '表单管理',
            spread: false,
            path: '/gen/form',
            keepAlive: '0',
            permission: '',
            type: '0',
            label: '表单管理',
            sort: 3,
            hasChildren: null
          }
        ],
        icon: 'icon-shejiyukaifa-',
        name: '开发平台',
        spread: false,
        path: '/gen',
        keepAlive: '0',
        permission: null,
        type: '0',
        label: '开发平台',
        sort: 9,
        hasChildren: null
      },
      {
        id: 17000,
        parentId: -1,
        children: [],
        icon: 'icon-icon-p_mrpbaobiao',
        name: '报表设计',
        spread: false,
        path: 'http://127.0.0.1:5006/ureport/designer',
        keepAlive: '0',
        permission: null,
        type: '0',
        label: '报表设计',
        sort: 9,
        hasChildren: null
      }
    ],

    data: [
      { name: '张三', age: 20 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 },
      { name: '李四', age: 21 }
    ],

    show: false
  }),

  mounted() {}
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
