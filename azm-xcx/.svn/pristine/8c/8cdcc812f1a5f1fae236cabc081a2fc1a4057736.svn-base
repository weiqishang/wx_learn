var base64 = require("../../../image/base64");
var app = getApp();
Page({
  data: {
    pBookScrollHeight: 0,
    inputShowed: false,
    inputVal: "",
    itemHidden: true,
    cengHidden: true,
    pBooK: [],
  },
  callPhone: function (e) {
    let phone = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
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
                  url: '../../user/setcard/setcard',
                })
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '../viewcard/viewcard?ownerId=' + cid,
                })
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '../viewcard/viewcard?ownerId=' + cid,
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
            url: '../myrm/myrm',
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
  myrm:function(){


    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      return ;
    }
    this.checkIsLogin();
    // wx.navigateTo({
    //   url: '../find-connection/find-connection',
    // })
  },
  searchAndSetNewPeopleList: function (value) {
    console.log(value);
    let oldList = this.data.pBooK;
    var flag = false;
    for (var i = 0; i < oldList.length; i++) {
      let zuflag = false;
      for (var j = 0; j < oldList[i].peoples.length; j++) {
        var perObj = oldList[i].peoples[j];
        let rowflag = false;
        if ((perObj.pPhone.indexOf(value) >= 0) || (perObj.pName.indexOf(value) >= 0)) {
          oldList[i].hidden = false;
          oldList[i].peoples[j].hidden = false;
          zuflag = true;
          rowflag = true;
        } else if (!rowflag) {
          oldList[i].peoples[j].hidden = true;
        }
        if (((j + 1) == oldList[i].peoples.length) && (!zuflag)) {
          oldList[i].hidden = true;
        }
      }
    }
    console.log(oldList);
    this.setData({ pBooK: oldList });
  },
  searchPerson: function (e) {
    if (e.detail.value == "") {
      this.setData({ cengHidden: false });
    } else {
      this.setData({ cengHidden: true });
      let nowh = this.data.wh - 60;
      this.setData({ pBookScrollHeight: nowh });
      this.searchAndSetNewPeopleList(e.detail.value);
    };
  },
  inputFocus: function () {
    this.setData({ itemHidden: true });
    this.setData({ cengHidden: false });
    let nowh = this.data.wh - 60;
    this.setData({ pBookScrollHeight: nowh });
  },
  setComObjTool: function (zubie, list) {
    if (list.length != 0) {
      var pBooK = this.data.pBooK;
      console.log("服务器公司数据");
      console.log(list);

      var obj = { zubie: zubie, peoples: [], hidden: false };
      for (var i = 0; i < list.length; i++) {
        var comObjTmp = {
          pImg: list[i].picurl,
          pName: list[i].name,
          pCom: list[i].companyName,
          pTeam: list[i].teamName,
          pid: list[i].cid,
          pPhone: list[i].phone,
          hidden: false,
          province: list[i].province,
          userws: list[i].userws,
          version: list[i].version,
        }
        obj.peoples.push(comObjTmp);
      }
      pBooK.push(obj);
      this.setData({ pBooK: pBooK });
    }

  },
  setComObj: function (listObj) {
    this.setData({ pBooK: [] });
    var list = listObj.json.list;
    this.setComObjTool("A", list.A);
    this.setComObjTool("B", list.B);
    this.setComObjTool("C", list.C);
    this.setComObjTool("D", list.D);
    this.setComObjTool("E", list.E);
    this.setComObjTool("F", list.F);
    this.setComObjTool("G", list.G);
    this.setComObjTool("H", list.H);
    this.setComObjTool("I", list.I);
    this.setComObjTool("J", list.J);
    this.setComObjTool("K", list.K);
    this.setComObjTool("L", list.L);
    this.setComObjTool("M", list.M);
    this.setComObjTool("N", list.N);
    this.setComObjTool("O", list.O);
    this.setComObjTool("P", list.P);
    this.setComObjTool("Q", list.Q);
    this.setComObjTool("R", list.R);
    this.setComObjTool("S", list.S);
    this.setComObjTool("T", list.T);
    this.setComObjTool("U", list.U);
    this.setComObjTool("V", list.V);
    this.setComObjTool("W", list.W);
    this.setComObjTool("X", list.X);
    this.setComObjTool("Y", list.Y);
    this.setComObjTool("Z", list.Z);
    this.setComObjTool("其他", list.others);
  },
  getPBookFromServer: function () {
    
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');

    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/mail!mlist.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("联系人列表");
        console.log(res);
        wx.hideLoading();
        that.setComObj(res.data);
        wx.stopPullDownRefresh();
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  },
  getXcxSessionPage: function () {//点赞操作的时候，先获取点赞者的id
    var that = this;
    wx.login({
      success: function (res) {//用户登录成功

        wx.hideLoading();
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

                  var ownerId = userId;//因为此函数在自己打开自己才调用，所以这里的首页的名片拥有这为当前使用小程序的注册用户

                  wx.setStorageSync('xcxSession', xcxSession);
                  wx.setStorageSync('myId', userId);

                  that.getPBookFromServer();
                },
                fail: function (res) {
                  console.log("app.js失败返回");
                  console.log(res);
                }
              })
            }
          })
        } else {
          console.log('用户登陆状失败' + res.errMsg);
        }
      }
    });
  },
  getAndSetPBook: function () {
    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
      this.getXcxSessionPage();
    } else {//
      this.getPBookFromServer();
    }
  },
  onLoad: function () {
    this.setData({
      icon_hq: base64.icon20,//获取人脉图标
      icon_find: base64.icon21,//发现人脉图标
      icon_my: base64.icon22,//我的人脉图标
    });
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({ itemHidden: false });
    this.setData({ cengHidden: true });


    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  setSystem: function () {//得到系统的信息
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let pBookScrollHeight = wh - 206;

        this.setData({
          pBookScrollHeight: pBookScrollHeight,
          wh: wh,
        });
      }
    })
  },

  onShow: function () {
    // 页面显示
    if (this.data.pBookScrollHeight == 0) {
      this.setSystem();
    }
    wx.showLoading({
      title: '加载中',
    })
    this.getAndSetPBook();
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.getAndSetPBook();
  }
});