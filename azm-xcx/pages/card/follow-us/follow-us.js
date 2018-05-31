// pages/card/follow-us/follow-us.js
Page({
  data: {
    wheight: "",
    buttonw: "",
    buttonpw: "",
    contentw: "",
    picw: "",
    sjc: new Date().getTime()
  },
  mylongtap: function () {
    // wx.showToast({
    //   title: '',
    //   icon: 'loading',
    //   duration: 2000
    // })

  },
  tapGongzhonghao: function () {
    var imgUrl = 'https://m.ccyishe.com/web/mpRcode.jpg?v=' + this.data.sjc;
    console.log(imgUrl);
    wx.previewImage({
      current: imgUrl, // 当前显示图片的http链接
      urls: [imgUrl] // 需要预览的图片http链接列表
    })
  },

  onLoad: function (options) {

  },
  closePage: function () {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight);
        that.setData({
          wheight: res.windowHeight,

          picw: (res.windowHeight) * 0.9 * 0.66 * 0.64,

        });
        console.log(that.data.picw + "-----------------");
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})