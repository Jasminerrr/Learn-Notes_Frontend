// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:{},
    shopList:[], // 商品列表
    page:1, // 当前页码值默认请求第一页数据
    pageSize:10, // 每页限制数据条数
    total:0, // 总数据
    isLoading:false // 节流阀
  },

  /**
   * 生命周期函数--监听页面加载（获取页面初始数据）,option:可以获取当前页面路径中的参数
   */
  onLoad(options) {
    // 需要将options参数在data里面转存，供其他方法使用（因为函数内部不可读）
    this.setData({
      query:options
    }),
    // 加载时获取商铺列表
    this.getShopList()
  },

  // 以分页的形式获取商铺列表数据的方法
  getShopList(cb){
    // 设置节流阀，不再请求数据
    this.setData({
      isLoading:true
    }),
    // 发请求前展示loading效果
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method:'GET',
      data:{
        _page:this.data.page,
        _limit:this.data.pageSize
      },
      success:(res)=>{
        // 绑定data里面的数据
        this.setData({
          // 需要将数组拼接
          shopList:[...this.data.shopList,...res.data],
          // 属性有符号需要用[]获取，值为字符串，可以-0强制性转换为数字
          total:res.header['X-Total-Count'] - 0  
        })
      },
      // 请求结束后回调，无论成功失败
      complete:() => {
        // 隐藏loading效果
        wx.hideLoading()
        // 节流阀设为false，可以发请求
        this.setData({
          isLoading:false
        })
        // 需要按需执行关闭下拉刷新窗口效果（只有下拉动作后才去调用）
        // wx.stopPullDownRefresh()
        // 如果传了cb则执行，不传cb为undefined，则自动屏蔽不执行
        cb && cb()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成（可以设置页面的内容）
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.title,
    })
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
    // 1. 需要重置关键性数据
    this.setData({
      page:1,
      shopList:[],
      total:0
    })
    // 2. 需要根据重置后的数据，重新发起第一页的数据请求,传递关闭下拉窗口回调给cb
    this.getShopList(()=>{
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 判断是否还有下一页的数据
    const {page,pageSize,total} = this.data
    if( page*pageSize >= total) {
      // 证明已经没有下一页数据
      return wx.showToast({ // 返回消息提示框
        title: '数据加载完毕！',
        icon:'none'// 不显示图标
      })
    }
    // 判断节流阀
    if(this.data.isLoading) return
    // 上拉触底后，让page+1
    this.setData({
      page:this.data.page + 1
    })
    // 再重新获取列表数据
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})