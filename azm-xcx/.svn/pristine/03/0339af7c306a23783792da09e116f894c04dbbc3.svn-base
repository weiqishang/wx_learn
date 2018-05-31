
Page({
  data: {
    myCode: [],
    choiceImgUrl:-1,
  },
  setCode:function(){
    wx.redirectTo({
      url: '../../edit-code/my-code/add-code/add-code',
    })
  },
  comfirmChoice:function(){//确定选择二维码
    var drawObj = this.data.drawObj;
    var choiceImgUrl = this.data.choiceImgUrl;
    if (choiceImgUrl==-1){

    }else{
      wx.redirectTo({
        url: '../codeInPoster/codeInPoster?drawObj=' + JSON.stringify(drawObj) + "&choiceImgUrl=" + choiceImgUrl,
      })
    }
    
  },
  chooseImg:function(e){
    console.log(e);
    var id = e.currentTarget.id;
    this.setData({choiceImgUrl:id});
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
  transCodeFromJson: function (list) {//转换个人文章json

    var myCodeTmp = this.data.myCode;
    for (var i = 0; i < list.length; i++) {
      myCodeTmp.push(list[i]);
    }
    this.setData({ myCode: myCodeTmp });
  },
  getMyCode: function () {
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    var startCode = wx.getStorageSync("startCode");
    if (startCode == "") {
      startCode = 1;
      wx.setStorageSync("startCode", 2);
    } else {
      startCode = parseInt(startCode);
      wx.setStorageSync("startCode", startCode + 1);
    }
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/twocode!pagingList.jsp',
      data: {
        xcxSession: xcxSession,
        codeType: 0,//二维码 0、 生成好的海报 1
        startIndex: startCode,
        size: 20
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("查询二维码返回" + startCode);
        console.log(res);
        var list = res.data.json.twoCodeList;
        var codecount = res.data.json.count
        that.setData({ codecount: codecount });
        that.transCodeFromJson(list);
      }
    })
  },
  onLoad: function (options) {
    var drawObjStr = options.drawObj;
    var drawObj = JSON.parse(drawObjStr);
    this.setData({ drawObj: drawObj });
    this.initSystem();
    this.getMyCode();
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
    wx.setStorageSync("startPoster", "");
    wx.setStorageSync("startCode", "");
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
    if (this.data.myCode.length == this.data.codecount) {
      return;
    }
    this.getMyCode();
  },

})