var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  data: {
    tabs: ["VIP收入", "合伙人收入", "提现明细"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    daiLiListCount: 0,

    allMoney: '',
    money: '',

    recommendSRList: [],
    tixianList: [],
    daiLiList: []
  },
  call:function(e){
    var phone = e.currentTarget.id;
    if (phone == "" || phone == null || phone == "null" || phone == undefined || phone == "undefined") {
      return;
    } else {
      wx.makePhoneCall({
        phoneNumber: phone
      })
    }
  },
  tixian: function () {
    var that = this;
    wx.navigateTo({
      url: './tixian/tixian?money=' + that.data.money,
    })
  },
  onReachBottom: function () {
    var activeIndex = this.data.activeIndex;
    if (activeIndex == 0) {
      console.log("0");
      if (this.data.recommendSRList.length == this.data.recommendSRCount) {
        return;
      }
      this.getRecommendSR();

    } else if (activeIndex == 1) {
      if (this.data.daiLiList.length == this.data.daiLiListCount) {
        return;
      }
      this.getDaiLiShouRu();
    } else {
      console.log("1");
      if (this.data.tixianList.length == this.data.tixianCount) {
        return;
      }
      this.getTiXian();
    }

  },

  initSystem: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  transJsonFromDaiLiShouRu: function (daiLiList) {
    var daiLiListTmp = this.data.daiLiList;
    for (var i = 0; i < daiLiList.length; i++) {
      daiLiListTmp.push(daiLiList[i]);
    }
    this.setData({ daiLiList: daiLiListTmp });
  },
  getDaiLiShouRu: function () {
    var xcxSession = wx.getStorageSync("xcxSession");
    var DaiLiIndex = wx.getStorageSync("DaiLiIndex");
    if (DaiLiIndex == "") {
      DaiLiIndex = 1;
      wx.setStorageSync("DaiLiIndex", 2);
    } else {
      DaiLiIndex = parseInt(TDaiLiIndex);
      wx.setStorageSync("DaiLiIndex", DaiLiIndex + 1);
    }
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/usermoneylog!pagingListDL.jsp',
      data: {
        xcxSession: xcxSession,
        startIndex: DaiLiIndex,
        size: 30
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(xcxSession + "--" + DaiLiIndex + "--");
        console.log("我的代理合伙人收入返回");
        console.log(res)
        var userlist = res.data.json.list
        that.transJsonFromDaiLiShouRu(userlist);
        that.setData({ daiLiListCount: res.data.json.count });
      }
    })
  },
  tabClick: function (e) {//导航切换
    var that = this;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id == 2) {
      console.log("11");
      if (this.data.tixianList.length == 0) {//只有第一次点击才需要加载
        this.getTiXian();
      }
    } else if (e.currentTarget.id == 1) {
      if (this.data.tixianList.length == 0) {//只有第一次点击才需要加载
        this.getDaiLiShouRu();
      }
    }
  },
  checkUserPallet: function () {
    var xcxSession = wx.getStorageSync('xcxSession');
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/usermoney!getMoney.jsp',
      data: {
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询钱包返回");
        console.log(res);
        that.setData({ allMoney: res.data.json.allMoney, money: res.data.json.money });
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  transJsonFromRecommendSR: function (recommendSRList) {
    var recommendSRListTmp = this.data.recommendSRList;
    for (var i = 0; i < recommendSRList.length; i++) {
      recommendSRListTmp.push(recommendSRList[i]);
    }
    this.setData({ recommendSRList: recommendSRListTmp });
  },
  getRecommendSR: function () {
    var xcxSession = wx.getStorageSync("xcxSession");
    var RecommendSRIndex = wx.getStorageSync("RecommendSRIndex");
    if (RecommendSRIndex == "") {
      RecommendSRIndex = 1;
      wx.setStorageSync("RecommendSRIndex", 2);
    } else {
      RecommendSRIndex = parseInt(RecommendSRIndex);
      wx.setStorageSync("RecommendSRIndex", RecommendSRIndex + 1);
    }
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/usermoneylog!pagingList.jsp',
      data: {
        xcxSession: xcxSession,
        startIndex: RecommendSRIndex,
        size: 30
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("vip收入收入返回" + xcxSession);
        console.log(res)
        var userlist = res.data.json.list
        that.transJsonFromRecommendSR(userlist);
        that.setData({ recommendSRCount: res.data.json.count });
      }
    })
  },
  transJsonFromTiXian: function (tixianList) {
    var tixianListTmp = this.data.tixianList;
    for (var i = 0; i < tixianList.length; i++) {
      tixianListTmp.push(tixianList[i]);
    }
    this.setData({ tixianList: tixianListTmp });
  },
  getTiXian: function () {
    var xcxSession = wx.getStorageSync("xcxSession");
    var TiXianIndex = wx.getStorageSync("TiXianIndex");
    if (TiXianIndex == "") {
      TiXianIndex = 1;
      wx.setStorageSync("TiXianIndex", 2);
    } else {
      TiXianIndex = parseInt(TiXianIndex);
      wx.setStorageSync("TiXianIndex", TiXianIndex + 1);
    }
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/usermoneylog!pagingListTX.jsp',
      data: {
        xcxSession: xcxSession,
        startIndex: TiXianIndex,
        size: 30
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(xcxSession + "--" + TiXianIndex + "--");
        console.log("我的提现收入返回");
        console.log(res)
        var userlist = res.data.json.list
        that.transJsonFromTiXian(userlist);
        that.setData({ tixianCount: res.data.json.count });
      }
    })
  },
  onLoad: function (options) {

  },

  onReady: function () {

  },
  onShow: function () {
    this.initSystem();
    this.checkUserPallet();
    this.getRecommendSR();
  },
  onHide: function () {

  },
  onUnload: function () {

    wx.setStorageSync("TiXianIndex", "");
    wx.setStorageSync("RecommendSRIndex", "");
    wx.setStorageSync("DaiLiIndex", "");
  },
  onPullDownRefresh: function () {
    wx.setStorageSync("TiXianIndex", "");
    wx.setStorageSync("RecommendSRIndex", "");
    wx.setStorageSync("DaiLiIndex", "");

    this.setData({ recommendSRList: [], tixianList: [], activeIndex: 0, sliderOffset: 0, });
    this.checkUserPallet();
    this.getRecommendSR();
  }
})