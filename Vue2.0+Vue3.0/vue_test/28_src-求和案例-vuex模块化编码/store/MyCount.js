// 求和相关配置
export default {
  // 开启命名空间
  namespaced:true,
  // 准备actions——用于响应组件中的动作
  actions:{
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
  },
  // 准备mutations——用于操作数据（store）
  mutations:{
    JIA(state,value){
      state.sum += value
    },
    JIAN(state,value){
      state.sum -= value
    },
  },
  // 准备state——用于存储数据
  state:{
    sum:0, // 当前的和
    school:'尚硅谷',
    subject:'前端',
  },
  // 准备getters——用于将state里面的数据进行加工,逻辑复杂并且想复用，推荐用getters
  getters:{
    // 接收到的参数就是state
    bigSum(state){
      // 结果需要用return返回
      return state.sum * 10
    }
  }
}