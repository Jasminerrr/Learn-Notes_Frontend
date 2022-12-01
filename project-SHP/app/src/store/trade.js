// trade模块的小仓库
import {reqAddressInfo,reqOrderInfo} from '@/api'
const state = {
  // 地址
  address: [],
  // 商品清单
  orderInfo: {}
}
const actions = {
  // 获取用户地址信息
  async getUserAddress({commit}){
    let result = await reqAddressInfo()
    if(result.code == 200){
      commit('GETUSERADDRESS',result.data)
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取商品清单数据
  async getOrderInfo({commit}){
    let result = await reqOrderInfo()
    if(result.code == 200){
      commit('GETORDERINFO',result.data)
    }
  }
}
const mutations = {
  // 获取用户地址信息
  GETUSERADDRESS(state,address){
    state.address = address
  },
  // 获取商品清单数据
  GETORDERINFO(state,orderInfo){
    state.orderInfo = orderInfo
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}