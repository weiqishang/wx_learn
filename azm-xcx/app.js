//app.js
App({
  onHide: function () {
    wx.removeStorageSync('personImg');
    wx.removeStorageSync('epersonName');
    wx.removeStorageSync('epersonPhone');
    wx.removeStorageSync('epersonWeChat');
    wx.removeStorageSync('epersonQQ');
    wx.removeStorageSync('etextarea');
    wx.removeStorageSync('ezhiwei');
  },
  dateToString: function (TimeStamp) {
    var now = new Date(TimeStamp);
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    var second = (now.getSeconds()).toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    if (hour.length == 1) {
      hour = "0" + hour;
    }
    if (minute.length == 1) {
      minute = "0" + minute;
    }
    if (second.length == 1) {
      second = "0" + second;
    }
    //var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    var dateTime = year + "-" + month + "-" + day
    return dateTime;
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var parentOne = wx.getStorageSync('parentOne');
    wx.checkSession({//查看登陆状态是否过期，过期就清除缓存
      success: function () {
        //wx.clearStorageSync();
      },
      fail: function () {
        wx.clearStorageSync();
      }
    })
    var v1_1_2 = wx.getStorageSync("v1_1_2");
    if (v1_1_2 == "") {//版本更新，清除缓存
      wx.clearStorageSync();
    }

    var xcxSession = wx.getStorageSync('xcxSession');
    var myId = wx.getStorageSync('myId');
    var datestr = this.dateToString(new Date());
    var lookNum = wx.getStorageSync(datestr);

    wx.clearStorageSync();

    wx.setStorageSync(datestr, lookNum);
    wx.setStorageSync("v1_1_2", v1_1_2);
    wx.setStorageSync("parentOne", parentOne);
    if (xcxSession == "" && myId == "") {
      console.log("得到本地用户的session和注册id");
      this.getXcxSession();//得到本地用户的session和注册id

      wx.setStorageSync("v1_1_2", "v1_1_2");//这里作用是在v1_1_2版本，如果有初始化的数据，以后进来不要清除xcxSession和myId缓存
    } else {
      wx.setStorageSync('xcxSession', xcxSession);
      wx.setStorageSync('myId', myId);
    }



    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getXcxSession: function () {//点赞操作的时候，先获取点赞者的id
    var that = this;
    console.log("执行登录操作了");
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
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
                  console.log("code:" + code);
                  console.log("iv:" + iv);
                  console.log("encryptedData:" + encryptedData);
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
                        title: '授权失败,请下拉刷新-A3s',
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
                title: '授权失败,请下拉刷新-A1',
                icon: 'loading',
                duration: 2000
              })
            }
          },
          fail: function (res) {
            console.log("登录失败");
            console.log(res);
            wx.showToast({
              title: '授权失败,请下拉刷新-A0',
              icon: 'loading',
              duration: 2000
            })
          },
          complete: function (res) {
            console.log("最后执行了");
          }
        });
      },
      fail: function () {
        //登录态过期
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
                        title: '授权失败,请下拉刷新-A',
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
                title: '授权失败,请下拉刷新-B',
                icon: 'loading',
                duration: 2000
              })
            }
          },
          fail: function (res) {
            console.log("登录失败");
            console.log(res);
            wx.showToast({
              title: '授权失败,请下拉刷新-C',
              icon: 'loading',
              duration: 2000
            })
          },
          complete: function (res) {
            console.log("最后执行了");
          }
        });
      }
    })

  },
  

  initSystem: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth;
        var height = res.windowHeight;
        that.systemData.W = width;
        that.systemData.H = height;
      }
    })
  },
  
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    W:0,
    H:0,
  }
})