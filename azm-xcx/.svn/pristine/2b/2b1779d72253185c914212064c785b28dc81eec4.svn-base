Page({

  data: {
    url: ''
  },
  myFactory: function () {
    wx.redirectTo({
      url: '../myfatory/myfatory?needRefresh=1&checkCode=1'
    })
  },
  delCode:function(){
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/twocode!delete.jsp',
      data: {
        xcxSession: xcxSession,
        cid: that.data.cid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("删除二维码返回" );
        console.log(res);
        if (res.data.result == "success"){
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
          });
          setTimeout(function(){
            wx.redirectTo({
              url: '../myfatory/myfatory?needRefresh=1&checkCode=1'
            })
          },1200);
        }
      }
    })
  },
  checkImg: function (e) {
    var url = e.currentTarget.id;
    console.log(e);
    wx.previewImage({
      urls: [url],
    })
  },
  initSystem: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth;
        var height = res.windowHeight;
        that.setData({ width: width, height: height,top:(height-width)/3});

      }
    })
  },
  onLoad: function (options) {
    //options.url = "https://media.ccyishe.com/images/20170610/1497062919746.png";
    this.setData({ url: options.url, cid: options.id});
    this.initSystem();
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  }
})