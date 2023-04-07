import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入store仓库
import store from '@/store'
Vue.config.productionTip = false

// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
// 引入全局组件Carousel轮播图
import Carousel from '@/components/Carousel'
// 引入全局组件分页器Pagination
import Pagination from '@/components/Pagination'
// 按需引入element-ui
import { Button,MessageBox } from 'element-ui';
// 全局注册：靠 Vue.component('组件名',组件)；
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name, Button);
// ElementUI注册组件的时候，还有一种写法，挂在原型身上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 需要在入口文件引入mockServe.js：mock模拟数据，至少要执行一次
import '@/mock/mockServe'
// 引入swiper样式，样式没有暴露直接引入
import 'swiper/css/swiper.min.css'

// 统一引入api文件夹里面的全部请求函数：API为对象
import * as API from "@/api";


// 引入插件 --懒加载vue-lazyload
import VueLazyload from 'vue-lazyload'
import pkq from "@/assets/1.gif";
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: pkq,
})

// 引入表单校验插件vee-validate
import '@/plugins/validate'

 // 注册路由： router:router，省略 router
new Vue({
  render: h => h(App),
  // 可以让全部的组件都可以获取到$route和$router的属性
  // $route：路由，可以获取到路由信息（path、query、params）
  // $router：进行编程式导航路由跳转 push、replace
  router,
  // 在入口文件注册store仓库：此时组件身上会多了一个$store属性
  store,
  // 配置全局事件总线$bus this是当前的vm
  beforeCreate() {
    Vue.prototype.$bus = this
    // 将API挂载在Vue原型对象身上，所有组件都可以借用
    Vue.prototype.$API = API
  },
}).$mount('#app')
