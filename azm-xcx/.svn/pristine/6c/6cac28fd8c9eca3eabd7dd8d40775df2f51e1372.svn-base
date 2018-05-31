
//获取应用实例
var app = getApp()
Page({
  data: {
    ownerId: "",

    newUser: 1,
  },
  useZm: function () {
    if (this.data.newUser) {
      wx.navigateTo({
        url: '../../user/setcard/my-company/my-company',
      })
    } else {
      wx.reLaunch({
        url: '../../card/index',
      })
    }
  },
  btn_izm: function () {
    wx.navigateTo({
      url: "/pages/card/index",
    })
  },
  checkUserIsIn: function () {
    var that = this;
    wx.login({
      success: function (res) {//用户登录成功
        wx.hideLoading();
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({//获取用户信息
            success: function (res) {
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
                  console.log("查询用户是否注册成功");
                  console.log(res);
                  if (res.data.json.userId != '0') {
                    that.setData({ newUser: 0 });
                  }
                },
                fail: function (res) {
                  console.log("查询用户是否注册失败");
                  console.log(res);
                }
              })
            }
          })
        } else {
          console.log('用户登陆状失败' + res.errMsg);
        }
      }
    });
  },
  getXcxSession: function () {//点赞操作的时候，先获取点赞者的id
  var that = this;
      wx.login({
        success: function (res) {//用户登录成功
          wx.hideLoading();
          if (res.code) {
            var code = res.code;
            wx.getUserInfo({//获取用户信息
              success: function (res) {
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
                    console.log("获取点赞者id成功返回");
                    console.log(res);
                    var xcxSession = res.data.json.xcxSession;
                    var ownerId = res.data.json.userId;

                    that.setData({ ownerId: ownerId});
                  },
                  fail: function (res) {
                    console.log("或者点赞着id失败返回");
                    console.log(res);
                  }
                })
              }
            })
          } else {
            console.log('用户登陆状失败' + res.errMsg);
          }
        }
      });
  },
  onLoad: function (options) {
    this.getXcxSession();

    this.checkUserIsIn();
    this.setData({
      ownerId: options.ownerId
    })
    if (options.ownerId!='0'){
      wx.setStorageSync("parentOne", options.ownerId);
    }
    
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '直销如何获取精准人脉?',
      path: "/pages/notes/find-connection/find-connection?ownerId=" + that.data.ownerId,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }
})
