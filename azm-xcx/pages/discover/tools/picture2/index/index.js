Page({

  data: {
    animationData1: {},
    proEnugh: 1, 
  },
  setTwoCode:function(){
    
  },
  setCode:function(){
    wx.navigateTo({
      url: '../edit-code/my-code/add-code/add-code',
    })
  },
  myfatory:function(){
    wx.navigateTo({
      url: '../myfatory/myfatory?needRefresh=1&checkCode=0'
    })
  },
  chooseImage: function (e) {//打开相册/相机
    var that = this;
    if (that.data.proEnugh > 0) {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed', 'original'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          console.log(res.tempFilePaths[0]);
          var cH = that.data.height - 65 - 40;
          var cW = that.data.widht - 40;
          // var drawObj = {
          //   oldx: 0,
          //   oldy: 0,
          //   scaleHeight: cH,
          //   scaleWidth: cW,
          //   imgUrl: res.tempFilePaths[0],
          // };
          // wx.navigateTo({
          //   url: '../edit-poster/codeInPoster/codeInPoster?drawObj=' + JSON.stringify(drawObj),
          // })
          wx.navigateTo({
            url: '../edit-poster/edit-poster?imgUrl=' + res.tempFilePaths[0]
          })
        }
      })
    } else {  //脉点数不够 跳转到上限页面
      wx.navigateTo({
        url: '../ceiling/ceiling'
      })
    }
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
    this.initSystem();
  },

  onReady: function () {

  },
  
  setAnimation:function(){
    var width = this.data.width;
    var animation1 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation1.translate(width, 0).step();
    this.setData({
      animationData1: animation1.export()
    });
    var that = this;
    setTimeout(function(){
      var animation2 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      animation2.translate(0, -110).step();
      that.setData({
        animationData2: animation2.export()
      });
    },500);
    
  },
  onShow: function () {
    this.setAnimation();
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
