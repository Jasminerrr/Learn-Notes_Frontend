// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 全局混合
import {mixin,mixin2} from './mixin'
Vue.mixin(mixin) // Vue身上的方法mixin()
Vue.mixin(mixin2)
// 关闭Vue的生产提示
Vue.config.productionTip = false;
// 创建vm
new Vue({
    el: '#app',
    render: h => h(App)
})