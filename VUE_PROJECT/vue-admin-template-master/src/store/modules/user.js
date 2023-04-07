// 引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
// 获取token|设置token|删除token的函数
import { getToken, setToken, removeToken } from '@/utils/auth'
// 引入路由中的重置路由方法
import { resetRouter,asyncRoutes,anyRoutes,constantRoutes } from '@/router'
// 引入路由
import router from '@/router'

// 箭头函数--得到一个默认的state
const getDefaultState = () => {
  return {
    // 获取token
    token: getToken(),
    name: '',  // 存储用户名   
    avatar: '',  // 存储用户头像
    routes:[],  // 存储服务器返回菜单信息---根据不同角色，返回不同的标记信息，数组里面元素是字符串
    roles:[],  // 存储角色标记
    buttons:[],  // 存储按钮权限信息
    resultAsyncRoutes:[], // 对比后的结果--项目中已有的异步路由，与服务器返回的标记信息进行对比 最终需要展示的路由
    resultAllRoutes:[],  // 用户需要展示的所有路由的合并
  }
}

// state的值为调用箭头函数后返回的结果（写成箭头函数是为了后面可以清空数据）
const state = getDefaultState()

// 唯一能修改state的地方
const mutations = {
  // 重置state，用对象合并的方法清空数据
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 登录成功后存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name // 用户名
    state.avatar = userInfo.avatar  // 用户头像
    state.routes = userInfo.routes  // 菜单权限标记
    state.buttons = userInfo.buttons  // 按钮权限标记
    state.roles = userInfo.roles  // 用户角色标记
  },
  // 最终计算出来的异步路由
  SET_RESULTASYNCROUTES:(state,asyncRoutes) =>{
    // vuex 保存当前用户的异步路由，但还需要展示常量、任意路由
    state.resultAsyncRoutes = asyncRoutes
    // 用户需要展示的所有路由的合并
    state.resultAllRoutes = constantRoutes.concat(anyRoutes,asyncRoutes)
    // 给路由添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}

// 定义一个函数：异步路由与服务器返回的路由，两个数组进行对比
const computedAsyncRoutes = (asyncRoutes,routes)=>{
  // 过滤出当前用户需要展示的路由 filter将返回为true的元素放入新数组中
  return asyncRoutes.filter(item => {
    // 如果判断不为-1，证明有这个路由
    if(routes.indexOf(item.name != -1)){
      // 用递归过滤出childen子路由
      if(item.children&&item.children.length){
        item.children = computedAsyncRoutes(item.children,routes)
      }
      return true
    }
  })
}

//处理用户动作，可以写自己的业务逻辑或处理异步
const actions = {
  // 处理登录业务
  async login({ commit }, userInfo) {
    // 解构用户名和密码
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    // 注意：当前登录使用的是mock数据，code是20000
    if (result.code == 20000) {
      // 提交token 找服务器要用户的数据
      commit('SET_TOKEN', result.data.token)
      // 用户获取到token后 本地持久化存储---调用setToken函数
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  /* login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }, */

  // 获取用户信息
  /* getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }, */
 
  async getInfo({ commit, state }){
    let result = await getInfo(state.token)
    // 获取用户信息：返回数据包括：name、avatar、routes（不同用户应该展示哪些菜单的标记）、roles（用户角色信息）、buttons（按钮权限用的标记）
    const { data} = result
    if(result.code == 20000){
      // vuex存储用户所有的信息
      commit('SET_USERINFO', data)
      // 传入计算的异步路由与服务器返回的路由进行对比
      commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },

  // 用户退出登录业务
  /* logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }, */

  async logout({ commit, state }){
    let result = await logout(state.token)
    if(result.code == 20000){
      removeToken() // 要先移除token
      resetRouter()
      commit('RESET_STATE')
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

