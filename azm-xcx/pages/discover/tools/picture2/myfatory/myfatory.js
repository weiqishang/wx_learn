var app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    picNumber: 1, //从后台获取 表示用户可以生成几张图片
    picfiles: [],
    activeIndex: 0,
    sliderLeft: 0,
    sliderOffset: 0,

    myPoster: [],
    myCode: [],
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    
    var activeIndex = this.data.activeIndex;
    if (activeIndex == 0) {
      wx.setStorageSync("startPoster", "");
      this.setData({
        picNumber: 1, //从后台获取 表示用户可以生成几张图片
        picfiles: [],
        sliderLeft: 0,
        sliderOffset: 0,
        myPoster1: [],
        myPoster2: [],
      });
      this.initSystem();
      this.getMyPoster();
      
    } else {
      wx.setStorageSync("startCode", "");
      this.setData({
        picNumber: 1, //从后台获取 表示用户可以生成几张图片
        picfiles: [],
        sliderLeft: 0,
        sliderOffset: 0,
        myCode1: [],
        myCode2: [],
      });
      this.initSystem();
      this.getMyCode();
    }
  },
  checkCode: function (e) {
    var url = e.currentTarget.id;
    console.log(e);
    var id = e.currentTarget.dataset.my;
    wx.redirectTo({
      url: '../previewCode/previewCode?url=' + url + "&id=" + id,
    })
  },
  checkPoster: function (e) {
    var url = e.currentTarget.id;
    var id = e.currentTarget.dataset.my;
    console.log(e);
    wx.redirectTo({
      url: '../previewPoster/previewPoster?url=' + url + "&id=" + id,
    })
  },
  add: function () {
    wx.showActionSheet({
      itemList: ['设置二维码', '制作海报'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.redirectTo({
            url: '../edit-code/my-code/add-code/add-code',
          })
        } else if (res.tapIndex == 1) {
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed', 'original'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              console.log(res.tempFilePaths[0]);
              wx.redirectTo({
                url: '../edit-poster/edit-poster?imgUrl=' + res.tempFilePaths[0]
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  initSystem: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth;
        var height = res.windowHeight;
        that.setData({ width: width, height: height });
        that.setData({
          sliderLeft: ((res.windowWidth * 9 / 10) / 2 - sliderWidth) / 2,
          sliderOffset: (res.windowWidth * 9 / 10) / 2 * that.data.activeIndex
        });
      }
    })
  },

  transFromJson: function (list) {//转换个人文章json


    var myPoster1Tmp = this.data.myPoster1;
    var myPoster2Tmp = this.data.myPoster2;


    var allLen = myPoster1Tmp.length + myPoster2Tmp.length + list.length;
    var yiban = parseInt(list.length/ 2);

    for (var i = 0; i < yiban; i++) {
      myPoster1Tmp.push(list[i]);
    }
    console.log("海报数组1：" + myPoster2Tmp.length);
    for (var i = yiban; i < list.length; i++) {
      console.log("执行" + i);
      myPoster2Tmp.push(list[i]);
    }
    console.log("海报数组2：" + myPoster2Tmp.length);
    this.setData({ myPoster1: myPoster1Tmp, myPoster2: myPoster2Tmp });
  },
  getMyPoster: function () {
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    var startPoster = wx.getStorageSync("startPoster");
    if (startPoster == "") {
      startPoster = 1;
      wx.setStorageSync("startPoster", 2);
    } else {
      startPoster = parseInt(startPoster);
      wx.setStorageSync("startPoster", startPoster + 1);
    }
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/twocode!pagingList.jsp',
      data: {
        xcxSession: xcxSession,
        codeType: 1,//二维码 0、 生成好的海报 1
        startIndex: startPoster,
        size: 24
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("查询海报返回" + startPoster);
        console.log(res);
        var list = res.data.json.twoCodeList;
        var count = res.data.json.count
        that.setData({ count: count });
        wx.hideLoading();
        that.transFromJson(list);
      }
    })
  },
  transCodeFromJson: function (list) {//转换个人文章json
    if(list.length==1){
      this.setData({ myCode1: list, myCode2:[] });
    }else{
      var myCode1Tmp = this.data.myCode1;
      var myCode2Tmp = this.data.myCode2;
      var allLen = myCode1Tmp.length + myCode2Tmp.length + list.length;
      var yiban = parseInt(list.length / 2);
      for (var i = 0; i < yiban; i++) {
        myCode1Tmp.push(list[i]);
      }
      for (i = yiban; i < list.length; i++) {
        myCode2Tmp.push(list[i]);
      }
      this.setData({ myCode1: myCode1Tmp, myCode2: myCode2Tmp });
    }
    
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
        size: 24
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
        wx.hideLoading();
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id == 1) {
      if (this.data.myCode.length == 0) {//只有第一次点击才需要加载
        wx.showLoading({
          title: '加载中...',
        })
        this.getMyCode();
      }
    } else if (e.currentTarget.id == 0){
      if (this.data.myPoster.length == 0) {//只有第一次点击才需要加载
        wx.showLoading({
          title: '加载中...',
        })
        this.getMyPoster();
      }
    }
  },
  chooseImage: function (e) {//打开相册/相机
    var that = this;
    if (that.data.picNumber > 0) {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed', 'original'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          console.log(res.tempFilePaths[0]);
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
  editPoster: function (obj) {//剪切海报
    var displayname = obj.target.dataset.displayname;
    var imgUrl = obj.target.dataset.src;
    var posterId = obj.target.dataset.posterId;
    wx.navigateTo({
      url: '../edit-poster/edit-poster?imgUrl=' + imgUrl + '&posterId=' + posterId + '&displayname=' + displayname
    })
  },
  toAddCode: function () {//TODO跳转到添加二维码页面
    wx.navigateTo({
      url: '../edit-code/my-code/add-code/add-code'
    })
  },

  onLoad: function (options) {
    //需要的参数，进来是要加载谁？需要刷新不？
    // options.checkPoster = 1;
    // options.checkCode = 1;
    this.setData({
      picNumber: 1, //从后台获取 表示用户可以生成几张图片
      picfiles: [],
      sliderLeft: 0,
      sliderOffset: 0,
      myPoster1: [],
      myPoster2: [],
      myCode1: [],
      myCode2: [],
    });
    wx.setStorageSync("startPoster", "");
    wx.setStorageSync("startCode", "");
    if (options.needRefresh == "1") {
      wx.showLoading({
        title: '加载中...',
      })
      this.initSystem();
      if (options.checkCode=="1"){
        this.getMyCode();
        this.setData({ activeIndex: 1});
      }else{
        this.getMyPoster();//拿到我的海报
      }
      
    }


  },
  onUnload: function () {
    wx.setStorageSync("startPoster", "");
    wx.setStorageSync("startCode", "");

  },
  onShow: function () {
    this.initSystem();
  },
  addTwoCode: function () {
    wx.navigateTo({
      url: '../edit-code/my-code/add-code/add-code',
    })
  },
  onReachBottom: function () {
    var activeIndex = this.data.activeIndex;

    if (activeIndex == 0) {
      var allLen = this.data.myPoster1.length + this.data.myPoster2.length;

      if (allLen == this.data.count) {
        return;
      }
      this.getMyPoster();
      console.log("0");
    } else {
      console.log("1");
      var allLen = this.data.myCode2.length + this.data.myCode2.length;
      if (allLen == this.data.codecount) {
        return;
      }
      this.getMyCode();
    }

  },


})