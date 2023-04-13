// app.js

// 通过es6语法按需引入方法
import {promisifyAll} from 'miniprogram-api-promise'
// 定义wxp=wx.p这个自定义属性，两个的值都指向同一个空对象
const wxp = wx.p = {}
// 调用方法，会将wx身上的所有基于回调函数的异步API进行promise化，转存到wxp对象身上，然后在页面中通过wx.p调用这些API
promisifyAll(wx,wxp)

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   * 用于初始化数据
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})

