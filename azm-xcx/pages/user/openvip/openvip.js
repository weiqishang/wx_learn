// openvip.js
var util = require("../../../utils/util");
var teamPro=0
Page({

  data: {
    vipid:'vip',
    vipObj:{
      vip: 0,
      endTime:'',
      
    },
    
    icon: {
      title: 'https://m.ccyishe.com/html/images/20171102/title.png',
      tuijian: 'https://m.ccyishe.com/html/images/20171102/tjxz2x.png',
      weituijian: 'https://m.ccyishe.com/html/images/20171102/tuijw2x.png',
      pay: 'https://m.ccyishe.com/html/images/20171102/zhifu.png',
      tuiguang: 'https://m.ccyishe.com/html/images/20171102/tgbg.png',
    },

    currentItemId: "1",
    navList: [{
      "goodsName": "298元/",
      "goods": "365天",
      "shuoming": "每天仅8毛",
      "goodsId": "1",
      "goodsClass": "tjxz",
      "id":"vip",
    }, {
      "goodsName": "58元/",
      "goods": "30天",
      "goodsId": "2",
      "goodsClass": "weituijian",
      "id": "vip58",
    }, {
      "goodsName": "128元/",
      "goods": "90天",
      "goodsId": "3",
      "goodsClass": "weituijian",
      "id": "vip1023",
    }, {
      "goodsName": "598元/",
      "goods": "三年",
      "goodsId": "4",
      "goodsClass": "weituijian",
      "id": "vip3",
    }],
    iconInfos: [{
      id: 0,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/jiarenmai.png',
      smallName: '添加精准人脉',
      smallN: '每天推送50条,5大精准人脉等你来加',
    }, {
      id: 1,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/diqu.png',
      smallName: '人脉地区制定',
      smallN: '每天可以指定25个地区,获取爱知脉为提供的专享精准人脉',
    }, {
      id: 2,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/wenzheng.png',
      smallName: '文章编辑',
      smallN: '每天不限次数,用别人的文章,插入自己的广告,进行转发推广',
    }, {
      id: 3,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/haibao.png',
      smallName: '制作精美海报',
      smallN: '每天无限次数制作放上自己二维码的精美推广海报',
    }, {
      id: 4,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/wotuijian.png',
      smallName: '我的推荐',
      smallN: '管理分享推广的伙伴,查看名片联系方式',
    }],
  },
  onLoad: function (options) {
    this.checkIsLogin();
    var personDataStr = options.personData;
    console.log(personDataStr);
    var personData = JSON.parse(personDataStr);
    this.setData({ personData: personData});
    // var vipObj = {
    //   vip: 1,
    //   endTime: '2017-08-09'
    // };
    var vipObj = JSON.parse(options.vipObj);
    console.log(vipObj);

    this.setData({ vipObj: vipObj });
    this.setData({ teamPro: 0 });
    if (personData.teamId==6){
      var myDate = util.formatTime(new Date());
      if (myDate < '2017/09/19 23:59:59') {
        teamPro=1;
        this.setData({ teamPro: 1 });
      }
    }
    this.setData({ vipObj: vipObj});
    if (vipObj.vip==0){
      wx.setNavigationBarTitle({
        title: '开通会员',
      })
    }else{
      wx.setNavigationBarTitle({
        title: 'VIP会员',
      })
    }
  },

  payAction: function (name) {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    console.log(xcxSession + "   " + that.data.code + "   " + name);
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/pay!to.jsp',
      data: {
        code: that.data.code,
        xcxSession: xcxSession,
        name: name
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log(xcxSession + "支付成功返回" + that.data.code);
        console.log(res);
        var payData = res.data.json;
        console.log(payData);
        wx.requestPayment({
          'timeStamp': payData.timeStamp,
          'nonceStr': payData.nonceStr,
          'package': payData.package,
          'signType': 'MD5',
          'paySign': payData.paySign,

          'success': function (res) {
            console.log("请求微信服务器支付成功返回");
            console.log(res);
            wx.navigateBack({
              delta: 1,
            })
          },
          'fail': function (res) {
            console.log("请求微信服务器支付失败返回");
            console.log(res);
          }
        })
      },
      fail: function (res) {
        // fail
        console.log("请求自己业务服务器支付失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete
      }
    })
  },
  clickTap: function (e) {
    console.log(e.currentTarget.id);
    this.setData({
      currentItemId: e.currentTarget.dataset.num,
      vipid: e.currentTarget.id,
    })
  },
  improveVip: function (e) {
    console.log(e);
    // var name = e.currentTarget.id;
    var name =this.data.vipid;
    var that = this;
    wx.login({
      success: function (res) {//用户登录成功
        wx.hideLoading();
        if (res.code) {
          var code = res.code;
          that.setData({ code: code });
          that.payAction(name);
        }
      }
    });
  },
  checkIsLogin: function () {//判断是否登录
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      this.invokeWhenXcxSessionNone();
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
        console.log("8-1查询注册登录返回" + xcxSession);
        console.log(res);
        var userId = res.data.json.userId;
        var tuijianrenId = that.data.tuijianrenId;
        if (userId != '0') {//已经注册
          wx.setStorageSync('xcxSession', xcxSession);
          wx.setStorageSync('myId', userId);
        } else {//未注册
          that.invokeWhenXcxSessionNone();
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
  invokeWhenXcxSessionNone: function () {
    var that = this;
    wx.login({
      success: function (res) {//用户登录成功

        //wx.hideLoading();
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
                  var xcxSession = res.data.json.xcxSession;//当前使用小程序的用户令牌
                  var userId = res.data.json.userId;//当前使用小程序的注册用户id
                  wx.setStorageSync('xcxSession', xcxSession);
                  wx.setStorageSync('myId', userId);
                  this.checkIsLogin();
                },
                fail: function (res) {
                  wx.showToast({
                    title: '授权失败,请下拉刷新',
                    icon: 'loading',
                    duration: 2000
                  })
                }
              })
            },
            fail: function (res) {
              wx.openSetting({
                success: function (res) {

                }
              })
            }
          })
        } else {
          wx.showToast({
            title: '授权失败,请下拉刷新',
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log("登录失败");
        console.log(res);
        wx.showToast({
          title: '授权失败,请下拉刷新',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log("最后执行了");
      }
    });
  },
  /** 
  onShareAppMessage: function () {
    var ownerId = wx.getStorageSync("myId");
    var that=this;
    return {
      title: '【爱知脉】VIP超级快速进人系统',
      path: "pages/user/openvip/openvip?personData="
      + JSON.stringify(that.data.personData) + "&vipObj=" + JSON.stringify(that.data.vipObj)+"&tuijianrenId=" + ownerId,
      imageUrl:"https://media.ccyishe.com/xcx/images/openvip.jpg",
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }, */
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