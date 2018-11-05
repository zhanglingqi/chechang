
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { value: '2元优惠券', name: '停车2元优惠券', checked: 'false'},
      { value: '3元优惠券', name: '停车3元优惠券', checked: 'false'},
      { value: '4元优惠券', name: '停车4元优惠券', checked: 'false'},
      { value: '不使用优惠券', name: '不使用优惠券',checked: 'true' },
    ],
    //优惠券信息
    coupon:'不使用优惠券'
  },
  onTapDayWeather() {
    const that = this
    //支付等待效果
    that.setData({
      loading: true
    })
     wx.showModal({
       title: '',
       content: '是否要登录微信',
       success: function (txt) {
         if (txt.confirm) {
           wx.getNetworkType({
             success(resWife) {
               if (resWife.networkType == 'none') {
                 wx.showToast({
                   title: '网络连接失败，请检查网络',
                   icon: 'none',
                   duration: 2000,
                   mask: true
                 })
               } else {
                //  登录 获得用户的code
                 wx.login({
                   success: function (loginRes) {
                     if (loginRes.code) {
                       wx.showToast({
                         title: '登录成功',
                         icon: 'none',
                         duration: 2000,
                         mask: true
                       })
                      // 登录成功 用code值获得openid
                       var https = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx8af403e54636eeac&secret=a913a762186a1830f9ad9669cd5a29ff&js_code=' + loginRes.code +'&grant_type=authorization_code';
                       console.log(https)
                      wx.request({
                        url: https,//请求地址
                        method:'GET',
                        data: {
                          "code" : loginRes.code
                        },
                        header: {
                          'content-type': 'application/json'
                        },
                        success: function (resPy) {
                          console.log(resPy)
                          if (resPy.data.openid) {
                            wx.setStorage({
                              key: 'openid',
                              data: resPy.data.openid,
                            })
                            //读取openid
                          wx.getStorage({
                            key: 'openid',
                            success: function (res) {
                              //取到openid后发送请求到后台换取需要的数据
                              console.log(res.data)
                              wx.request({
                                url: 'https://rd.ghsapi.guangheplus.com/spPay/payFee',//后台给我的数据
                                header: {
                                  'content-type': 'application/x-www-form-urlencoded',
                                  'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2MjM2NiIsInVzZXJOYW1lIjoi55So5oi3MTc1NzU3IiwiaWF0IjoxNTM5MzI2MDQ2LCJleHAiOjE1NDE5MTgwNDZ9.9_KkPLVQ7SXLRS6Kb3wps9UKy_8RRd5cM6FbuQufuKM'
                                },
                                data: {
                                  openId : res.data,
                                  ip:'192.168.1.179',
                                  feeType: 'car',
                                  payMoney:0.01
                                },
                                method: 'POST',
                                //请求发送成功后的数据
                                success(resS) {
                                  // console.log(resS)
                                  const payargs = resS.data.data;
                                  console.log(payargs);
                                  wx.requestPayment({
                                    timeStamp: payargs.timeStamp,
                                    nonceStr: payargs.nonceStr,
                                    package: payargs.package,
                                    signType: payargs.signType,
                                    paySign: payargs.paySign
                                  });
                                  wx.navigateTo({
                                    url: '/pages/index/index',
                                  })
                                  that.setData({
                                    loading:false
                                  })
                                }
                              })
                            },
                          })
                          } else {
                            that.setData({
                              loading: false
                            })
                            wx.showToast({
                              title: '支付失败，请重新支付',
                              icon: 'none',
                              duration: 2000,
                              mask: true
                            })
                          }
                        },
                        fail: function (err) {
                          if(err) {
                            wx.showToast({
                              title: '支付失败，请重新支付',
                              icon: 'none',
                              duration: 2000,
                              mask: true
                            })
                          }
                        } 
                      })
                     }
                   }
                 })
               }
             }
           })
         } else if (txt.cancel) {
           wx.showToast({
             title: '支付失败，必须登录微信',
             icon: 'none',
             duration: 3000,
             mask: true
           });
           that.setData({
             loading: false
           });
           wx.redirectTo({
             url: '/pages/index/index',
           })
         }
       }
     })
    
   
  },
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },
  //优惠券单选框的方法
  radioChange(e) {
    var that = this;
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    console.log(e)
    that.setData({
      coupon : e.detail.value
    })
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
      // console.log(items[i].checked + items[i].value + e.detail.value)
    }
    
    this.setData({
      items
    })
  },
  //显示对话框
  showModal: function () {
    //点击实现默认选中
    
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
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