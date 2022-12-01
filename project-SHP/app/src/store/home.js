// home模块的小仓库
// 引入接口函数
import {reqFloorList, reqGetBannerList, reqgetCategoryList} from '@/api'

// 存储数据的地方
//state中数据默认值:要看服务器返回对象或数组（根据接口返回值初始化）
const state = {
  // home仓库种存储三级菜单的数据
  categoryList: [],
  // home仓库中轮播图的数据
  bannerList:[],
  // floor组件的数据
  floorList:[]
}
// 修改state的唯一手段
const mutations = {
  GETCATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  GETBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  GETFLOORLIST(state,floorList){
    state.floorList = floorList
  }
}
//处理用户动作，可以写自己的业务逻辑或处理异步
const actions = {
  // 这里可以写业务逻辑，但不能直接修改state,此处是结构赋值写法，把context里面的commit解构出来
  // 通过API接口函数的调用，向服务器发请求，获取服务器的数据
  async getCategoryList({commit}){
    let result = await reqgetCategoryList()
    if(result.code == 200){
      commit('GETCATEGORYLIST',result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({commit}){
    let result = await reqGetBannerList()
    if(result.code == 200){
      commit('GETBANNERLIST',result.data)
    }
  },
  // 获取floor数据
  async getFloorList({commit}){
    let result = await reqFloorList()
    if(result.code == 200){
      // 提交mutation
      commit('GETFLOORLIST',result.data)
    }
  }
}
// 理解为计算属性，用于简化仓库数据，对state进行加工
const getters = {}

// 对外暴露
export default {
  state,
  mutations,
  actions,
  getters,
}