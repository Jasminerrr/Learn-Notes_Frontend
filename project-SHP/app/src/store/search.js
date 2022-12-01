// search模块的小仓库
import {reqGetSearchInfo} from '@/api'
// 存储数据的地方
const state = {
  // 仓库初始的状态（数组或对象由服务器返回的数据决定）
  searchList:{},
}

// 修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList
  }
}

//处理用户动作，可以写自己的业务逻辑或处理异步
const actions = {
  // 获取search模块的数据,params={}：如果有数据用传过来的数据，没有就是空对象
  async getSearchList({commit},params={}){
    // 调用接口，等待结果 
    // 调用函数获取服务器数据的时候，至少要传递一个参数（空对象）
    // params形参：当用户派发action的时候，第二个参数传递过来的至少是一个空对象
    let result = await reqGetSearchInfo(params)
    if(result.code == 200){
      commit('GETSEARCHLIST',result.data)
    }
  }
}
// 理解为计算属性，用于简化仓库数据，
// 接收到的参数就是state，对当前仓库的state进行加工
const getters = {
  goodsList(state){
    // 结构需要用return返回
    // 如果网络不给力|没有网，state.searchList为空对象则.goodsList为undefined 会警告
    // 计算新的属性值至少要为一个空数组
    return state.searchList.goodsList || [];
  },
  trademarkList(state){
    return state.searchList.trademarkList;
  },
  attrsList(state){
    return state.searchList.attrsList;
  },
}

// 对外暴露
export default {
  state,
  mutations,
  actions,
  getters,
}