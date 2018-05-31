// pages/discover2/disvover2.js
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    icon: {
      mingpian: '../../image/mingpian.png',
      pingtu: '../../image/makePic.png',
      shiyexiangce: '../../image/xiangce.png',
      zhengpingxiaozhan: '../../image/shangcheng.png',
      jingqingqidai: '../../image/jingqingqidai.png'
    },
    iconInfos: [{
      id: 0,
      picUrl: '../../image/mingpianjia.png',
      smallName: '名片夹',
    }, {
      id: 1,
      picUrl: '../../image/zx.png',
      smallName: '我的咨询',
    }, {
      id: 2,
      picUrl: '../../image/foot.png',
      smallName: '我的足迹',
    }, {
      id: 3,
      picUrl: '../../image/zan2.png',
      smallName: '我的赞',
    }]
  },
  mymingpian: function () {
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
        if (userws!=1) {
          wx.showModal({
            title: '温馨提示',
            content: '您还需要完善个人信息才能使用！',
            showCancel: false,
            confirmText: '立即完善',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../user/setcard/setcard',
                })
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '../card/index',
                })
              }
            }
          })  
        }else{
          wx.navigateTo({
            url: '../card/index',
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
  checkDetails: function (e) {
    var id = e.currentTarget.id;
    if (id == 0) {
      var ownerId = wx.getStorageSync("myId");
      var xcxSession = wx.getStorageSync("xcxSession");
      var that = this;
      wx.request({//请求拿到用户数据的接口
        url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
        data: {
          ownerId: ownerId,
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
              url: '../notes/index/notes',
            })
            // wx.showModal({
            //   title: '温馨提示',
            //   content: '您还需要完善个人信息才能使用！',
            //   showCancel: false,
            //   confirmText: '立即完善',
            //   success: function (res) {
            //     if (res.confirm) {
            //       wx.redirectTo({
            //         url: '../user/setcard/setcard',
            //       })
            //     } else if (res.cancel) {
            //       wx.navigateTo({
            //         url: '../notes/index/notes',
            //       })
            //     }
            //   }
            // })
          } else{
            wx.navigateTo({
              url: '../notes/index/notes',
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

    } else if (id == 1) {
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
          console.log(userws)
          if (userws != 1) {
            wx.navigateTo({
              url: '../user/mychat/mychat',
            })
            // wx.showModal({
            //   title: '温馨提示',
            //   content: '您还需要完善个人信息才能使用！',
            //   showCancel: false,
            //   confirmText: '立即完善',
            //   success: function (res) {
            //     if (res.confirm) {
            //       wx.redirectTo({
            //         url: '../user/setcard/setcard',
            //       })
            //     } else if (res.cancel) {
            //       wx.navigateTo({
            //         url: '../user/mychat/mychat',
            //       })
            //     }
            //   }
            // })
          }else{
            wx.navigateTo({
              url: '../user/mychat/mychat',
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

     
    } else if (id == 2) {
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
              url: '../user/foot/foot',
            })
            // wx.showModal({
            //   title: '温馨提示',
            //   content: '您还需要完善个人信息才能使用！',
            //   showCancel: false,
            //   confirmText: '立即完善',
            //   success: function (res) {
            //     if (res.confirm) {
            //       wx.redirectTo({
            //         url: '../user/setcard/setcard',
            //       })
            //     } else if (res.cancel) {
            //       wx.navigateTo({
            //         url: '../user/foot/foot',
            //       })
            //     }
            //   }
            // })
          }else{
            wx.navigateTo({
              url: '../user/foot/foot',
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


      
    } else if (id == 3) {
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
              url: '../user/zan/zan',
            })
            // wx.showModal({
            //   title: '温馨提示',
            //   content: '您还需要完善个人信息才能使用！',
            //   showCancel: false,
            //   confirmText: '立即完善',
            //   success: function (res) {
            //     if (res.confirm) {
            //       wx.redirectTo({
            //         url: '../user/setcard/setcard',
            //       })
            //     } else if (res.cancel) {
            //       wx.navigateTo({
            //         url: '../user/zan/zan',
            //       })
            //     }
            //   }
            // })
          }else{
            wx.navigateTo({
              url: '../user/zan/zan',
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


      
    }
  },

  checkIsPersonOrTeam2: function (ownerId) {
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/user!isTeam.jsp',
      data: {
        ownerId: ownerId,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询是个人还是团队");
        console.log(res);
        var isTeam = res.data.isTeam;
        wx.navigateTo({
          url: '../discover/tools/picture2/index/index?isTeam=' + isTeam,
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
  checkIsLogin2: function () {//判断是否登录
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
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
        console.log("查询注册登录返回");
        var userId = res.data.json.userId;

        if (userId != '0') {
          that.checkIsPersonOrTeam2(userId);

        } else {

          wx.showToast({
            title: '请先注册登录',
            icon: 'success',
            duration: 2000
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
  moveToEditPic: function () {
    this.checkIsLogin2();//查询登录验证，如果是注册用户才能进入
  },
  checkIsLogin: function () {//判断是否登录
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
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
        console.log("查询注册登录返回");
        var userId = res.data.json.userId;
        wx.hideLoading();
        if (userId != '0') {//已经注册

        } else {//未注册
          wx.redirectTo({
            url: '../register/register',
          })

        }
      },
      fail: function (res) {
        // fail
        wx.hideLoading();
      },
      complete: function (res) {
        // complete
      }
    })
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title:"加载中...",
    })
    this.checkIsLogin();
  },
  onLoad: function (options) {
    
    this.checkIsLogin();
  },
  onReady: function () {

  },
  onShow: function () {

  },

  onHide: function () {

  },
  onUnload: function () {

  },

  onReachBottom: function () {

  }
})