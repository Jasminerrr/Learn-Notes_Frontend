// pages/message/message.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      count:0
    },

    // 1. 定义方法，传给子组件，供自组件调用
    syncCount(e){
      this.setData({
        // 4. 父组件通过e.detail接收子组件传过来的数据(value为最新的值)，然后绑定给data里面的数据
        count:e.detail.value
      })
    },

    // this.selectComponent('id或class选择器')获取子组件的实例对象
    getChild(){
      const child = this.selectComponent('.child')
      // 获取实例后在父组件里面调用子组件的方法,也可以直接修改数据
      child.setData({
        // 此处只能使用child，指子组件，this指向本页面的实例
        count:child.properties.count +1
      })
      child.addCount()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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