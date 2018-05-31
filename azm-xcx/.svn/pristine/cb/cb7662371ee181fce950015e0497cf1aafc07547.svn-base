// my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamId: 0,
    icon: {
      jingxuan: '../../../image/jingxuan.png',
      zhiying: '../../../image/zhiying.png',
      wei: '../../../image/wei.png',
      baoma: '../../../image/baoma.png',
      xuesheng: '../../../image/xuesheng.png',
      siying: '../../../image/siying.png',
      baoxian: '../../../image/baoxian.png',
      banner1: 'https://media.ccyishe.com/images/20170731/1501468994078.png',
      register: '../../../image/registe.png',
    },
    obj:{}
  },
  checkRenMailist:function(e){
    var userType = e.currentTarget.id;
    wx.navigateTo({
      url: 'plist/plist?userType=' + userType,
    })
  },
  checkhlist: function (e) {
    var userType = e.currentTarget.id;
    wx.navigateTo({
      url: 'hlist/hlist?userType=' + userType,
    })
  },
  getTeamID:function(e){
    var ownerId = wx.getStorageSync("myId");
    var xcxSession = wx.getStorageSync("xcxSession");
    var that = this;
    if (xcxSession == "") {
      return;
    }
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
        console.log(ownerId + "传ownerId返回7-26-1" + xcxSession);
        wx.hideLoading();
        console.log(res);
        if (res.data.result == 'success') {
          that.setData({ teamId: res.data.json.user.teamId });
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  getCountData:function(){
    var xcxSession = wx.getStorageSync("xcxSession");
    var that = this;
    this.getTeamID();
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
       
        that.setData({ obj:res.data.json});
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
    this.getCountData();
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
  
  }
})