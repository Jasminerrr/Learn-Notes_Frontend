// 引入Vue和Vue-router路由插件
import Vue from 'vue'
import Router from 'vue-router'

// 使用路由插件
Vue.use(Router)

/* 引入最外层骨架的一级路由组件 */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// 路由配置 在数组里面存放路由信息
// 需要把项目中的路由进行拆分（因为不同用户登录需要展示不同的菜单信息）
// 常量路由--不管什么什么都能看见的路由：登录、404、首页
export const constantRoutes = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    // 访问/会到Layout，但立马会重定向到dashboard首页
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      // 用到路由懒加载
      component: () => import('@/views/dashboard/index'),
      // meta：路由元信息，title是侧边栏文字 ，icon是图标
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

 

  // 404 page must be placed at the end !!!
]

// 异步路由--不同用户需要过滤筛选出的路由：
export const asyncRoutes = [
  // 权限管理数据相关路由
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理',
        },
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
        },
        hidden: true,
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '菜单管理',
        },
      },
    ]
  },
  // 商品管理相关路由
  {
    path:'/product',
    component:Layout,
    name:'Product',
    meta:{title:'商品管理',icon:'el-icon-goods'},
    children:[
      {
        path:'/tradeMark',
        component:()=>import('@/views/product/tradeMark'),
        name:'TradeMark',
        meta:{title:'品牌管理'},
      },
      {
        path:'/attr',
        component:()=>import('@/views/product/Attr'),
        name:'Attr',
        meta:{title:'平台属性管理'},
      },
      {
        path:'/spu',
        component:()=>import('@/views/product/Spu'),
        name:'spu',
        meta:{title:'Spu管理'},
      },
      {
        path:'/sku',
        component:()=>import('@/views/product/Sku'),
        name:'sku',
        meta:{title:'Sku管理'},
      },
    ]
  },
]

// 任意路由：当路径出现错误时，重定向到404
export const anyRoutes = { path: '*', redirect: '/404', hidden: true }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }), // 滚动行为y=0
  routes: constantRoutes // 配置相关路由
})

// 函数一执行，会返回一个路由器对象
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 对外暴露路由器
export default router
