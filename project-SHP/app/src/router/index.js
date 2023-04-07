// 该文件专门用于创建整个应用的路由器
import Vue from 'vue'
// 引入路由插件
import VueRouter from 'vue-router'
// 使用路由插件
Vue.use(VueRouter)
// 引入路由
import routes from './routes'
// 引入store仓库
import store from '@/store'
// 保存一份VueRouter原型对象上的push和replace方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push和replace，封装成一个函数
// 第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个：失败的回调
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve || reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve || reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}
// 创建并暴露一个router实例对象
const router = new VueRouter({
  // 配置路由
  // routes:routes
  // 对象简写kv一直省略v
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // 返回的y：指滚动条距离顶部的距离,最小的是0 没有负数
    return {y : 0}
  }
})

// 全局前置路由守卫：在路由跳转之前，对路由进行权限控制
// async加到最近的函数
router.beforeEach(async (to, from, next) => {
  // next()
  // 用户登录了才有token
  let token = store.state.user.token
  // 获取用户名
  let name = store.state.user.userInfo.name
  // 用户登录 判断当前路由是否需要进行权限控制
  if (token) {
    //权限控制的具体规则--如果用户已经登录并且要去login，只能停留在首页
    if(to.path == '/login'){
      next('/home')
    }else{
      // 用户登录 且拥有用户信息，但要去除了 login以外的页面
      if(name){
        // 放行
        next()
      }else{
        try {
          // 登录 且没有用户信息，则再路由跳转之前 派发action让仓库存储用户信息
          await store.dispatch('getUserInfo')
          // 获取到用户信息 放行
          next()
        } catch (error) {
          // 当token失效，获取不到用户信息，重新登录
          // 清除前台token(退出登录) 
          await store.dispatch('userLogout')
          // 放行到登录页面
          next('/login')
        }
      }
    }
  } else {
    // 未登录：不能去交易trade、支付pay/paysuccess、个人中心center相关路由，
    // 点击这些路由只能去登录页面
    let toPath = to.path
    // str.indexOf()：根据字符串返回位置
    // 如果找不到该字符串，则返回 -1； 不等于-1 就是有这个路由
    if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
      // 把未登录时，想去的路由信息用query参数存在地址栏（路由）
      next('/login?redirect=' + toPath)
    }else{
      // 其他路由则放行
      next()
    }
  }
})
export default router