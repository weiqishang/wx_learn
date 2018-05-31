var app = getApp()
Page({

  data: {
    placeHolder:'',
    tiXianMoney:0,
  },
  tixian:function(){
    var tiXianMoney = this.data.tiXianMoney;
    var placeHolder = this.data.placeHolder;
    // if (tiXianMoney!=placeHolder){
    //   wx.showToast({
    //     title: '请正确输入金额',
    //     icon: 'loading',
    //     duration: 1000
    //   })
    //   return;
    // }
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/transfer.jsp',
      data: {
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("提现返回");
        console.log(res);
        if (res.data.result=="success"){
          wx.showToast({
            title: '提现成功，请查看微信钱包！',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },1200);
        }else{
          wx.showToast({
            title: '企业账户的金额不足，请稍后再试……',
            icon: 'loading',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  setTiXianMoney:function(e){
    var value = e.detail.value;

    this.setData({ tiXianMoney:value});
  }, 
  invokeWhenXcxSessionNone: function () {
    var that = this;
    wx.login({
      success: function (res) {//用户登录成功

        //wx.hideLoading();
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({//获取用户信息

            success: function (res) {
              console.log("用户登录成功");
              var encryptedData = res.encryptedData;
              var iv = res.iv;
              console.log(code);

              console.log(encryptedData);
              console.log(iv);
              wx.request({//发到服务器，进行解密数据
                url: 'https://m.ccyishe.com/page/xcx/user!xcxSession.jsp',
                method: "POST",
                data: {
                  code: code,
                  encryptedData: encryptedData,
                  iv: iv
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                 
                },
                fail: function (res) {
                  wx.showToast({
                    title: '授权失败,请下拉刷新',
                    icon: 'loading',
                    duration: 2000
                  })
                }
              })
            },
            fail: function (res) {
              wx.openSetting({
                success: function (res) {

                }
              })
            }
          })
        } else {
          wx.showToast({
            title: '授权失败,请下拉刷新',
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log("登录失败");
        console.log(res);
        wx.showToast({
          title: '授权失败,请下拉刷新',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log("最后执行了");
      }
    });
  },
  onLoad: function (options) {
    var money = options.money; //100;//
    this.setData({placeHolder:money});
    this.invokeWhenXcxSessionNone();
  
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  }
})