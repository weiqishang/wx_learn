var app = getApp()
Page({
  data: {
    userInfo: {},
    wheight: ""
  },
  onLoad: function (options) {

  },
  payAction: function (xcxSession) {
    var that = this;

    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/pay!to.jsp',
      data: {
        code: that.data.code,
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',//
        name: 'team'//userId是被收藏的人
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log(xcxSession+"支付成功返回" + that.data.code);
        console.log(res);
        var payData = res.data.json;
        console.log(payData);
        wx.requestPayment({
          'timeStamp': payData.timeStamp,
          'nonceStr': payData.nonceStr,
          'package': payData.package,
          'signType': 'MD5',
          'paySign': payData.paySign,

          'success': function (res) {
            console.log("支付成功返回");
            console.log(res);
            wx.navigateTo({
              url: '../team/success/success',
            })
          },
          'fail': function (res) {
            console.log("支付失败返回");
            console.log(res);
          }
        })
      },
      fail: function (res) {
        // fail
        console.log("支付失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete
      }
    })
  },
  kaiTongNow: function () {
    var that = this;
    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
      app.getXcxSession();
      return ;
    }
    wx.login({
      success: function (res) {//用户登录成功
        wx.hideLoading();
        if (res.code) {
          var code = res.code;
          that.setData({ code: code });
          that.payAction(xcxSession);
        }
      }
    });


  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    //String3
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    //String4
    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
      app.getXcxSession();
    }else{
      this.setData({ xcxSession: xcxSession, ownerId: ownerId });
    }
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight);
        that.setData({
          wheight: res.windowHeight,
        });
      }
    })
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    //String5
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    //String6
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    //String7
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    //String8
  }
})