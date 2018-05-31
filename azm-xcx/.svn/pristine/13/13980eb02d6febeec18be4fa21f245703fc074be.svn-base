// pages/home2/home2.js
var util = require("../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    id:'',
    userInfo: {},
    teamId: 0,
    varsion:0,
    numberCount:0,
    icon: {
      jingxuan: '../../image/jingxuan.png',
      zhiying: '../../image/zhiying.png',
      wei: '../../image/wei.png',
      baoma: '../../image/baoma.png',
      xuesheng: '../../image/xuesheng.png',
      siying: '../../image/siying.png',
      baoxian: '../../image/baoxian.png',
      banner1: 'https://media.ccyishe.com/images/20170816/1502852534415.png',
      banner2: 'https://media.ccyishe.com/xcx/image/banner2.png',//https://media.ccyishe.com/images/20170731/1501468994078.png
      register: '../../image/registe.png',
      beijing: 'https://m.ccyishe.com/html/images/20171102/shishi.png',
      jxuan: 'https://m.ccyishe.com/html/images/20171102/jxuan.png',

    },
    item: {
      id: 1,
    },
    currentItemId: "1",
    tuijianrenId: '',
    iconInfos: [{
      id: 0,
      picUrl: '../../image/k.png',
      smallName: '快捷操作',
    }, {
      id: 1,
      picUrl: '../../image/woderenmai.png',
      smallName: '我的人脉',
    }, {
      id: 2,
      picUrl: '../../image/liudurenmai.png',
      smallName: '我的推荐',
    }],
    isFocus: true
  },
  joinWechat: function () {
    wx.setClipboardData({
      data: 'azm005',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '客服微信已复制',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  clickTap: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: 'regrm/regrm?rmtype=' + id,
    })
    // this.setData({
    //   currentItemId: e.currentTarget.dataset.num
    // })
  },
  checkrenmai: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: './list/list?usertype=' + id,
    })
  },
  checkTiShi: function () {
    wx.navigateTo({
      url: './tishi/tishi',
    })
  },
  checkIsWangshang: function () {
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
        console.log(res);
        var userws = res.data.json.user.userws;
        if (userws != 1) {
          wx.navigateTo({
            url: '../notes/myrm/myrm',
          })
        } else {
          wx.navigateTo({
            url: '../notes/myrm/myrm',
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
  checkAdInfo: function (e) {
    var id = e.currentTarget.id;
    var my_Id = wx.getStorageSync("myId");
    if (id == 0) {
      wx.navigateTo({
        url: '../user/Invitation/Invitation',
      })
    }  
    else if (id == 2) {
      wx.navigateTo({
        url: '../help/izm-value/izm-value?tuijianrenId=' + my_Id,
      })
    } else if (id == 1) {
      var xcxSession = wx.getStorageSync('xcxSession');
      if (xcxSession == "") {
        app.getXcxSession();
        xcxSession = wx.getStorageSync('xcxSession');
      }
      var that = this;
      wx.request({
        url: 'https://m.ccyishe.com/page/xcx/userserver!getVip.jsp',
        data: {
          xcxSession: xcxSession,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // success
          console.log("查询是否vip返回");

          console.log("res.data.json:" + res.data.json);
          console.log(res);
          var vipObj = res.data.json;
          var personData = that.data.personData;
          wx.navigateTo({
            url: '../user/openvip/openvip?personData='
            + JSON.stringify(personData) + "&vipObj=" + JSON.stringify(vipObj),
          })
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      });
    }
  },
  checkDetails: function (e) {
    var id = e.currentTarget.id;
    var my_Id = wx.getStorageSync("myId");
    if (id == 0) {
      wx.navigateTo({
        // url: '../help/new-user/new-user?tuijianrenId=' + my_Id,
        url: 'speed/speed?tuijianrenId=' + my_Id,
      })
    } else if (id == 1) {
      // wx.navigateTo({
      //   url: './tishi/tishi',
      // })
      wx.navigateTo({
        url: 'my/my',
      })
    } else if (id == 2) {
      this.checkIsWangshang();
    } 
  },
  focusUs: function () {
    wx.navigateTo({
      url: '../card/follow-us/follow-us',
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
                  console.log("app.js成功返回");
                  console.log(res);
                  var xcxSession = res.data.json.xcxSession;//当前使用小程序的用户令牌
                  var userId = res.data.json.userId;//当前使用小程序的注册用户id
                  wx.setStorageSync('xcxSession', xcxSession);
                  wx.setStorageSync('myId', userId);
                  that.getRenMaiCount();
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
                        that.panduanisFocus();
                      } else {//未注册
                        if (xcxSession != "") {
                          wx.redirectTo({
                            url: '../register/register?tuijianrenId=' + tuijianrenId,
                          })
                        }
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
                fail: function (res) {
                  
                  wx.showToast({
                    title: '错误1001:授权失败,请下拉刷新（code:' + code + ';encryptedData:' + encryptedData+';iv:'+iv+")",
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
            title: '错误1002:授权失败,请下拉刷新',
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log("登录失败");
        console.log(res);
        wx.showToast({
          title: '错误1003:授权失败,请下拉刷新',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log("最后执行了");
      }
    });
  },

  checkIsLogin: function () {//判断是否登录
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      this.invokeWhenXcxSessionNone();
    }else{
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
            that.getRenMaiCount();
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
    }
  },

  panduanisFocus: function () {
    var ownerId = wx.getStorageSync("myId");
    var xcxSession = wx.getStorageSync("xcxSession");
    var that = this;
    if (ownerId == "") {
      this.invokeWhenXcxSessionNone();
    }else{
      wx.request({//请求拿到用户数据的接口
        url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
        data: {
          ownerId: ownerId
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
      success: function (res) {
        console.log(ownerId + "传ownerId返回7-26-1" + xcxSession);
        wx.hideLoading();
        console.log(res);
        if (res.data.result == 'success') {
          var openId = res.data.json.user.openId;
          that.setData({ teamId: res.data.json.user.teamId, version: res.data.json.user.version });
          
          if (openId == null || openId == "") {
            that.setData({ isFocus: false });
          } else {
            that.setData({ isFocus: true });
          }
          that.getCountData();
        }
      },
      fail: function (res) {
        // fail
        console.log("传xcxSession失败返回");
        console.log(res);
        wx.hideLoading();
      },
      complete: function (res) {
        // complete

      }
      })
    }
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    })
    this.checkIsLogin(); 
    this.initPersonData();
    this.panduanisFocus();
  },
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene);
    this.setData({ scene: scene });
    if (scene != undefined && scene != 'undefined' && scene != '') {
      scene = util.strDiscode(scene);
      if (scene.indexOf("_") == -1) {
        wx.redirectTo({
          url: '../card/share/share?ownerId=' + scene,
        });
      } else {
        var scenes = scene.split("_");
        var ownerId = scenes[0];
        wx.redirectTo({
          url: '../register/register?tuijianrenId=' + ownerId,
        });
      }
    }
    var tuijianrenId = options.tuijianrenId;
    if (tuijianrenId != undefined) {
      this.setData({ tuijianrenId: tuijianrenId });
    }
    this.checkIsLogin();
    this.initPersonData();
    this.panduanisFocus();
  },
  getCountData: function () {
    var xcxSession = wx.getStorageSync("xcxSession");
    var that = this;
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/collectionsources!sourceNumber.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("查询count返回" + xcxSession);
        console.log(res);
        that.setData({ numberCount: res.data.json.numberCount });
        var iscount = that.data.numberCount;
        if (iscount == 0) {
          wx.navigateTo({
            url: '../register/myrm/myrm',
          });
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  getRenMaiCount: function () {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/userresources!sourceNumber.jsp',
      data: {
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("查询首页count返回" + xcxSession);
        console.log(res);
        that.setData({ obj: res.data.json });
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
  onShow: function () {
    //this.checkIsLogin();
    //this.getRenMaiCount();
  },

  onShareAppMessage: function () {
    var ownerId = wx.getStorageSync("myId");
    console.log("ownerId=" + ownerId);
    var that = this;
    return {
      title: '全国唯一一家精准人脉服务公司，一对一封闭式沟通' ,
      path: "pages/home2/home2?tuijianrenId=" + ownerId,
      imageUrl: "https://media.ccyishe.com/xcx/images/openvip.jpg",
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  transFormJson: function (res) {
    console.log(res);
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
      teamId: res.data.json.user.teamId,
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
      proNumber: res.data.json.user.proNumber,
      proNumberCount: res.data.json.user.proNumberCount,
    };
    this.setData({
      personData: personData,
      version: res.data.json.user.version
      // version: 1,
      // hehuo: 1
    });
  },
  getPersonDataFromServer: function (myId) {
    var praiseSession = wx.getStorageSync('xcxSession');
    var that = this;
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
      data: {
        ownerId: myId,
        praiseSession: praiseSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("传ownerId返回");
        console.log(res);
        wx.setStorageSync('indexData', res);
        wx.hideLoading();
        that.transFormJson(res);


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
  initPersonData: function () {
    var that = this;

    var myId = wx.getStorageSync("myId");

    if (myId == "") {
      app.getUserInfo(function (userInfo) {
        //更新数据
        console.log("微信个人数据");
        console.log(userInfo);
        var personData = {
          name: userInfo.nickName,
          personImg: userInfo.avatarUrl,
          shareCom: '',
          proNumber: ''
        };
        that.setData({
          personData: personData
        })
      })
      wx.hideLoading();
    } else {
      this.getPersonDataFromServer(myId);
    }
  }
})