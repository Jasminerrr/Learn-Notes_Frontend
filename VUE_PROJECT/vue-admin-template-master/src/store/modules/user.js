import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

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
      // 用户获取到token后 持久化存储---调用setToken函数
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
    const { name, avatar } = result.data
    if(result.code == 20000){
      commit('SET_NAME', name)
    commit('SET_AVATAR', avatar)
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

