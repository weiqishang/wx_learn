// zan.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    tabs: ["我看过TA", "TA看过我"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    myZanList: [],//我的点赞列表
    beenZanedList: []
  },
  checkCard: function (e) {
    var cid = e.currentTarget.id;
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
                wx.redirectTo({
                  url: '../user/setcard/setcard',
                })
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '../../notes/viewcard/viewcard?ownerId=' + cid + "&rmtypedetails=1",
                })
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '../../notes/viewcard/viewcard?ownerId=' + cid + "&rmtypedetails=1",
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
  // checkCard: function (e) {
  //   var cid = e.currentTarget.id;
  //   var ownerId = wx.getStorageSync("myId");
  //   var xcxSession = wx.getStorageSync("xcxSession");
  //   var that = this;
  //   wx.request({//请求拿到用户数据的接口
  //     url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
  //     data: {
  //       ownerId: ownerId,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
  //       praiseSession: xcxSession
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success: function (res) {
  //       console.log("传ownerId返回7-11");
  //       console.log(res);
  //       var province = res.data.json.user.province;
  //       if (province == null || province == "") {
  //         wx.showModal({
  //           title: '温馨提示',
  //           content: '您还需要完善个人信息才能使用！',
  //           showCancel: false,
  //           confirmText: '立即完善',
  //           success: function (res) {
  //             if (res.confirm) {
  //               wx.redirectTo({
  //                 url: '../user/setcard/setcard',
  //               })
  //             } else if (res.cancel) {
  //               wx.navigateTo({
  //                 url: '../../notes/viewcard/viewcard?ownerId=' + cid + "&rmtypedetails=1",
  //               })
  //             }
  //           }
  //         })
  //       } else {
  //         wx.navigateTo({
  //           url: '../../notes/viewcard/viewcard?ownerId=' + cid + "&rmtypedetails=1",
  //         })
  //       }
  //     },
  //     fail: function (res) {
  //       // fail
  //       console.log("传xcxSession失败返回");
  //       console.log(res);

  //     },
  //     complete: function (res) {
  //       // complete

  //     }
  //   })

  // },
  onUnload: function () {
    wx.setStorageSync("myZanIndex", "");
    wx.setStorageSync("beenZanedIndex", "");
  },
  onReachBottom: function () {
    var activeIndex = this.data.activeIndex;

    if (activeIndex == 0) {
      if (this.data.myZanList.length == this.data.myZanListCount) {
        return;
      }
      this.getMyZan();
      console.log("0");
    } else {
      console.log("1");
      if (this.data.beenZanedList.length == this.data.beenZanedListCount) {
        return;
      }
      this.getBeenZanedList();
    }

  },
  transJsonFromMyZan: function (myZanList) {
    var myZanListTmp = this.data.myZanList;
    for (var i = 0; i < myZanList.length; i++) {
      myZanListTmp.push(myZanList[i]);
    }
    this.setData({ myZanList: myZanListTmp });
  },
  getMyZan: function () {
    var xcxSession = wx.getStorageSync("xcxSession");
    var myZanIndex = wx.getStorageSync("myZanIndex");
    if (myZanIndex == "") {
      myZanIndex = 1;
      wx.setStorageSync("myZanIndex", 2);
    } else {
      myZanIndex = parseInt(myZanIndex);
      wx.setStorageSync("myZanIndex", myZanIndex + 1);
    }
    var that = this;
    wx.request({//
      url: 'https://m.ccyishe.com/page/xcx/browse!myBrowse.jsp',
      data: {
        xcxSession: xcxSession,
        startIndex: myZanIndex
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("我的看过的返回");
        console.log(res)
        var userlist = res.data.json.userlist
        that.transJsonFromMyZan(userlist);
        that.setData({ myZanListCount: res.data.json.count });
      }
    })
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
  onLoad: function () {
    this.initSystem();
    this.getMyZan();
  },

  transJsonFromBeenZaned: function (beenZanedList) {
    var beenZanedListTmp = this.data.beenZanedList;
    for (var i = 0; i < beenZanedList.length; i++) {
      beenZanedListTmp.push(beenZanedList[i]);
    }
    this.setData({ beenZanedList: beenZanedListTmp });
  },
  getBeenZanedList: function () {
    var xcxSession = wx.getStorageSync("xcxSession");
    var beenZanedIndex = wx.getStorageSync("beenZanedIndex");
    if (beenZanedIndex == "") {
      beenZanedIndex = 1;
      wx.setStorageSync("beenZanedIndex", 2);
    } else {
      beenZanedIndex = parseInt(beenZanedIndex);
      wx.setStorageSync("beenZanedIndex", beenZanedIndex + 1);
    }
    var that = this;
    wx.request({//被浏览
      url: 'https://m.ccyishe.com/page/xcx/browse!himBrowse.jsp',
      data: {
        xcxSession: xcxSession,
        startIndex: beenZanedIndex
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("被看过的返回");
        console.log(res)
        var userlist = res.data.json.userlist
        that.transJsonFromBeenZaned(userlist);
        that.setData({ beenZanedListCount: res.data.json.count });
      }
    })
  },

  tabClick: function (e) {//导航切换
    var that = this;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id == 1) {
      console.log("11");
      if (this.data.beenZanedList.length == 0) {//只有第一次点击才需要加载
        this.getBeenZanedList();
      }
    }
  },

  scBeenZaned: function (e) {//收藏
    var that = this;
    var id = e.currentTarget.id;
    this.setCollection(id);

    var beenZanedList = that.data.beenZanedList;
    for (var i in beenZanedList) {
      if (beenZanedList[i].cid == id) {
        if (beenZanedList[i].collection == 1) {
          beenZanedList[i].collection = 0;
        } else {
          beenZanedList[i].collection = 1;
        }

        that.setData({ beenZanedList: that.data.beenZanedList })

      }
    }
  },

  scMyZan: function (e) {//收藏
    var that = this;
    var id = e.currentTarget.id;
    var myZanList = that.data.myZanList;

    this.setCollection(id);

    for (var i in myZanList) {
      if (myZanList[i].cid == id) {
        if (myZanList[i].collection == 1) {
          myZanList[i].collection = 0;
        } else {
          myZanList[i].collection = 1;
        }
        that.setData({ myZanList: that.data.myZanList })
      }
    }
  },
  setCollection: function (userId) {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/mail!addOrDel.jsp',
      method: "POST",
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',//
        userId: userId,//userId是被收藏的人
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("收藏成功");
        console.log(res);
      },
      fail: function (res) {
        console.log("收藏失败");
        console.log(res);
      }
    })
  },

});