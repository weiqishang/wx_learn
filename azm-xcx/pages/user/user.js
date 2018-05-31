//index.js
//获取应用实例
var app = getApp()
var base64 = require("../../image/base64");

Page({

  data: {
    icon: {
      pallet: '../../image/pallet.png',
      wallet: '../../image/wallet.png',
      money: '../../image/money.png',
      zx: '../../image/zx.png',
      foot: '../../image/foot.png',
      zan: '../../image/zan2.png',
      tc: '../../image/tc.png',
      about: '../../image/about.png',
      team: '../../image/rm0.png',
      yq: '../../image/yq.png',
      sc: "../../image/sc_th.png",
      clearCache: "../../image/clearCache.png",
    },
    version: 0,
    tuijianren:"", 
    tuijianrenPhone:"",
    hehuo: '0'
  },
  checkTwentyRM: function () {
    wx.navigateTo({
      url: './twentyrm/twentyrm',

    })
  },
  checkIsVip: function () {
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
      return;
    }
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/userserver!getVip.jsp',
      data: {
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询是否vip返回");
        console.log(res);
        var vipObj = res.data.json;
        var personData = that.data.personData;
        wx.navigateTo({
          url: 'openvip/openvip?personData='
          + JSON.stringify(personData) + "&vipObj=" + JSON.stringify(vipObj),
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  openvip: function () {
    this.checkIsVip();

  },
  friends: function () {
    var ownerId = wx.getStorageSync("myId");
    var xcxSession = wx.getStorageSync("xcxSession");
    var that = this;
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
      data: {
        ownerId: ownerId,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
        praiseSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("传ownerId返回7-11");
        console.log(res);
        var userws = res.data.json.user.userws;
        if (userws != 1) {
          wx.navigateTo({
            url: 'Invitation/Invitation',
          })
          
        } else {
          wx.navigateTo({
            url: 'Invitation/Invitation',
          })
        }
      },
      fail: function (res) {
        // fail
        console.log("传xcxSession失败返回");
        console.log(res);

      },
      complete: function (res) {
        // complete

      }
    })
  },
  focusAZM: function () {
    wx.navigateTo({
      url: '../card/follow-us/follow-us',
    })
  },
  
  mypallet: function () {
    wx.navigateTo({
      url: 'mymoney/mymoney',
    });

  },
  moneyClick: function () {
    var personData = this.data.personData;
    if (personData.shareCom != undefined) {
      wx.navigateTo({
        url: 'money/money?proNumberCount=' + personData.proNumberCount + '&proNumber=' + personData.proNumber,
      })
    }

  },
  footClick: function () {
    wx.navigateTo({
      url: 'foot/foot',
    })
  },
  zanClick: function () {
    wx.navigateTo({
      url: 'zan/zan',
    })
  },

  getMyXiaoChengXuCard: function () {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/develop!gotoPicByCard.jsp',
      data: {
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("得到小程序码图");
        console.log(res);
        wx.hideLoading();
        wx.previewImage({
          urls: [res.data.json.picurl],
        })
      },
      fail: function (res) {
        // fail
        console.log("传xcxSession失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete

      }
    })
  },
  shareMyXiaoChengXuMa: function () {
    wx.showLoading({
      title: '图片生成中',
    });
    this.getMyXiaoChengXuCard();
  },
  onShow: function () {
    this.initPersonData();
  },
  setmycard: function () {
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.navigateTo({
      url: '../user/setcard/setcard?xcxSession=' + xcxSession,
    });
  },
  bindTapMyChat: function () {
    wx.navigateTo({
      url: '../user/mychat/mychat',
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  teamEnter: function () {
    wx.navigateTo({
      url: '../user/team/team',
    })
  },
  transFormJson: function (res) {
    console.log(res);
    var path = res.data.json.user.picurl;
    console.log(path);
    var newPath = "https" + path.substring(4, path.length);

    var newPath = undefined;
    if (path.indexOf('https') > -1) {
      newPath = path;
    } else {
      newPath = "https" + path.substring(4, path.length);
    }
    console.log(newPath);
    var personData = {
      name: res.data.json.user.name,
      teamName: res.data.json.team.smallName + "",
      teamId: res.data.json.user.teamId,
      zhiwei: res.data.json.user.position,
      ishuiyuan: true,
      personImg: newPath,
      phone: res.data.json.user.phone,
      qq: res.data.json.user.qq,
      wechar: res.data.json.user.wechat,
      renqi: res.data.json.user.popularity,
      zan: res.data.json.user.praise,
      fav: res.data.json.user.collection,
      belongCom: res.data.json.company.displayName,
      shareCom: res.data.json.company.smallName,
      proNumber: res.data.json.user.proNumber,
      proNumberCount: res.data.json.user.proNumberCount,
    };
    this.setData({
      personData: personData,
      version: res.data.json.user.version,
      hehuo: res.data.json.user.hehuo
      // version: 1,
      // hehuo: 1
    }); 
  },
  getPersonDataFromServer: function (myId) {
    var praiseSession = wx.getStorageSync('xcxSession');
    var that = this;
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
      data: {
        ownerId: myId,
        praiseSession: praiseSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("传ownerId返回");
        console.log(res);
        wx.setStorageSync('indexData', res);
        wx.hideLoading();
        that.transFormJson(res);


      },
      fail: function (res) {
        // fail
        console.log("传xcxSession失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete

      }
    })
  },
  initPersonData: function () {
    var that = this;

    this.checkIsLogin();
    var myId = wx.getStorageSync("myId");

    if (myId == "") {
      app.getUserInfo(function (userInfo) {
        //更新数据
        console.log("微信个人数据");
        console.log(userInfo);
        var personData = {
          name: userInfo.nickName,
          personImg: userInfo.avatarUrl,
          shareCom: '',
          proNumber: ''
        };
        that.setData({
          personData: personData
        })
      })
      wx.hideLoading();
    } else {
      this.getPersonDataFromServer(myId);
    }


  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    this.initPersonData();
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
                  console.log("app.js成功返回");
                  console.log(res);
                  var xcxSession = res.data.json.xcxSession;//当前使用小程序的用户令牌
                  var userId = res.data.json.userId;//当前使用小程序的注册用户id
                  wx.setStorageSync('xcxSession', xcxSession);
                  wx.setStorageSync('myId', userId);
                  wx.request({
                    url: 'https://m.ccyishe.com/page/xcx/user!isLogin.jsp',
                    data: {
                      xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      // success
                      console.log("8-1查询注册登录返回" + xcxSession);
                      console.log(res);
                      var userId = res.data.json.userId;
                      var tuijianrenId = that.data.tuijianrenId;
                      if (userId != '0') {//已经注册
                      } else {//未注册
                          wx.redirectTo({
                            url: '../register/register?tuijianrenId=' + tuijianrenId,
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

  checkIsLogin: function () {//判断是否登录
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      this.invokeWhenXcxSessionNone();
      return;
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/user!isLogin.jsp',
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("8-1查询注册登录返回" + xcxSession);
        console.log(res);
        var userId = res.data.json.userId;
        var tuijianrenId = that.data.tuijianrenId;
        if (userId != '0') {//已经注册
          wx.setStorageSync('xcxSession', xcxSession);
          wx.setStorageSync('myId', userId);
        } else {//未注册
          that.invokeWhenXcxSessionNone();
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
  onLoad: function () {
    this.checkIsLogin();
    wx.showLoading({
      title: '加载中...',
    });
    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
      app.getXcxSession();
    }
    this.setData({
      icon_setcard: base64.icon23,//设置名片图标
      icon_mychat: base64.icon24,//我的咨询图标
      icon_enter: base64.icon25,//团队入驻图标
      icon_xcx: base64.icon26//团队入驻图标
    });
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
   
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/user!selectParent.jsp',
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        if (res.data.result=="success"){
            that.setData({
            tuijianren : res.data.json.user.name.substring(0,7),
            tuijianrenPhone : res.data.json.user.phone
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
  clearCache:function(){
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession==""){
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.showLoading({
      title: '缓存清空中...',
    })
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/clear!all.jsp',
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        if (res.data.result == "success") {
          wx.hideLoading();
          wx.showLoading({
            title: '缓存清空成功...',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.hideLoading();
          wx.showLoading({
            title: '缓存清空失败...',
            icon: 'loading',
            duration: 2000
          })
        }

      },
      fail: function (res) {
        // fail
        wx.hideLoading();
        wx.showLoading({
          title: '缓存清空失败...',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function (res) {
        // complete
      }
    })
  }
})
