// pages/contact/contact.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      colorList:[],
      // 定义节流阀
      isLoading:false
    },

    // 获取颜色的方法
    getColors(){
      // 获取颜色前将节流阀设为true，代表节流（不发请求）
      this.setData({
        isLoading:true
      })
      // 在发请求前需要先加载loading效果
      wx.showLoading({
        title: '数据加载中...',
      })
      wx.request({
        url: 'https://www.escook.cn/api/color',
        method:'GET',
        success:({data:res})=>{
          this.setData({
            // 旧数据与新数据合并后的结果，赋值给colorList
            colorList:[...this.data.colorList,...res.data]
          })
        },
        // 请求完成：无论请求成功与失败，都需要隐藏loading提示框
        complete:()=>{
          wx.hideLoading()
          // 请求完成后设置节流阀为false，可以继续发请求
          this.setData({
            isLoading:false
          })
        }
      })
    },

    /**
     * 生命周期函数--监听页面加载（第一次进入页面调用一次，初始化页面数据）
     */
    onLoad(options) {
      // 判断节流阀再去发请求：如果为 true则不发请求
      if(this.data.isLoading) return
      // 页面加载时获取颜色
      this.getColors()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成（修改页面内容，一个页面只调用一次）
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
      // 上拉触底中获取随机颜色的方法
      this.getColors()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})