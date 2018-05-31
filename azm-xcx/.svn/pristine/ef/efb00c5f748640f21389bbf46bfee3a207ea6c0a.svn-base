// pages/card/chat/chat.js
Page({
  data: {
    chatName: '',
    chatPhone: '',
    setChatQuestion: '',
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

                  wx.setStorageSync('xcxSession', xcxSession);
                  wx.setStorageSync('myId', userId);

                  that.submitQuestion2();
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
  submitQuestion:function(){
    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
      this.getXcxSessionPage();
    } else {//
      this.submitQuestion2();
    }
  },
  submitQuestion2: function () {
    var that = this;
    var createDate = new Date();
    console.log(createDate);
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    if (that.data.chatName == "")
    {
      wx.showToast({
        title: '请填写一下您的姓名',
        icon: 'loading',
        duration: 2000
      })
      return;
    } else if ( that.data.chatPhone == "" ) {
      wx.showToast({
        title: '请填写一下您的手机号',
        icon: 'loading',
        duration: 2000
      })
      return;
    } else if (that.data.setChatQuestion == "") {
      wx.showToast({
        title: '请填写一下您要咨询的问题',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/question!quein.jsp',
      data: {
        name: that.data.chatName,
        phone: that.data.chatPhone,
        qdesc: that.data.setChatQuestion,
        xcxSession: xcxSession,
        userId: that.data.ownerId,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        var reslut = res.data.result+"";
        console.log(that.data.ownerId+"提交问题返回"+that.data.xcxSession);
        console.log(res);
        if (result!=undefined) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
            success: function(res){
              // success
            },
            fail: function(res) {
              // fail
            },
            complete: function(res) {
              // complete
            }
          })
        }else{
          wx.showToast({
            title: '服务器忙',
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log("提交失败");
        console.log(res);
      }
    })
  },
   transFormJson: function (res, cid, flag) {
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
      belongCom: res.data.json.user.companyName,
      shareCom: res.data.json.company.smallName,
    };

    wx.setStorageSync('teaminfo', res.data.json.teaminfo);
    wx.setStorageSync('textTest', textTest);
    wx.setStorageSync('personData', personData);
    var  shareData = personData.shareCom+personData.zhiwei;
    
    wx.setStorageSync('shareData', shareData);
    if (flag) {
      this.initData(cid);
    }
  },
  getInfoFromServer: function (cid, flag) {
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
      data: {
        ownerId: cid,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("传ownerId返回");
        console.log(res);
        that.transFormJson(res, cid, flag);

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
  initData: function (cid) {
    var userId = wx.getStorageSync('ownerId');
    var xcxSession = wx.getStorageSync('xcxSession');
    var personData = wx.getStorageSync('personData');
    var textTest = wx.getStorageSync('textTest');

    var  shareData = personData.shareCom+personData.zhiwei;
    
    wx.setStorageSync('shareData', shareData);

    if (personData == "" || textTest == "") {
      this.getInfoFromServer(cid, 1);
    }
    this.setData({ userId: userId, xcxSession: xcxSession,textTest:textTest,personData:personData});
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var ownerId = options.ownerId;
    wx.setStorageSync("parentOne", ownerId);
    this.setData({ownerId:ownerId});
    this.initData(ownerId);
    
  },
  setChatQuestion: function (e) {
    var setChatQuestion = e.detail.value;
    this.setData({ setChatQuestion: setChatQuestion });
  },
  setChatName: function (e) {
    var chatName = e.detail.value;
    this.setData({ chatName: chatName });
  },
  setChatPhone: function (e) {
    var chatPhone = e.detail.value;
    console.log(chatPhone);
    this.setData({ chatPhone: chatPhone });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function () {
   
    var that = this;
    var shareData = wx.getStorageSync('shareData');
    
    return {
      title: "您好，我是"+shareData+"，期待您的咨询",
      path: "/pages/card/chat/chat?ownerId=" + that.data.ownerId,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }
})