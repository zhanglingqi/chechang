Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 停车场
    title: "褐石物业停车场",
    //停车费
    hour:2,
    //总车位
    total:1000,
    //剩余车位
    residue:300,
    //车牌号
    plate:[],
    //车费数量
    number:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'carNo',
      success: function (res) {
        that.setData({
          plate: res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // this.init();//初始化页面的接口请求
    wx.stopPullDownRefresh();//关闭下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})