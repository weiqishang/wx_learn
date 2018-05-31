// pages/user/tools/article/index/index.js
var app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    tabs: ["我的文章", "团队文章"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    isTeam: 0,

    myarticles: [],
    teamarticles: [],

    addr: '',
    havateam:0,
    noteamtiphidden:true,
    previewHidden:false
  },
  initSystem: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: ((res.windowWidth * 9 / 10) / 2 - sliderWidth) / 2,
          sliderOffset: (res.windowWidth * 9 / 10) / 2 * that.data.activeIndex
        });
      }
    })
  },
  checkArticle: function (e) {
    console.log(e);
    var id = e.currentTarget.id;
    var ownerId = wx.getStorageSync('myId');
    var that = this;
    var activeIndex = this.data.activeIndex;
    wx.navigateTo({
      url: '../articledetailsmag/articledetailsmag?aid=' + id + "&ownerId=" + ownerId + "&isTeam=" + that.data.isTeam + "&articleType=" + activeIndex,
    })
  },
  previewArticle: function () {
    var activeIndex = this.data.activeIndex;
    var isTeam = this.data.isTeam;
    var ownerId = wx.getStorageSync('myId');
    if (activeIndex == 1) {//预览团队文章
      wx.navigateTo({
        url: '../teamarticle/mteamarticle?ownerId=' + ownerId + "&isTeam=" + isTeam,
      })
    } else {//预览我的文章
      wx.navigateTo({
        url: '../myarticle/myarticle?ownerId=' + ownerId + "&isTeam=" + isTeam,
      })
    }
  },
  getXcxSessionPage: function () {//判断是否登录
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
        var myId = res.data.json.userId;
        wx.setStorageSync("myId", myId);
        that.getPersonArticle();
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  transFromJson: function (list) {//转换个人文章json

    var myarticlesTmp = this.data.myarticles;
    for (var i = 0; i < list.length; i++) {
      myarticlesTmp.push(list[i]);
    }
    this.setData({ myarticles: myarticlesTmp });
  },
  getPersonArticle: function () {
    var myId = wx.getStorageSync('myId');
    if (myId == "") {
      this.getXcxSessionPage();
    }
    var personAritcleIndex = wx.getStorageSync("personAritcleIndex");
    if (personAritcleIndex == "") {
      personAritcleIndex = 1;
      wx.setStorageSync("personAritcleIndex", 2);
    } else {
      personAritcleIndex = parseInt(personAritcleIndex);
      wx.setStorageSync("personAritcleIndex", personAritcleIndex + 1);
    }
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!pagingList.jsp',
      data: {
        ownerId: myId,
        startIndex: personAritcleIndex,
        size: 20,
        artType: 0,//个人文章 0、 团队文章 1
        postType: 1, //0为草稿、1为发布
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询个人文章" + personAritcleIndex);
        console.log(res.data.json);

        wx.hideLoading();
        that.setData({ count: res.data.json.count });
        that.transFromJson(res.data.json.articleList);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  onLoad: function (options) {
    console.log("跳转");
    console.log(options);
    this.initSystem();
    this.setData({ isTeam: options.isTeam, havateam: options.havateam});
    this.getPersonArticle();
  },
  onPullDownRefresh: function () {
    wx.setStorageSync("personAritcleIndex", "");
    wx.showLoading({
      title: '加载中...',
    })
    this.getPersonArticle();
  },
  transTeamArticleFromJson: function (list) {//转换个人文章json

    var teamarticlesTmp = this.data.teamarticles;
    for (var i = 0; i < list.length; i++) {
      teamarticlesTmp.push(list[i]);
    }
    this.setData({ teamarticles: teamarticlesTmp });
  },
  getTeamArticle: function () {
    var myId = wx.getStorageSync('myId');
    if (myId == "") {
      this.getXcxSessionPage();
    }
    var teamAritcleIndex = wx.getStorageSync("teamAritcleIndex");
    if (teamAritcleIndex == "") {
      teamAritcleIndex = 1;
      wx.setStorageSync("teamAritcleIndex", 2);
    } else {
      teamAritcleIndex = parseInt(teamAritcleIndex);
      wx.setStorageSync("teamAritcleIndex", teamAritcleIndex + 1);
    }
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!pagingList.jsp',
      data: {
        ownerId: myId,
        startIndex: teamAritcleIndex,
        size: 20,
        artType: 1,//个人文章 0、 团队文章 1
        postType: 1, //0为草稿、1为发布
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询团队文章" + teamAritcleIndex);
        console.log(res);
        that.setData({ teamcount: res.data.json.count });
        that.transTeamArticleFromJson(res.data.json.articleList);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  tabClick: function (e) {
    console.log(e.currentTarget.id + "---" + this.data.havateam);


    if (e.currentTarget.id == 1 && this.data.havateam==0){
      console.log("执行6-23");
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id,
        noteamtiphidden:false,
        previewHidden:true
      });
    }else{
      console.log("执行6-23-2");
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id,
        noteamtiphidden: true,
        previewHidden:false
      });
      if (e.currentTarget.id == 1) {
        console.log("11");
        if (this.data.teamarticles.length == 0) {//只有第一次点击才需要加载
          this.getTeamArticle();
        }
      }
    }
   
   
  },
  editArticle: function () {
    wx.navigateTo({
      url: '../editarticle/editarticle',
    })
  },


  onReady: function () {

  },


  onShow: function () {

  },


  onHide: function () {

  },

  onUnload: function () {
    wx.setStorageSync("personAritcleIndex", "");
    wx.setStorageSync("teamAritcleIndex", "");

  },


  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onReachBottom: function () {
    var activeIndex = this.data.activeIndex;

    if (activeIndex == 0) {
      if (this.data.myarticles.length == this.data.count) {
        return;
      }
      this.getPersonArticle();
      console.log("0");
    } else {
      console.log("1");
      if (this.data.teamarticles.length == this.data.teamcount) {
        return;
      }
      this.getTeamArticle();
    }

  },
})