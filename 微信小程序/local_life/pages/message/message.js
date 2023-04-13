// pages/message/message.js
// 实现全局数据共享
// 1. 先按需导入
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import { store} from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 2. 在此处调用方法，将里面需要的字段方法绑定到此页面的this实例身上
    // 将返回值挂载在this的自定义属性上
    this.storeBindings = createStoreBindings(this,{
      store,  // 数据源
      fields:['numA','numB','sum'],// 需要将哪些数据绑定到页面上,是数组
      actions:['updateNum1']// 需要的方法，是个数组
    })
  },

  // 按钮事件处理函数，接收一个事件对象e，可以拿到点击时穿的参数step值
  btnHandler1(e){
    // 直接调用在store写好的方法
    this.updateNum1(e.target.dataset.step)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 3. 通过自定义属性提供的方法来清理数据
    this.storeBindings.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})