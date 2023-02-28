import mockRequest from '@/utils/mockRequest'
const state = {
  list:{}
}
const actions = {
  // 发请求，获取首页的mock数据
  async getData({commit}){
    let result = await mockRequest.get('./home/list')
    if(result.code = 20000){
      commit('GETDATA',result.data)
    }
  }
}
const mutations = {
  GETDATA(state,list){
    state.list = list
  }
}
const getters = {}

// 对外暴露
export default {
  state,
  mutations,
  actions,
  getters
}
