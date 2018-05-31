// ts.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
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


  },
  onLoad: function (options) {
    this.initPersonData();
  },
  checkIsVip: function () {
    var xcxSession = wx.getStorageSync('xcxSession');
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
        console.log(res);
        var vipObj = res.data.json;
        var personData = that.data.personData;
        wx.navigateTo({
          url: '../../user/openvip/openvip?personData='
          + JSON.stringify(personData) + "&vipObj=" + JSON.stringify(vipObj),
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
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
      proNumberCount: res.data.json.user.proNumberCount
    };
    this.setData({ personData: personData });
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
  shengji:function(){
    this.checkIsVip();
  },
  getBack:function(){
    wx.navigateBack({
      delta: 1
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
  onShow: function () {
    this.initPersonData();
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})