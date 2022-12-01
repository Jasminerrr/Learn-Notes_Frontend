import {reqCartList,reqDeleteCartById,reqUpdataCheckedById} from '@/api'
const state = {
  cartList : []
}
const actions = {
  // 获取购物车列表数据
  async getShopCart({commit}){
    let result = await reqCartList()
    if(result.code == 200){
      commit('GETSHOPCART',result.data)
    }
  },
  // 删除购物车某个产品
  async deleteCartListBySkuId({commit},skuId){
    let result = await reqDeleteCartById(skuId)
    // 不需要仓库返回数据，不需要三连环，但是组件需要成功或失败的结果
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 修改购物车某个产品选中状态
  async updataCheckedById({commit},{skuId,isChecked}){
    let result = await reqUpdataCheckedById(skuId,isChecked)
    // 不需要仓库返回数据，不需要三连环，但是组件需要成功或失败的结果
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除选中状态的全部产品
  // context:小仓库，里面有dispatch(派发action)，commit(提交mutations 修改state)，getters(计算属性)，state(当前仓库数据)
  deleteAllCheckedCart({dispatch,getters}){
    // 1. 获取购物车中全部产品：是数组
    let promiseArr = []
    // 2. 遍历购物车的产品
    getters.cartList.cartInfoList.forEach(item => {
      let result = item.isChecked == 1 ? dispatch('deleteCartListBySkuId',item.skuId) : ''
      // 4. 将每次返回的Promise添加到数组中
      promiseArr.push(result)
    });
    // Promise.all方法：只要一个失败，状态则失败，当数组中所有Promise都成功，返回新的实例状态才成功
    return Promise.all(promiseArr)
  },
  // 修改全选框的状态---全部产品勾选状态
  updataAllCartIsChecked({dispatch,state},isChecked){
    // 1. 获取购物车中全部产品：是数组
    let promiseArr = []
    // 2. 遍历购物车的产品
    state.cartList[0].cartInfoList.forEach(item => {
      let result = dispatch('updataCheckedById',{skuId:item.skuId,isChecked})
      // 4. 将每次返回的Promise添加到数组中
      promiseArr.push(result)
    });
    // Promise.all方法：只要一个失败，状态则失败，当数组中所有Promise都成功，返回新的实例状态才成功
    return Promise.all(promiseArr)
  }
}
const mutations = {
  GETSHOPCART(state,cartList){
    // state.cartList为仓库state中的cartList = 形参cartList
    state.cartList = cartList
  }
}
const getters = {
  cartList(state){
    // 计算购物车数组中的第一个对象，如数组为空，至少返回为一个空对象
    return state.cartList[0] || {}
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}