// pay.js
Page({
  data: {
    width: null,
    height: null,
  },
  payAction: function (name) {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/pay!to.jsp',
      data: {
        code: that.data.code,
        xcxSession: xcxSession,
        name: name
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log(xcxSession + "支付成功返回" + that.data.code);
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
            console.log("请求微信服务器支付成功返回");
            console.log(res);
            wx.navigateBack({
              delta:1,
            })
          },
          'fail': function (res) {
            console.log("请求微信服务器支付失败返回");
            console.log(res);
          }
        })
      },
      fail: function (res) {
        // fail
        console.log("请求自己业务服务器支付失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete
      }
    })
  },
  pay:function(e){
    console.log(e);
    var name = e.currentTarget.id;
    var that = this;
    wx.login({
      success: function (res) {//用户登录成功
        wx.hideLoading();
        if (res.code) {
          var code = res.code;
          that.setData({ code: code });
          that.payAction(name);
        }
      }
    });
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          height: res.windowHeight + 'px'
        });
      }
    });
  },
  
})