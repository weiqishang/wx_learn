// plist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    recount:0,
    userType:6,
  },
  back: function () {
    wx.navigateBack({
      delta: 1,
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
  }
  ,


  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({ userType: parseInt(options.userType) }); //
    var userType = options.userType;
    if (userType=="1"){
      wx.setNavigationBarTitle({
        title: '我的直销人脉',
      })
    } else if (userType == "2") {
      wx.setNavigationBarTitle({
        title: '我的微商人脉',
      })
    } else if (userType == "3") {
      wx.setNavigationBarTitle({
        title: '我的宝妈人脉',
      })
    } else if (userType == "4") {
      wx.setNavigationBarTitle({
        title: '我的在校大学生人脉',
      })
    } else if (userType == "5") {
      wx.setNavigationBarTitle({
        title: '我的私营老板人脉',
      })
    } else if (userType == "6") {
      wx.setNavigationBarTitle({
        title: '我的保险从业者人脉',
      })
    }
    this.getDetailsList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  setInNotes: function (e) {
    var obj = e.currentTarget.dataset.my;
    wx.addPhoneContact({
      nickName: obj.name,
      firstName: obj.name,
      mobilePhoneNumber: obj.phone,
      hostNumber: obj.phone,
      weChatNumber: obj.wechat,
      addressState: obj.provine,
      addressCity: obj.city,
      title: obj.position,
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
  /**
   * 生命周期函数--监听页面显示
   */
  transFromJson: function (myZanList) {
    var listTmp = this.data.list;
    for (var i = 0; i < myZanList.length; i++) {
      listTmp.push(myZanList[i]);
    }
    this.setData({ list: listTmp });
  },
  getDetailsList: function (){
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
    var that = this;
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/collectionsources!pagingList.jsp',
      data: {
        userType: userType,
        xcxSession: xcxSession,
        startIndex: rmstartIndex
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(userType + "--" + rmstartIndex+"查询list返回" + xcxSession);
        console.log(res);

        that.transFromJson(res.data.json.list);
        that.setData({ recount: res.data.json.count});
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
    wx.setStorageSync("rmstartIndex", "");
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
    if (this.data.list.length == this.data.rmcount) {
      return;
    }
    this.getDetailsList();
  },
})