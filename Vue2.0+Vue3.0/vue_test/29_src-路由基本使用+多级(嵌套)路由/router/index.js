// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import MyAbout from '../pages/MyAbout'
import MyHome from '../pages/MyHome'
import MyNews from '../pages/MyNews'
import MyMessage from '../pages/MyMessage'

// 创建并暴露一个路由器 （创建router实例对象，去管理一组一组的路由规则）
// 整个应用只有一个router，可以通过组件实例对象身上的$router属性获取。
export default new VueRouter({
  // 配置路由规则
  routes:[
    {
      path:'/about',
      component:MyAbout
    },
    {
      path:'/home',
      component:MyHome,
      //通过children配置子级路由
      children:[ 
        {
          path:'news', //此处一定不要写：/news
          component:MyNews
        },
        {
          path:'message', //此处一定不要写：/message
          component:MyMessage
        }
      ]
    }
  ]
})