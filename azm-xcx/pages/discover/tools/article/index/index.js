// pages/user/tools/article/index/index.js

Page({
  data: {
    isTeam: 0,
    version: 0,
    fbCount: '',
    cgCount: '',
    havateam: 0,
  },
  checkTeamArticle: function () {
    var isTeam = this.data.isTeam;
    var ownerId = wx.getStorageSync("myId");
    wx.navigateTo({
      url: '../teamarticle/mteamarticle?ownerId=' + ownerId + "&isTeam=" + isTeam,
    })
  }, 
  help: function () {
    wx.navigateTo({
      url: '../help/help',
    })
  }, 
  myxiaochengxuzhan: function () {
    var ownerId = wx.getStorageSync("myId");
    wx.navigateTo({
      url: '../myarticle/myarticle?ownerId=' + ownerId,
    })
  },
  checkPersonImg: function (e) {
    console.log(e);
    wx.previewImage({
      urls: [e.target.id],
    })
  },
  panduanIsWangShangZiLiao: function () {
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
          wx.showModal({
            title: '温馨提示',
            content: '您还需要完善个人信息才能使用！',
            showCancel: false,
            confirmText: '立即完善',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../../../../user/setcard/setcard',
                })
              } else if (res.cancel) {
                var ownerId = wx.getStorageSync("myId");
                wx.navigateTo({
                  url: '../editarticle/editarticle?publish=' + 1 + "&isTeam=" + that.data.isTeam + "&ownerId=" + ownerId,
                })
              }
            }
          })
        } else {
          var ownerId = wx.getStorageSync("myId");
          wx.navigateTo({
            url: '../editarticle/editarticle?publish=' + 1 + "&isTeam=" + that.data.isTeam + "&ownerId=" + ownerId,
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
  panduanIsWangShangZiLiao2: function () {
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
          wx.showModal({
            title: '温馨提示',
            content: '您还需要完善个人信息才能使用！',
            showCancel: false,
            confirmText: '立即完善',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../../../../user/setcard/setcard',
                })
              } else if (res.cancel) {
                var ownerId = wx.getStorageSync("myId");
                wx.navigateTo({
                  url: '../tqarticle/tqarticle?isTeam=' + that.data.isTeam,
                })
              }
            }
          })
        } else {
          var ownerId = wx.getStorageSync("myId");
          wx.navigateTo({
            url: '../tqarticle/tqarticle?isTeam=' + that.data.isTeam,
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
  editarticle: function () {
    this.panduanIsWangShangZiLiao();
  },
  tqarticle: function () {
    this.panduanIsWangShangZiLiao2();
    
  },
  mydrafts: function () {
    var ownerId = wx.getStorageSync("myId");
    var that = this;
    wx.navigateTo({
      url: '../mydrafts/mydrafts?ownerId=' + ownerId + "&isTeam=" + that.data.isTeam,
    })
  },
  published: function () {
    var that = this;
    wx.navigateTo({
      url: '../published/published?havateam=' + that.data.havateam + "&isTeam=" + that.data.isTeam,
    })
  },
  transFormJson: function (res) {
    console.log(res);
    var textTest = res.data.json.user.userInfo;
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
    };
    this.setData({ version: res.data.json.user.version });
    if (res.data.json.team != "") {
      this.setData({ havateam: 1 });
    }
    wx.setStorageSync('personImg', newPath);
    this.setData({ company: res.data.json.company, team: res.data.json.team });
    this.setData({ personData: personData, picurlXcxQr: res.data.json.user.picurlXcxQr });
  },
  getUserInfoFromServer: function () {
    var myId = wx.getStorageSync("myId");
    var xcxSession = wx.getStorageSync("xcxSession");
    var that = this;
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
      data: {
        ownerId: myId,
        praiseSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("传ownerId返回");
        console.log(res);
        wx.hideLoading();
        that.transFormJson(res);
      },
      fail: function (res) {
        // fail
        console.log("传xcxSession失败返回");
        console.log(res);
        wx.hideLoading();
      },
      complete: function (res) {
        // complete

      }
    })
  },
  getPublishAndDraftsCount: function () {
    var ownerId = wx.getStorageSync("myId");
    var that = this;
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/article!getCount.jsp',
      data: {
        ownerId: ownerId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("查询数量返回" + ownerId);
        console.log(res);
        that.setData({ cgCount: res.data.json.cgCount, fbCount: res.data.json.fbCount });
      },
      fail: function (res) {
        // fail
        console.log("传xcxSession失败返回");
        console.log(res);
        //cgCount 这个是草稿数量

      },
      complete: function (res) {
        // complete

      }
    })
  },

  checkIsPersonOrTeam: function (ownerId) {
    var that = this;
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
        that.setData({ isTeam: isTeam });
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },

  checkIsLogin: function () {//判断是否登录
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
          that.checkIsPersonOrTeam(userId);

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
  checkIsLogin2: function () {//判断是否登录
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

        if (userId != '0') {//已经注册
          // wx.navigateTo({
          //   url: '../../../../register/register',
          // })
        } else {//未注册
          wx.redirectTo({
            url: '../../../../register/register',
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
  onShow: function () {
    //this.checkIsLogin2();
  },
  onLoad: function (options) {
    this.checkIsLogin2();
    
    wx.showLoading({
      title: '加载中',
    })



    //this.setData({ isTeam: options.isTeam});
    this.checkIsLogin();

    this.getPublishAndDraftsCount();
    //this.setData({ isTeam: 1});
    this.getUserInfoFromServer();
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    this.getPublishAndDraftsCount();
    this.getUserInfoFromServer();
  }
})