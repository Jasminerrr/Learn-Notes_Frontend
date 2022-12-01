// 登录与注册的两个模块
// 引入请求接口函数
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
// 引入token函数
import {setToken,getToken,removeToken} from '@/utils/token'
const state = {
  // 验证码
  code:'',
  // 调用getToken函数，获取token
  token:getToken(),
  // 用户信息
  userInfo:{}
}
const actions ={
  // 获取验证码
  async getCode({commit},phone){
    // 常见验证码一般是4或6位
    let result = await reqGetCode(phone)
    // 此接口是直接将验证码返回（省钱），正常应该是讲验证码发到用户手机上 不用以下操作
    if(result.code == 200){
      commit('GETCODE',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户注册
  async userRegister({commit},user){
    let result = await reqUserRegister(user)
    // 此处不需要commit，因为没有返回值
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户登录 data：包括用户名和密码
  async userLogin({commit},data){
    let result = await reqUserLogin(data)
    if(result.code == 200){
      // 登录成功后，服务器下发token，是用户唯一标识符(令牌：字符串)，前台持久化储存token
      // 注意：vuex仓库存储数据不是持久化(刷新会消失)
      // 之后会经常带着token找服务器要用户的数据
      commit('USERLOGIN',result.data.token)
      // 用户获取到token后 持久化存储---调用setToken函数
      setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}){
    let result = await reqUserInfo()
    if(result.code == 200){
      // 提交用户信息
      commit('GETUSERINFO',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 退出登录
  async userLogout({commit}){
    // 向服务器发请求，通知服务器清除token
    let result = await reqLogout()
    // 请求成功则清除本地state下的token和userInfo-- 需要提交mutation里面去修改state
    if(result.code == 200){
      commit('CLEAR')
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  }
}
const mutations ={
  // 获取验证码
  GETCODE(state,code){
    state.code = code
  },
  // 用户登录
  USERLOGIN(state,token){
    state.token = token
  },
  // 获取用户信息
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  // 清除用户本地数据
  CLEAR(state){
    // 将仓库中相关用户信息清空
    state.token = '',
    state.userInfo = {}
    // 调用removeToken函数 清空本地存储数据
    removeToken()
  }
}
const getters = {}
export default {
  state,
  actions,
  mutations,
  getters
}