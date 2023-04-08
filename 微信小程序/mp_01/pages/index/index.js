// pages/index/index.js

// 在index.js中调用Page()函数，传递配置项
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'hello world',
    imgSrc:'https://ts1.cn.mm.bing.net/th/id/R-C.4f1d74492e0f09009d36be0b833261d6?rik=5Vp2RZMaab8g8g&riu=http%3a%2f%2fwww.sucaijishi.com%2fuploadfile%2f2017%2f0808%2f20170808120810643.png&ehk=bjoS%2fqo%2fApoOQ6kAIxzWJJ8zMV4hbxPEdbOCqworshI%3d&risl=&pid=ImgRaw&r=0',
    // Math.random()：生成0-1的随机数字，*10是1-10
    randomNum1:Math.random() * 10,

  },
  // 定义时间处理函数
  btnTapHandler(e){ 
    console.log(e);
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