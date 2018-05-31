// pages/notes/myrm/myrm.js
var app = getApp();
var base64 = require(".../../../../../image/base64");
var compare = function (obj1, obj2) {
  var val1 = obj1.orderById;
  var val2 = obj2.orderById;
  if (val1 > val2) {
    return 1;
  } else if (val1 < val2) {
    return -1;
  } else {
    return 0;
  }
}
Page({
  data: {
    totalcount: 0,
    rmList: [],
    rmList2: [{
      orderById: 1,
      rmtype: '直推人脉',
      Count: 0,
      rmIcon: {}
    }, {
      orderById: 2,
      rmtype: '间接人脉',
      Count: 0,
      rmIcon: {}  
    }, {
      orderById: 3,
      rmtype: '三度人脉',
      Count: 0,
      rmIcon: {}
    }, {
      orderById: 4,
      rmtype: '四度人脉',
      Count: 0,
      rmIcon: {}
    }, {
      orderById: 5,
      rmtype: '五度人脉',
      Count: 0,
      rmIcon: {}
    }, {
      orderById: 6,
      rmtype: '六度人脉',
      Count: 0,
      rmIcon: {}
    }],

    jzrmHide: true,
    zxrmHide: true,
  },
  transFromJson: function (list) {
    var rmList = [];
    var obj1 = {
      orderById: 1,
      rmtype: '我的直推',
      Count: list.oneCount
    };
    var obj2 = {
      orderById: 2,
      rmtype: '间接人脉',
      Count: list.twoCount
    };
    var obj3 = {
      orderById: 3,
      rmtype: '三度人脉',
      Count: list.threeCount
    };
    var obj4 = {
      orderById: 4,
      rmtype: '四度人脉',
      Count: list.fourCount
    };
    var obj5 = {
      orderById: 5,
      rmtype: '五度人脉',
      Count: list.fiveCount
    };
    var obj6 = {
      orderById: 6,
      rmtype: '六度人脉',
      Count: list.sixCount
    };
    rmList.push(obj1);
    rmList.push(obj2);
    rmList.push(obj3);
    rmList.push(obj4);
    rmList.push(obj5);
    rmList.push(obj6);

    this.setData({ totalcount: list.twoCount + list.threeCount + list.fourCount + list.oneCount + list.fiveCount + list.sixCount });
    rmList.sort(compare);//降序排序
    this.setData({ rmList: rmList });
  },
  hidezxrmTip: function () {
    this.setData({ zxrmHide: true });
  },
  checkzxrm: function (e) {
    var id = e.currentTarget.id;
    if (id == 2 || id == 3 || id == 4 || id == 5 || id == 6) {
      //this.setData({ zxrmHide: false});
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
          console.log("传ownerId返回7-27");
          console.log(res);
          if (res.data.json.user.version==1) {
            wx.navigateTo({
              url: './rmtypedetails/rmtypedetails?rmtype=' + id + "&category=1",
            })
          } else {
            wx.showModal({
              title: '提示',
              confirmColor: '#3366FF',
              content: '层数2 - 6层，不是VIP不能查看',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
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

    } else {

      wx.navigateTo({
        url: './rmtypedetails/rmtypedetails?rmtype=' + id + "&category=1",
      })
    }
  },
  hidejzrmTip: function () {
    this.setData({ jzrmHide: true });
  },
  checkjzrm: function (e) {
    this.setData({ jzrmHide: false });
    // wx.showModal({
    //   title: '提示',
    //   confirmColor: '#3366FF',
    //   content: '精准人脉VIP会员才可查看（8月开放）',
    //   showCancel:false,
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  initDataFromServer: function () {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({//发到服务器，进行解密数据
      url: 'https://m.ccyishe.com/page/xcx/mail!sixCount.jsp',
      method: "POST",
      data: {
        xcxSession: xcxSession
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("6度成功返回");
        console.log(res);
        wx.hideLoading();
        that.transFromJson(res.data.json);
      },
      fail: function (res) {
        console.log("6度失败返回");
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  onLoad: function (options) {
    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    this.initDataFromServer();
    var rmList2 = this.data.rmList2;
    for (var i = 0; i < rmList2.length; i++) {
      //rmList2[i]
    }
    this.setData({
      rm1: base64.rm1,
      rm2: base64.rm2,
      rm3: base64.rm3,
      rm4: base64.rm4,
      rm5: base64.rm5,
      rm6: base64.rm6,
    });
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    this.initDataFromServer();
    var rmList2 = this.data.rmList2;
    for (var i = 0; i < rmList2.length; i++) {
      //rmList2[i]
    }
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