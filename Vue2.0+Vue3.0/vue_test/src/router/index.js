  // 该文件专门用于创建整个应用的路由器
  import VueRouter from 'vue-router'

  // 引入组件
  import MyAbout from '../pages/MyAbout'
  import MyHome from '../pages/MyHome'
  import MyNews from '../pages/MyNews'
  import MyMessage from '../pages/MyMessage'
  import MyDetail from '../pages/MyDetail'

  // 创建并暴露一个路由器 （创建router实例对象，去管理一组一组的路由规则）
  const router = new VueRouter({
    routes:[
      {
        name:'guanyu', // 给路由命名
        path:'/about',
        component:MyAbout,
        meta:{title:'关于'},
      },
      {
        name:'zhuye',
        path:'/home',
        component:MyHome,
        meta:{title:'主页'},
        //通过children配置子级路由
        children:[ 
          {
            name:'xinwen',
            path:'news', //此处一定不要写：/news
            component:MyNews,
            meta:{isAuth:true,title:'新闻'}, // 配置meta 路由元信息
          },
          {
            name:'xiaoxi',
            path:'message',
            component:MyMessage,
            meta:{isAuth:true,title:'消息'},
            children:[
              {
                name:'xiangqing',// 给路由命名
                path:'detail', 
                component:MyDetail,
                meta:{title:'详情'},

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
  
  // 全局前置路由守卫
  // beforeEach:指定一个路由 初始化的时候被调用、每次切换之前被调用
  router.beforeEach((to,from,next)=>{
    console.log('全局前置路由守卫',to,from);
    if(to.meta.isAuth){// 判断当前路由是否需要鉴定权限
      if(localStorage.getItem('school') === 'abc'){ // 权限控制的具体规则
        next()// 放行
      }else{
        alert('学校名不对，无权限')
      }
    }else{
      next()
    }
  })
  router.afterEach((to,from)=>{
    console.log('全局后置路由守卫',to,from);
    document.title = to.meta.title || '硅谷系统'
  })
  export default router