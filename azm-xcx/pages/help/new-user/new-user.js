// mycard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topurl:"https://media.ccyishe.com/izm-html/xszd.png",
    zd1url: "https://media.ccyishe.com/izm-html/zd1.png",
    queryV: "https://media.ccyishe.com/izm-html/14.mp4",
    zd2: "http://media.ccyishe.com/izm-html/zd2.png",
    zd3: "http://media.ccyishe.com/izm-html/zd3.png",
    zd4: "http://media.ccyishe.com/izm-html/zd4.png",
    zd5: "http://media.ccyishe.com/izm-html/zd5.png",
    zd6: "http://media.ccyishe.com/izm-htmlzd6.png",
    zd7: "http://media.ccyishe.com/izm-html/zd7.png",
    zd8: "http://media.ccyishe.com/izm-html/zd8.png",
    zd9: "http://media.ccyishe.com/izm-html/zd9.png"
  },
  focusUs: function () {
    wx.navigateTo({
      url: '../../card/follow-us/follow-us',
    })
  },
  moveToHome: function () {
    console.log("调整");
    var ownerId = wx.getStorageSync("myId");
    wx.switchTab({
      url: '../../home2/home2?tuijianrenId=' + ownerId,
    })
  },
  checkIsLogin: function () {//判断是否登录
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      this.invokeWhenXcxSessionNone();
      return;
    }
  }
  , 
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
                  console.log("app.js成功返回");
                  console.log(res);
                  var xcxSession = res.data.json.xcxSession;//当前使用小程序的用户令牌
                  var userId = res.data.json.userId;//当前使用小程序的注册用户id
                  wx.setStorageSync('xcxSession', xcxSession);
                  wx.setStorageSync('myId', userId);
                 
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    },
  onShareAppMessage: function () {
    var ownerId = wx.getStorageSync("myId");
    console.log("pages/help/new-user/new-user?tuijianrenId=" + ownerId);

    var that = this;
    return {
      title: '爱知脉：新用户如何快速上手？' ,
      path: "pages/help/new-user/new-user?tuijianrenId=" + ownerId,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
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

    this.checkIsLogin();
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
    this.checkIsLogin();
  }
})