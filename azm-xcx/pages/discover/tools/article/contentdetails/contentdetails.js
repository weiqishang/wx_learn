// pages/card/contentdetails/contentdetails.js

var app = getApp();
var base64 = require("../../../../../image/base64");
var util = require("../../../../../utils/util");

Page({
  data: {
    createPro: '',
    textTest: '',
    personData: {},
    comInfo: {},

    bindTapFlag1: 1,//是否点赞过，1代表没有
    bindTapFlag1_2: 1,//是否点赞过，1代表没有
    bindTapFlag2: 1,
    bindTapFlag2_2: 1,

    animationData: {},
    animationData2: {},


    xcxSession: '',//xcxSession这个是保存本用户的id,就是进来应用的用户
    xcxSessionCard: '',//xcxSessionCard 这个是保存名片所属者的id

    newUser: 1,

    article: [],
    delHidden: true,
    articleType: 0,
    haveArticle: true,
    defaultStyle: "color:#353535;font-size:17px;font-weight:normal;text-align:left;background-color:white;"
  },
  shareToPYQ:function(){

    wx.redirectTo({
      url: '../share/share',
    })
  },
  callPhone: function (e) {
    var phone = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  checkdetailsImg: function (e) {
    var url = e.currentTarget.id;
    var article = this.data.article;
    var previewUrls = [];
    for(var i=0;i<article.length;i++){
      if (article[i].atype=='img'){
        previewUrls.push(article[i].content);
      }
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: previewUrls,
    })
  },
  getBackToAllArticle: function () {
    var ownerId = this.data.ownerId;
    if (this.data.articleType == 0) {
      wx.redirectTo({
        url: '../myarticle/myarticle?ownerId=' + ownerId + "&isTeam=" + 0,
      })
    } else if (this.data.articleType == 1) {
      wx.redirectTo({
        url: '../teamarticle/mteamarticle?ownerId=' + ownerId + "&isTeam=" + 0,
      })
    }
  },
  yulangtouxing: function (e) {
    console.log(e);
    var path = e.target.id;
    wx.previewImage({
      current: path, // 当前显示图片的http链接
      urls: [path] // 需要预览的图片http链接列表
    })
  },
  checkCollection: function () {//查询是否收藏过
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/mail!selCollection.jsp',
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',//
        userId: that.data.ownerId//userId是被收藏的人
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询收藏返回");
        console.log(res);
        var flag = res.data.isCollection;
        if (flag == '1') {
          that.setData({ bindTapFlag2: 0, bindTapFlag2_2: 1 });
        } else {
          that.setData({ bindTapFlag2: 1, bindTapFlag2_2: 0 });
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
  checkIsZan: function () {//查询用户是否点赞过
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/index!selPraiseByUserId.jsp',
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',游客
        userId: that.data.ownerId,//名片拥有者
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询点赞返回");
        console.log(res);
        var flag = res.data.isPraise;
        if (flag == '1') {
          that.setData({ bindTapFlag1: 0, bindTapFlag1_2: 1 });
        } else {
          that.setData({ bindTapFlag1: 1, bindTapFlag1_2: 0 });
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
  comfirmZan: function () {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }

    wx.request({//发到服务器，进行解密数据
      url: 'https://m.ccyishe.com/page/xcx/index!praiseByUserId.jsp',
      method: "POST",
      data: {
        xcxSession: xcxSession,//praiseSession，这个是访客的session
        userId: that.data.ownerId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("点赞成功" + xcxSession);
        console.log(res);
      },
      fail: function (res) {
        console.log("点赞失败");
        console.log(res);
      }
    })
  },
  setCollection: function () {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/mail!addOrDel.jsp',
      method: "POST",
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',//
        userId: that.data.ownerId//userId是被收藏的人
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
  bindZan: function () {
    this.comfirmZan();//点赞操作的时候，先获取点赞者的id

    var bindTapFlag1Tmp = this.data.bindTapFlag1;
    this.setData({ bindTapFlag1: !bindTapFlag1Tmp, bindTapFlag1_2: !bindTapFlag1Tmp });

    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: "ease-in-out",
    })
    if (bindTapFlag1Tmp) {//点赞，否则就是取消赞
      wx.playBackgroundAudio({
        dataUrl: 'https://media.ccyishe.com/media/wav20170511.wav',
        success: function (res) {
          console.log("播放成功");
          console.log(res);
        },
        fail: function (res) {
          console.log("播放失败");
          console.log(res);
        }
      })
      animation.scale(2, 2).translateY(-20).opacity(1).step();
      animation.translateY(0).scale(1, 1).opacity(0).step();
      var personData = this.data.personData;
      personData.zan = personData.zan + 1;
      this.setData({ personData: personData });
    } else {
      var personData = this.data.personData;
      personData.zan = personData.zan - 1;
      this.setData({ personData: personData });
    }

    this.setData({
      animationData: animation.export(),
    });
  },
  bindFav: function () {
    var bindTapFlag2Tmp = this.data.bindTapFlag2;
    this.setData({ bindTapFlag2: !bindTapFlag2Tmp, bindTapFlag2_2: !bindTapFlag2Tmp });

    this.setCollection();//收藏操作

    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: "ease-in-out",
    })
    if (bindTapFlag2Tmp) {
      wx.playBackgroundAudio({
        dataUrl: 'https://media.ccyishe.com/media/wav20170511.wav',
        success: function (res) {
          console.log("播放成功");
          console.log(res);
        },
        fail: function (res) {
          console.log("播放失败");
          console.log(res);
        }
      })
      animation.scale(2, 2).translateY(-20).opacity(1).step();
      animation.translateY(0).scale(1, 1).opacity(0).step();

      var personData = this.data.personData;
      personData.fav = personData.fav + 1;
      this.setData({ personData: personData });
    } else {
      var personData = this.data.personData;
      personData.fav = personData.fav - 1;
      this.setData({ personData: personData });
    }

    this.setData({
      animationData2: animation.export(),
    });
  },
  zixun: function () {
    var that = this;
    wx.navigateTo({
      url: '../../../../card/chat/chat?ownerId=' + that.data.ownerId,

    })
  },
  IWantToKaiTong: function () {
    var ownerId = this.data.ownerId;
    wx.reLaunch({
      url: '../../../../home2/home2?tuijianrenId=' + ownerId,
    })
    // wx.navigateTo({
    //   url: '../../../../user/setcard/my-company/my-company',
    // })
  },
  IWantToKaiTong2: function () {
    var ownerId = this.data.ownerId;
    wx.reLaunch({
      url: '../../../../home2/home2?tuijianrenId=' + ownerId,
    })
    // wx.reLaunch({
    //   url: '../../../../card/index',
    // })
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
  getXcxSessionCheckIsNewUser: function () {
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

                  console.log("这里执行了111111111");

                  if (ownerId != "" && ownerId != '0') {//是注册过的用户
                    that.setData({ newUser: 0 });
                  } else {//用户没有注册过

                  }
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
  checkIsNewUser: function () {
    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    
    if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
      this.getXcxSessionCheckIsNewUser();
    } else {//
      if (ownerId != "" && ownerId != '0') {//是注册过的用户
        this.setData({ newUser: 0 });
      } else {//用户没有注册过

      }
    }
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

                  that.checkIsZan();//查询用户是否点赞过
                  that.checkCollection();//查询是否收藏过
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
  tranFromJsonArticle: function (article) {
    // var that = this;
    // WxParse.wxParse("editArticle", 'html', article.articleDesc, that, 5);
    this.setData({ article: article });
    wx.hideLoading();
  },
  initArtilceData: function (aid) {
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!articleDesc.jsp',
      data: {
        cid: aid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询文章详情返回" + aid);
        console.log(res);
        if (res.data.result=="cid not exist"){
          that.setData({haveArticle:false});
          return;
        }
        that.setData({
          readNumber: res.data.json.article.readNumber,
          title: util.strDiscode(res.data.json.article.displayName),
          createtime: res.data.json.article.createDate,
          createPro: util.strDiscode(res.data.json.article.createPro)
        });
        that.tranFromJsonArticle(res.data.json.article.articleDesc);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  getInfoFromServer: function () {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
      data: {
        ownerId: that.data.ownerId,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
        praiseSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("传ownerId返回");
        console.log(res);
        that.transFormJson(res);
        wx.hideLoading();
        wx.stopPullDownRefresh();
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
    this.setData({ personData: personData});
    wx.setStorageSync('companyinfo', res.data.json.companyinfo);
    wx.setStorageSync('teaminfo', res.data.json.teaminfo);
    wx.setStorageSync('textTest', textTest);
    wx.setStorageSync('personData', personData);
  },
  initSystem: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth;
        var height = res.windowHeight;
        that.setData({ width: width, height: height });
      }
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    //清空旧数据，避免数据脏读
    wx.setStorageSync("personData","");
    wx.setStorageSync("teaminfo", "");
    wx.setStorageSync("companyinfo","");

    this.initSystem();
    if (options.articleType != undefined) {
      this.setData({ articleType: options.articleType });
    }
    var cid = options.cid;
    var ownerId = options.ownerId;
    wx.setStorageSync("parentOne", ownerId);
    console.log(cid + "--" + ownerId);
    this.setData({
      icon1: base64.hot_th,//人气图标
      icon1_th: base64.hot_th,//人气图标
      icon2: base64.zan,//点赞图标
      icon2_th: base64.zan_th,//点赞图标
      icon3: base64.sc,//收藏图标
      icon3_th: base64.sc_th,//收藏图标
      cid: cid,
      ownerId: ownerId,
    });
    
    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
      this.getXcxSessionPage();
    } else {//
      this.getInfoFromServer();
      this.checkIsZan();//查询用户是否点赞过
      this.checkCollection();//查询是否收藏过
    }
    this.checkIsNewUser();
   
    this.initArtilceData(cid);

    this.getInfoFromServer();
    wx.onUserCaptureScreen(function (res) {
      console.log('用户截屏了')
    })
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: util.strDiscode(that.data.title),//that.data.title,
      path: '/pages/discover/tools/article/contentdetails/contentdetails?ownerId=' + that.data.ownerId + '&cid=' + that.data.cid,
      success: function (res) {
        // 分享成功
        console.log(that.data.ownerId +"--分享成功--" + that.data.cid)
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  onPullDownRefresh: function () {
    wx.setStorageSync('companyinfo', "");
    wx.setStorageSync('teaminfo', "");
    wx.setStorageSync('textTest', "");
    wx.setStorageSync('personData', "");
    wx.showLoading({
      title: '加载中...',
    })

    var cid = this.data.cid;
    var cid2 = this.data.cid2;
    var ownerId = this.data.ownerId;

   
    this.checkIsNewUser();

    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
      this.getXcxSessionPage();
    } else {//
      this.checkIsZan();//查询用户是否点赞过
      this.checkCollection();//查询是否收藏过
    }

    if (cid != undefined) {
      this.initArtilceData(cid);//初始化公司数据
    }
    this.getInfoFromServer();
  }
})