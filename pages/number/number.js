Page({

  /**
   * 页面的初始数据
   */
  data: {
    item1: ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
      "豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
      "津", "贵", "云", "桂", "琼", "青", "新", "藏",
      "蒙", "宁", "甘", "陕", "闽", "赣", "湘"],
    item2: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
      "A", "S", "D", "F", "G", "H", "J", "K", "L",
      "Z", "X", "C", "V", "B", "N", "M"],
    hidden1: false,
    hidden2: true,
    carNo: [],
  },
  //车牌输入获取焦点
  d1: function (e) {
    var that = this;
    if (that.data.carNo == '') {
      that.setData({
        hidden1: false,
        hidden2: true
      })
    } else {
      that.setData({
        hidden1: true,
        hidden2: false
      })
    };
    // var t_text = e.detail.value.length;
    // // console.log(t_text)
    // this.setData({
    //   t_length: t_text
    // }) 

  },
  //获取车牌省份
  sheng: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.sh);
    that.setData({
      carNo: e.currentTarget.dataset.sh
    })
    if (that.data.carNo != '') {
      that.setData({
        hidden1: true,
        hidden2: false
      })
    }
  },
  //获取车牌号码
  other: function (e) {
    var that = this;
    // console.log(e.currentTarget.dataset.ot);
    if (that.data.carNo.length === 2) {
      var carNo = that.data.carNo + "·" + e.currentTarget.dataset.ot;
    } else {
      var carNo = that.data.carNo + e.currentTarget.dataset.ot;
    }
    if (that.data.carNo.length >= 9) {
     return false;
    } 
    that.setData({
      carNo: carNo
    })
    // console.log(carNo)
  },
  //回删车牌
  del: function () {
    var that = this;
    var ss = that.data.carNo;
    console.log(ss);
    var s = ss.split('');
    console.log(s);
    console.log(s.slice(0, -1));
    if (s.slice(0, -1).length == 0) {
      that.setData({
        hidden1: false,
        hidden2: true
      })
    }
    // console.log(s.join('').slice(0, -1));
    var s = s.join('').slice(0, -1);
    that.setData({
      carNo: s
    })
    // console.log(that.data.carNo.length);

  },
  // //确认输入
  ok: function () {
    var that = this;
    if (this.data.carNo.length === 8 || this.data.carNo.length === 9) {
      wx.setStorage({
        key: 'carNo',
        data: that.data.carNo,
      })
      wx.showToast({
        title: '绑定成功',
        // icon: 'info',
        duration: 1000,
        mask: true
      });
      setTimeout(function() {
        // wx.navigateTo({
        //   url: '/pages/index/index',
        // })
        wx.navigateBack({
          delta: 1
        })
      },2000)
    }else {
      wx.showToast({
        title: '号码输入有误',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
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
    var that = this;
    wx.getStorage({
      key: 'carNo',
      success: function(res) {
        that.setData({
          carNo: res.data
        })
      },
    })
    setTimeout(function() {
      if (that.data.carNo == '') {
        that.setData({
          hidden1: false,
          hidden2: true
        })
      } else {
        that.setData({
          hidden1: true,
          hidden2: false
        })
      }
    },100)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
