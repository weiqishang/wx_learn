
Page({
  data: {
    pBookScrollHeight: 0,
    inputShowed: false,
    inputVal: "",
    cengHidden: true,
    pBooK: [],

    startIndex: 1,
    count: 0,
    rms: [],
    keyword: '',

  },
  callPhone: function (e) {
    let phone = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  },
  checkCard: function (e) {
    var cid = e.currentTarget.id;
    wx.navigateTo({
      url: '../../viewcard/viewcard?ownerId=' + cid + "&rmtypedetails=1",
    })
  },
  searchAndSetNewPeopleList: function (value) {
    this.setData({rms:[]});
    this.setData({ keyword: value });
    wx.setStorageSync("startIndex", "");
    this.getPBookFromServer();
  },
  // searchAndSetNewPeopleList: function (value) {
  //   console.log("111"+value);
  //   let oldList = this.data.rms;
  //   for (var i = 0; i < oldList.length; i++) {
  //     var perObj = oldList[i];
  //     if ((perObj.pPhone.indexOf(value) >= 0) || (perObj.pName.indexOf(value) >= 0)) {
  //       oldList[i].hidden = false;
  //     }else{
  //       oldList[i].hidden = true;
  //     }
  //   }
  //   this.setData({ rms: oldList });
  // },
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
          hidden: false
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
  transFromJson: function (list) {
    var rms = this.data.rms;
    var rmsNew = [];
    for (var i = 0; i < list.length; i++) {
      var comObjTmp = {
        pImg: list[i].picurl,
        pName: list[i].name,
        pCom: list[i].companyName,
        pTeam: list[i].teamName,
        pid: list[i].cid,
        pPhone: list[i].phone,
        hidden: false
      };
      rms.push(comObjTmp);
    }
    for (var i = 0; i < rms.length; i++) {
      rmsNew.push(rms[i]);
    }
    this.setData({ rms: rms });
  },
  getPBookFromServer: function () {
    var startIndex = wx.getStorageSync("startIndex");
    if (startIndex == "") {
      startIndex = 1;
      wx.setStorageSync("startIndex", 1);
    }
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    console.log("startIndex:" + startIndex + "----that.data.tmtype:" + that.data.rmtype + "---keyword:+" + that.data.keyword);
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/mail!sixDesc.jsp',
      data: {
        xcxSession: xcxSession,
        'type': that.data.rmtype,
        startIndex: startIndex,
        keyword: that.data.keyword,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("联系人列表");
        console.log(res);
        wx.hideLoading();
        that.transFromJson(res.data.json.userList);
        that.setData({ count: res.data.json.count });
        //that.setComObj(res.data);
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
  onLoad: function (options) {
    wx.setStorageSync("startIndex", "");
    var rmtype = options.rmtype;
    console.log("rmtype:" + rmtype);
    var category = options.category;
    this.setData({ rmtype: rmtype });
    var rmtypeStr = "";
    if (rmtype == "1") {
      rmtypeStr = "一度";
    } else if (rmtype == "2") {
      rmtypeStr = "二度";
    } else if (rmtype == "3") {
      rmtypeStr = "三度";
    }
    var categoryStr = "";
    if (category == "1") {
      categoryStr = "直销";
    } else {
      categoryStr = "精准";
    }

    var title = rmtypeStr + categoryStr + "人脉";
    console.log("标题：" + title);
    this.setData({ title: title});
    wx.setNavigationBarTitle({
      title: title,
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getAndSetPBook();
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({ cengHidden: true });
    // this.setData({rms:[]});
    // var rms = this.data.rms;
    // for (var i = 0; i < rms.length; i++) {
    //   rms[i].hidden = false;
    // }
    // this.setData({ rms: rms });
    this.searchAndSetNewPeopleList("");
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

  },
  onReachBottom:function(){
    if (this.data.rms.length == this.data.count){
      return ;
    }
    wx.showLoading({
      title: '数据加载中…',
    })

    console.log("这里执行了---------------222---");
    var startIndex = wx.getStorageSync("startIndex");
    if (startIndex == "") {
      wx.setStorageSync("startIndex", 1);
    } else {
      var numTmp = parseInt(startIndex);
      wx.setStorageSync("startIndex", numTmp + 1);
    }
    this.getAndSetPBook();
  },
  onPullDownRefresh: function () {
   
  }
});

