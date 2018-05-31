// money.js
var app = getApp()
Page({
  data: {
    icon: {
      qd: 'image/qd.png',
      qun: 'image/qun.png',
      yq: 'image/yq.png',
      team: 'image/team.png',
      proNumber: '',
      proNumberCount: '',
      haveUse: '',
      version: 0
    },
    qdFlag: 0,
    shareFlag: 0,
    ivitFlag: 0,
    ctFlag: 0,
    ivitCount: '',
    shareCount: ''
  },
  checkIsLogin: function () {//判断是否登录
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
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
          wx.navigateTo({
            url: '../../user/setcard/setcard?xcxSession=' + xcxSession,
          })
        } else {
          wx.navigateTo({
            url: '../../user/setcard/my-company/my-company'
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
  setmycard: function () {
    this.checkIsLogin();
  },

  toShare: function () {
    wx.navigateTo({
      url: '../../card/index',
    })
  },
  payClick: function () {
    wx.navigateTo({
      url: 'pay/pay',
    })
  },
  recieveTeam: function () {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/pronumber!addTeamPro.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("领取团队奖励成功返回" + xcxSession);
        console.log(res);
        if (res.data.result == 'success') {
          that.setData({ ctFlag: 2 });
          var proNumber = that.data.proNumber
          wx.showToast({
            title: '+20脉点',
            icon: 'success',
            duration: 1000
          })
          that.setData({ proNumber: proNumber + 20 });
        }
      },
      fail: function (res) {
        // fail
        console.log("领取团队奖励失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete

      }
    })
  },
  checkct: function () {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/pronumber!selTeam.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("查是否领取团队奖励成功返回" + xcxSession);
        console.log(res);
        if (res.data.result == 'not') {
          that.setData({ ctFlag: 0 });
        } else if (res.data.result == 'yes') {
          that.setData({ ctFlag: 1 });
        } else if (res.data.result == 'exist') {
          that.setData({ ctFlag: 2 });
        }
      },
      fail: function (res) {
        // fail
        console.log("查是否领取团队奖励失败返回");
        console.log(res);

      },
      complete: function (res) {
        // complete

      }
    })
  },

  checkShare: function () {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/pronumber!selQt.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("查分享成功返回" + xcxSession);
        console.log(res);
        var shareCount = parseInt(res.data.result);

        that.setData({ shareCount: shareCount });

        if (shareCount >= 3) {
          if (res.data.add == '0') {
            that.setData({ shareFlag: 1 });
          } else if (res.data.add == '1') {
            that.setData({ shareFlag: 2 });
          }

        }
      },
      fail: function (res) {
        // fail
        console.log("查分享失败返回");
        console.log(res);

      },
      complete: function (res) {
        // complete

      }
    })
  },
  recieveShare: function (e) {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    var version_date = e.currentTarget.dataset.version;
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/pronumber!addQt.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("领取分享群奖励成功返回" + xcxSession);
        console.log(res);
        if (res.data.result == 'success') {
          that.setData({ shareFlag: 2 });
          var proNumber = that.data.proNumber
          if (version_date == 1) {
            wx.showToast({
              title: 'VIP+10脉点',
              icon: 'success',
              duration: 1000
            })
            that.setData({ proNumber: proNumber + 10 });
          } else {
            wx.showToast({
              title: '+5脉点',
              icon: 'success',
              duration: 1000
            })
            that.setData({ proNumber: proNumber + 5 });
          }
        }
      },
      fail: function (res) {
        // fail
        console.log("领取分享群奖励失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete

      }
    })
  },


  initData: function () {
    this.checkQianDao();
    this.checkShare();
    this.checkIvit();
    this.checkct();
    wx.hideLoading();
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var myId = wx.getStorageSync("myId");
    this.getPersonDataFromServer(myId);
    this.initData();

  },
  transFormJson: function (res) {
    this.setData({
      haveUse: parseInt(res.data.json.user.proNumberCount) - parseInt(res.data.json.user.proNumber),
      proNumberCount: res.data.json.user.proNumberCount,
      proNumber: res.data.json.user.proNumber,
      version: res.data.json.user.version
    });

    console.log("version1=" + res.data.json.user.version);
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
  onShow: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var myId = wx.getStorageSync("myId");
    this.getPersonDataFromServer(myId);
    this.initData();
  },
  onLoad: function (options) {
    //proNumber 是可用

  },
  checkIvit: function () {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/pronumber!selCard.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("查邀请成功返回" + xcxSession);
        console.log(res);
        var initCount = parseInt(res.data.result);

        that.setData({ ivitCount: initCount });

        if (initCount >= 10) {
          if (res.data.add == '0') {
            that.setData({ ivitFlag: 1 });
          } else if (res.data.add == '1') {
            that.setData({ ivitFlag: 2 });
          }

        }
      },
      fail: function (res) {
        // fail
        console.log("查邀请失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete

      }
    })
  },
  recieveIvit: function () {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/pronumber!addCardNumber.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("领取邀请成功返回" + xcxSession);
        console.log(res);
        if (res.data.result == 'success') {
          that.setData({ ivitFlag: 2 });
          var proNumber = that.data.proNumber
          wx.showToast({
            title: '+20脉点',
            icon: 'success',
            duration: 1000
          })
          that.setData({ proNumber: proNumber + 20 });
        }
      },
      fail: function (res) {
        // fail
        console.log("领取邀请失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete

      }
    })
  },
  checkQianDao: function () {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/pronumber!selQd.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("查签到成功返回" + xcxSession);
        console.log(res);
        if (res.data.result == 'not') {
          that.setData({ qdFlag: 0 });
        } else if (res.data.result == 'yes') {

          that.setData({ qdFlag: 1 });
        }
      },
      fail: function (res) {
        // fail
        console.log("查签到失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete

      }
    })
  },
  qiandao: function (e) {
    // var proNumber = this.data.proNumber;
    // this.setData({ proNumber: proNumber + 2 });
    // return;
    var that = this;
    var version_date = e.currentTarget.dataset.version;
   
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/pronumber!shareQd.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("签到成功返回" + xcxSession);
        console.log(res);
        var proNumber = that.data.proNumber;
        if (res.data.result == 'success') {
          that.setData({ qdFlag: 1 });
          if (version_date == 0) {
            wx.showToast({
              title: '+2脉点',
              icon: 'success',
              duration: 1000
            })
            that.setData({ proNumber: proNumber + 2 });
          } else {
            wx.showToast({
              title: 'Vip+4脉点',
              icon: 'success',
              duration: 1000
            })
            that.setData({ proNumber: proNumber + 4 });
          }

        }
      },
      fail: function (res) {
        // fail
        console.log("签到失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete

      }
    })
  },

})