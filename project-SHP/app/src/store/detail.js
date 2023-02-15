// 引入接口函数
import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'

// 产品详情模块的小仓库
const state = {
  goodInfo : {},
  // 游客临时身份 包装成一个函数
  uuid_token:getUUID()
}

//处理用户动作，可以写自己的业务逻辑或处理异步
const actions = {
  // 获取产品信息的action
  async getGoodInfo({commit},skuId){
    let result = await reqGoodsInfo(skuId)
    if(result.code == 200){
      commit('GETGOODINFO',result.data)
    }
  },
  // 加购产品或修改加购数量的action
  async addOrUpdateShopCart({commit}, {skuId,skuNum}){
    // 加购后发请求，前台将数据带给服务器，服务器存储成功后不需要返回数据 只需要返回code=200为操作成功
    // 因为服务器没有返回其余数据，所以此处不需要三连环存储数据
    let result = await reqAddOrUpdateShopCart(skuId,skuNum)
    // 发请求后需要判断返回的promise是成功还是失败
    if(result.code == 200){
      return 'ok';
    }else{
      return Promise.reject(new Error('fail'))
    }
  }
}

// 修改state的唯一手段
const mutations = {
  GETGOODINFO(state,goodInfo){
    state.goodInfo = goodInfo
  }
}

// 理解为计算属性，用于简化仓库数据，需要用return返回结果
// 接收到的参数就是state，对当前仓库的state进行加工
const getters = {
  // 路径导航简化的数据
  categoryView(state){
    // 如果网络不给力|没有网，state.goodInfo为空对象则.goodInfo为undefined 会警告
    // 所以计算新的属性值至少要返回为一个空对象
    return state.goodInfo.categoryView || {}
  },
  // 产品信息的简化
  skuInfo(state){
    return state.goodInfo.skuInfo || {}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList || []
  }
}

// 对外暴露
export default {
  state,
  mutations,
  actions,
  getters,
}