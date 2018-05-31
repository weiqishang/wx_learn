Page({

  data: {
    list:[],
    isFocus:false
  },
  focusUs:function(){
    wx.navigateTo({
      url: '../../card/follow-us/follow-us',
    })
  },
  call:function(e){
    var phone =  e.currentTarget.id;
    console.log(phone);
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  moveToHome:function(){
    wx.switchTab({
      url: '../../home2/home2',
    })
  },
  setInNotes:function(e){
    console.log(e);
    var obj = e.currentTarget.dataset.my;
    console.log(obj);
    wx.addPhoneContact({
      firstName: obj.name,
      mobilePhoneNumber: obj.phone,
      weChatNumber: obj.wechat,
      addressState: obj.provine,
      addressCity: obj.city,
      title: obj.position,
      photoFilePath: obj.picUrl,
      success: function (res) {
        console.log("保存成功");
        console.log(res);
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
      },
      fail: function (res) {
        console.log("保存失败");
        console.log(res);
      }
    });

  },
  transFromJson:function(list){
    this.setData({list:list});
  },
  getTwenTyRM:function(){
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/userresources!list.jsp',
      data: {
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询20条人脉返回" + xcxSession);
        console.log(res);

        // if (res.data.result=="not userinfo"){
        //   wx.showModal({
        //     title: '温馨提醒',
        //     showCancel:false,
        //     content: '您还需要完善个人信息才能查看！',
        //     confirmText:'立即完善',
        //     success: function (res) {
        //       if (res.confirm) {
        //         console.log('用户点击确定')
        //         wx.redirectTo({
        //           url:'../setcard/setcard',
        //         })
        //       } else if (res.cancel) {
        //         console.log('用户点击取消')
        //       }
        //     }
        //   })
        // }else{
          that.transFromJson(res.data.json.list);
       // }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  panduanisFocus: function () {
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
        var openId = res.data.json.user.openId;
        if (openId == null || openId == "") {
          that.setData({ isFocus: false });
        } else {
          that.setData({ isFocus: true });
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
  onLoad: function (options) {
    // var xcxSession = options.xcxSession;
    // if (xcxSession != undefined || xcxSession!='undefined'){
    //   wx.setStorageSync("xcxSession", xcxSession);
    // }
    this.getTwenTyRM();
    this.panduanisFocus();
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
    this.panduanisFocus();
  },

  onReachBottom: function () {

  },
})