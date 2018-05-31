Page({
  data: {
    url:''
  },
  setImgHeight:function(e){
    console.log("图片加载完成");
    console.log(e);
    var height = e.detail.height;
    var width = e.detail.width;
    var screenHeight = this.data.height;
    var screenWidth = this.data.width;
    var nowImgHeihgt = (height * screenWidth)/ width;

    var top = (screenHeight - nowImgHeihgt)/2;
    this.setData({ top: top});
  },
  myFactory:function(){
    wx.redirectTo({
      url: '../myfatory/myfatory?needRefresh=1&checkCode=0'
    })
  },
  delPoster:function(){
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
        console.log("删除二维码返回");
        console.log(res);
        if (res.data.result == "success") {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../myfatory/myfatory?needRefresh=1&checkCode=0'
            })
          }, 1200);
        }
      }
    })
  },
  checkImg:function(e){
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
        that.setData({ width: width, height: height });
        
      }
    })
  },
  onLoad: function (options) {
    //options.url = "https://media.ccyishe.com/images/20170627/1498549675805.jpg";
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