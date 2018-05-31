// pages/user/tools/article/index/index.js
var app=getApp();
Page({
  data: {

  },
  findrmbyarea:function(){
    wx.navigateTo({
      url: '../notes/obtain-connection/obtain-connection',
    })
  },
  rmfa:function(){
    wx.navigateTo({
      url: '../notes/find-connection/find-connection',
    })
  },
  rmcheckIsLogin: function () {//判断是否登录
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
            url: '../notes/myrm/myrm',
          })
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
  myrm: function () {


    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    this.rmcheckIsLogin();
  },
  checkIsPersonOrTeam: function (ownerId) {
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
          url: './tools/article/index/index?isTeam=' + isTeam,
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
          url: './tools/picture2/index/index?isTeam=' + isTeam,
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
  moveToEditArticle: function () {
    this.checkIsLogin();//查询登录验证，如果是注册用户才能进入
    
  },
  
  onLoad: function (options) {
    
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

  },


  onShareAppMessage: function () {

  },


  onReachBottom: function () {

  },


  onPullDownRefresh: function () {

  }
})