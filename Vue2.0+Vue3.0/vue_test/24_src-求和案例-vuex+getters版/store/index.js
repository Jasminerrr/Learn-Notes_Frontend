// 该文件用于创建Vuex中最核心的store
// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 应用Vuex插件
Vue.use(Vuex)
// 准备actions——用于响应组件中的动作
const actions = {
  // 没有业务逻辑直接调用commit
  // context为上下文对象，里面包含很多方法。value为当前选项框的值
/*   jia(context,value){
    context.commit('JIA',value)
  },
  jian(context,value){
    context.commit('JIAN',value)
  }, */

  // 业务逻辑写在actions里面
  jiaOdd(context,value){
    if(context.state.sum % 2){
      context.commit('JIA',value)
    }
  },
  jiaWait(context,value){
    setTimeout(() => {
      context.commit('JIA',value)
    }, 500);
  }
}
// 准备mutations——用于操作数据（state）
const mutations = {
  // 此处JIA大写是因为mutations能直接操作数据
  JIA(state,value){
    state.sum += value
  },
  JIAN(state,value){
    state.sum -= value
  },
}
// 准备state——用于存储数据
const state = {
  sum:0
}
// 准备getters——用于将state里面的数据进行加工
// 逻辑复杂并且想复用，推荐用getters
const getters = {
  // 接收到的参数就是state
  bigSum(state){
    // 结果需要用return返回
    return state.sum * 10
  }
}
// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
})
