// 引入一级路由组件
/* import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center' */

// 引入二级路由组件
/* import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder"; */

/*
路由懒加载：当打包构建应用时，js包会变得非常大，影响页面加载；
如果能把不同路由对应的组件分割成不同的代码块，当路由被访问时才加载对应组件，这样会更高效；
*/
// 右边是一个箭头函数，返回的是一个Promise对象（使用的时候调用回调，不使用就没有）
const Foo = () =>{
  return import('@/pages/Home')
}
// 简写:const Foo = () => import('@/pages/Home')


// 配置路由
export default [
  {
    // 首页
    path: '/home', // 路由的路径都是小写
    component: Foo,// 当路由被访问时才加载对应组件
    meta: { show: true } // 配置meta 路由元信息,显示footer
  },
  {
    // 搜索页
    name: 'search',// 给路由起名
    // params参数用:keyword占位,可以在占位后面加?：指定可传递或不传递params参数
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true }
  },
  {
    // 登录页
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { show: false }
  },
  {
    // 注册页
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { show: false }
  },
  {
    // 商品详情页
    // 使用 : 占位符占位参数
    path: '/detail/:skuid',
    component: () => import('@/pages/Detail'),
    meta: { show: true }
  },
  {
    // 成功加入购物车页面
    name:'addcartsuccess',
    path: '/addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true }
  },
  {
    // 购物车页面
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true }
  },
  {
    // 结算页
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 从购物车 去交易页面，放行
      if(from.path == '/shopcart'){
        next()
      }else{
        // 其他组件则停留在当前页面(中断当前的导航)
        next(false)
      }
    }
  },
  {
    // 支付页
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 从交易页 去支付页，放行
      if(from.path == '/trade'){
        next()
      }else{
        // 其他组件则停留在当前页面(中断当前的导航)
        next(false)
      }
    }
  },
  {
    // 支付成功页
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true }
  },
  {
    // 个人中心页
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    //通过children配置子级路由---二级路由
    children:[
      {
        // 我的订单
        path: 'myorder', // 二级路由不加 / ，要么从center开始写全
        component: () => import('@/pages/Center/MyOrder'),
        meta: { show: true }
      },
      {
        // 团购订单
        path: 'grouporder', 
        component: () => import('@/pages//Center/GroupOrder'),
        meta: { show: true }
      },
      {
        // 重定向 访问center 重定向到myorder
        path: '/center', 
        redirect:'/center/myorder',
      },
    ]
  },
  // 重定向，在项目跑起来的时候，访问/或者*，可以里面定向到首页
  {
    path: '*',
    redirect: 'home'
  },
]