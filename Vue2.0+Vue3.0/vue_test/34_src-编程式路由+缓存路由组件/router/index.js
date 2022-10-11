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

              // props第一种写法(不推荐)：值为对象，该对象中所有的key-value都会以props的形式传给MyDetail组件
              // props:{id:666,b:'hello'}

              // props第二种写法：值为布尔值，若为真，则会把该路由组件收到的所有params参数，以props的形式传给MyDetail组件
              // props:true

              // props第三种写法(推荐) ：值为回调函数，router自动调用，并默认传入参数$route
              props($route){
                return {
                  id:$route.query.id,
                  title:$route.query.title
                }
              }
            }
          ]
        }
      ]
    }
  ]
})