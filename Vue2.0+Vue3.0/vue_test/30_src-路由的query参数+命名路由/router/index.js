// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入组件
import MyAbout from '../pages/MyAbout'
import MyHome from '../pages/MyHome'
import MyNews from '../pages/MyNews'
import MyMessage from '../pages/MyMessage'
import MyDetail from '../pages/MyDetail'

// 创建并暴露一个路由器 （创建router实例对象，去管理一组一组的路由规则）
export default new VueRouter({
  routes:[
    {
      name:'guanyu', // 给路由命名
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
          path:'message',
          component:MyMessage,
          children:[
            {
              name:'xiangqing',// 给路由命名
              path:'detail', 
              component:MyDetail,
            }
          ]
        }
      ]
    }
  ]
})