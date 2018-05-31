// pages/home2/my/hlist/hlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    rmNum:0,
    recount: 0,
    userType: 3,
    pagesize:20,
    typeName: '',//人脉种类名称
    version: 0,//当前用户的版本：0=免费会员；1=VIP会员
  },/**
   * 添加通讯里
   */
  setInNotes: function (e) {
    var obj = e.currentTarget.dataset.my;
    var typeName = this.data.typeName;
    wx.addPhoneContact({
      nickName: "［" + typeName + "］" + obj.name,
      firstName: obj.name,
      mobilePhoneNumber: obj.phone,
      hostNumber: obj.phone,
      weChatNumber: obj.wechat,
      addressState: obj.provine,
      addressCity: obj.city,
      title: obj.position,
      organization: obj.companyName,
      success: function (res) {
        wx.setClipboardData({
          data: obj.phone,
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
              }
            })
          }
        });
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        });
      },
      fail: function (res) {

        wx.showToast({
          title: '保存失败' + res,
          icon: 'success',
          duration: 1000
        });
        console.log("保存失败");
        console.log(res);
      }
    });

  },
  shenji: function () {
    var that = this;
    wx.showLoading({
      title: '查询数据中...',
    })
    var xcxSession = wx.getStorageSync('xcxSession');
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
        console.log(res);
        wx.hideLoading();
        var vipObj = res.data.json;
        var personData = that.data.personData;
        wx.navigateTo({
          url: '../../user/openvip/openvip?personData='
          + JSON.stringify(personData) + "&vipObj=" + JSON.stringify(vipObj),
        })
      },
      fail: function (res) {
        // fail
        wx.hideLoading();
      },
      complete: function (res) {
        // complete
      }
    })
  },
  copyphone: function (e) {
    var obj = e.currentTarget.id;
    console.log("obj=" + obj) // data
    wx.setClipboardData({
      data: obj,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '手机号复制成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  },
  copywechat: function (e) {
    var obj = e.currentTarget.id;
    console.log("obj=" + obj) // data
    wx.setClipboardData({
      data: obj,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '微信复制成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  }, /**
   * 获取用户基本信息
   * 主要获取用户版本信息
   */
  getUserVersion: function () {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    //查询当前用户已查看人脉数
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/user!userInfo.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var _version = res.data.json.user.version;
        that.setData({
          version: _version
        })
      },
      fail: function (res) {
        // fail
        console.log("传xcxSession失败返回");
        console.log(res);

      },
      complete: function (res) {
        // complete

      }
    });
  },
  /**
   * 根据人脉类型参数，判断人脉属性
   */
  getRmType: function () {
    var rm_Type = this.data.userType;
    if (rm_Type == 1) {
      wx.setNavigationBarTitle({
        title: '实时人脉',
      });
      this.setData({ typeName: '实时人脉', rmNum: 35 })
    } else if (rm_Type == 2) {
      wx.setNavigationBarTitle({
        title: '精选人脉',
      })
      this.setData({ typeName: '精选人脉', rmNum: 50 })
    } else if (rm_Type == 3) {
      wx.setNavigationBarTitle({
        title: 'VIP人脉',
      })
      this.setData({ typeName: 'VIP人脉', rmNum: 15 })
    }
  },
  transFromJson: function (myZanList) {
    var listTmp = this.data.list;
    for (var i = 0; i < myZanList.length; i++) {
      listTmp.push(myZanList[i]);
    }
    this.setData({ list: listTmp });
  },
  getActiveList:function(){
    var xcxSession = wx.getStorageSync("xcxSession");
    var userType = this.data.userType;
    var rmstartIndex = wx.getStorageSync("rmstartIndex");
    if (rmstartIndex == "") {
      rmstartIndex = 1;
      wx.setStorageSync("rmstartIndex", 2);
    } else {
      rmstartIndex = parseInt(rmstartIndex);
      wx.setStorageSync("rmstartIndex", rmstartIndex + 1);
    }
    var ds = this.data.pagesize;
    var that = this;

    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/collectionsources! myRcList.jsp',
      data: {
        userType: userType,
        xcxSession: xcxSession,
        pn: rmstartIndex,
        ds:ds
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.transFromJson(res.data.json.list);
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var utype = options.userType;
    this.setData({ userType: utype});
    if (utype == "1") {
      wx.setNavigationBarTitle({
        title: '实时人脉',
      })
    } else if (utype == "2") {
      wx.setNavigationBarTitle({
        title: '精选人脉',
      })
    } else if (utype == "3") {
      wx.setNavigationBarTitle({
        title: 'Vip人脉',
      })
    } 

    wx.setStorageSync("rmstartIndex", "");
    this.getActiveList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getRmType();
    this.getUserVersion();
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
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getActiveList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})