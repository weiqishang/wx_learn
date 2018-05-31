var olddistance = 0;  //这个是上一次两个手指的距离  
var newdistance;      //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
var oldscale = 1;     //这个是上一次动作留下的比例  
var diffdistance;     //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
var ctx;

var moveFlag = false;
var mx = 0;
var my = 0;
var disx = 0;
var disy = 0;
Page({
  data: {
    twoFlag: false,
    oldx: 0,
    oldy: 0,
    twoCodeUrl: '',
    imgUrl: '',
    standardValue:1,
  },
  getStandardValue: function (cW){
    var i = 1;
    while(cW<750){
      i = i+1;
      cW = cW * i;
    }
    this.setData({standardValue:i});
  },
  savePoster:function(url){
    console.log("上传图片url" + url);
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.showLoading({
      title: '生成中...',
    })
    wx.uploadFile({
      url: 'https://m.ccyishe.com/page/xcx/twocode!addBackPic.jsp',
      filePath: url,
      name: 'file',
      formData: {
        xcxSession: xcxSession,
        fileFileName: 'file'
      },
      success: function (res) {
        console.log("上传合成图片成功返回");
        wx.hideLoading();
        console.log(res);
        var obj = JSON.parse(res.data);
        console.log(obj);
        if (obj.result == "notProNumber"){
          wx.navigateTo({
            url: '../../../message/message',
          })
        }else{
          wx.redirectTo({
            url: '../../myfatory/myfatory?needRefresh=1&checkCode=0',
            fail: function (res) {
              console.log("跳转失败");
              console.log(res);
            }
          })
          // wx.redirectTo({
          //   url: '../../previewPoster/previewPoster?url=' + obj.json.picUrl + "&id=" + obj.json.cid,
          //   fail: function (res) {
          //     console.log("跳转失败");
          //     console.log(res);
          //   }
          // })
        }
        
      },
      fail: function (res) {
        wx.hideLoading();
        var data = res.data
        console.log("上传合成图片失败");
        console.log(res);
      }
    })
  },

  finishToDraw: function () {
    var scaleWidth = this.data.scaleWidth;
    var scaleHeight = this.data.scaleHeight;
    var standardValue = this.data.standardValue;

    var ctx = wx.createCanvasContext('myCanvas4');
    ctx.clearActions();
    var cH = this.data.cH;
    var cW = this.data.cW;


    ctx.clearRect(0, 0, cW, cH);
    var imgUrl = this.data.imgUrl;
    var drawObj = this.data.drawObj;
    var v1 = drawObj.oldx * standardValue;
    var v2 = drawObj.oldy * standardValue;
    var v3 = drawObj.scaleWidth * standardValue;
    var v4 = drawObj.scaleHeight * standardValue;
    ctx.drawImage(imgUrl, v1, v2, v3, v4);

    var twoCodeUrl = this.data.twoCodeUrl;

    var v5 = this.data.oldx * standardValue;
    var v6 = this.data.oldy * standardValue;
    var v7 = scaleWidth * standardValue;
    var v8 = scaleHeight * standardValue;

    console.log(v7 + "生成二维码" + v8+"v2:"+v2);
    ctx.drawImage(twoCodeUrl, v5, v6, v7, v8);
    ctx.draw();
    if(v2<0){
      v2 = 0;
    }
    var that = this;
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas4',
        x: 0,
        y: 0,
        width: cW * standardValue,
        height: cH * standardValue,
        destWidth: cW * standardValue,
        destHeight: cH * standardValue,
        // x: 0,
        // y: v2,
        // width: cW * standardValue,
        // height: cH * standardValue - v2*2,
        // destWidth: cW * standardValue,
        // destHeight: cH * standardValue - v2 * 2,
        success: function (res) {
          console.log(v2+"成功");
          console.log(res);

          that.savePoster(res.tempFilePath);
          // wx.previewImage({
          //   current: res.tempFilePath, // 当前显示图片的http链接
          //   urls: [res.tempFilePath] // 需要预览的图片http链接列表
          // })
        },
        fail: function (res) {
          console.log("生成失败");
          console.log(res);
        },
        complete: function (res) {
          console.log("生成结束");
          console.log(res);
        }
      })
    }, 500);

  },
  initSystem: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth;
        var height = res.windowHeight;
        console.log(height + "++++++++++" + width);
        that.setData({ W: width, H: height });
        var newHeight = height - 65 - 40;
        var newWidth = width - 40;
        console.log(newHeight + "---" + newWidth);
        that.setData({ scaleHeight: 200, scaleWidth: 200 });
        that.setData({ cH: newHeight, cW: newWidth });
        that.getStandardValue(newWidth);
      }
    })
  },
  initCanavsBackgroundImg: function (drawObj) {
    var twoCodeUrl = this.data.twoCodeUrl;
    var ctx = wx.createCanvasContext('myCanvas3');
    ctx.clearActions();

    var cH = this.data.cH;
    var cW = this.data.cW;

    var x = (cW-200)/2;
    var y = (cH-200)/2;

    
    this.setData({
      oldx: x,
      oldy: y,});

    var imgUrl = this.data.imgUrl;
    var drawObj = this.data.drawObj;
    ctx.drawImage(imgUrl, drawObj.oldx, drawObj.oldy, drawObj.scaleWidth, drawObj.scaleHeight);
    if (twoCodeUrl != "") {
      console.log("初始化画图：" + twoCodeUrl);
      ctx.drawImage(twoCodeUrl, x, y, 200, 200);
    }
    ctx.draw();
  },
  chooseTwoCode: function () {
    var drawObj = this.data.drawObj;

    wx.redirectTo({
      url: '../chooseCode/chooseCode?drawObj=' + JSON.stringify(drawObj),
    })
  },
  moveImg: function (disx, disy) {
    var scaleWidth = this.data.scaleWidth;
    var scaleHeight = this.data.scaleHeight;

    var ctx = wx.createCanvasContext('myCanvas3');
    ctx.clearActions();
    var cH = this.data.cH;
    var cW = this.data.cW;
    ctx.clearRect(0, 0, cW, cH);
    var imgUrl = this.data.imgUrl;
    var drawObj = this.data.drawObj;
    ctx.drawImage(imgUrl, drawObj.oldx, drawObj.oldy, drawObj.scaleWidth, drawObj.scaleHeight);

    var twoCodeUrl = this.data.twoCodeUrl;
    var newx = this.data.oldx + disx;
    var newy = this.data.oldy + disy;
    this.setData({ oldx: newx, oldy: newy });

    ctx.drawImage(twoCodeUrl, newx, newy, scaleWidth, scaleHeight);
    ctx.draw();
  },
  drawNewImg: function (scaleHeight, scaleWidth) {
    var ctx = wx.createCanvasContext('myCanvas3');
    ctx.clearActions();
    var cH = this.data.cH;
    var cW = this.data.cW;
    ctx.clearRect(0, 0, cW, cH);
    var imgUrl = this.data.imgUrl;
    var drawObj = this.data.drawObj;
    ctx.drawImage(imgUrl, drawObj.oldx, drawObj.oldy, drawObj.scaleWidth, drawObj.scaleHeight);

    var imgUrl = this.data.twoCodeUrl;
    var newx = this.data.oldx + disx;
    var newy = this.data.oldy + disy;
    this.setData({ oldx: newx, oldy: newy });

    ctx.drawImage(imgUrl, newx, newy, scaleWidth, scaleHeight);
    ctx.draw();
  },
  touchMoveImg: function (e) {
    // console.log("手移动");
    // console.log(e);
    var twoCodeUrl = this.data.twoCodeUrl;
    if (twoCodeUrl == "") {
      return;
    }

    if (e.touches.length == 2) {
      this.setData({ twoFlag: true });
      var xMove = e.touches[1].clientX - e.touches[0].clientX;
      var yMove = e.touches[1].clientY - e.touches[0].clientY;
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//两手指之间的距离   
      if (olddistance == 0) {
        olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
        console.log(olddistance);
      }
      else {
        newdistance = distance; //第二次就可以计算它们的差值了  
        diffdistance = newdistance - olddistance;

        console.log(diffdistance);
        var newScale = 1 + 0.002 * diffdistance;  //比例  
        if (newScale >= 1 && this.data.scaleWidth >= this.data.cW) {
          return;
        }
        olddistance = newdistance; //计算之后更新 
        console.log(newScale);
        //刷新.wxml  
        var baseHeight = this.data.scaleHeight;
        var baseWidth = this.data.scaleWidth;
        var scaleWidth = newScale * baseWidth;
        var scaleHeight = newScale * baseHeight;
        this.setData({
          scaleHeight: scaleHeight,
          scaleWidth: scaleWidth
        })
        //oldscale = newScale;
        //更新比例  
        this.drawNewImg(scaleHeight, scaleWidth);
      }
    } else {
      if (my == 0 && mx == 0) {
        mx = e.changedTouches[0].clientX;
        my = e.changedTouches[0].clientY;
      } else {
        var disx = e.changedTouches[0].clientX - mx;
        var disy = e.changedTouches[0].clientY - my;
        mx = e.changedTouches[0].clientX;
        my = e.changedTouches[0].clientY;
        console.log(disx + "移动2" + disy);
        this.moveImg(disx, disy);
      }
    }
  },
  touchendImg: function (e) {
    if (this.data.twoFlag) {
      // console.log("触摸结束");
      // console.log(e);
      olddistance = 0;
      this.setData({ twoFlag: false });
    } else if (my != 0 && mx != 0) {
      mx = 0;
      my = 0;
      disx = 0;
      disy = 0;
    }
  },
  testDownLoadImg: function () {
    var that = this;
    wx.downloadFile({
      url: "http://pic.qiantucdn.com/58pic/26/54/60/37a58PICmcP.jpg",
      success: function (res) {
        var savedFilePath = res.tempFilePath;
        that.setData({ imgUrl: savedFilePath });


        var drawObj = {
          oldx: 0,
          oldy: 0,
          scaleHeight: that.data.cH,
          scaleWidth: that.data.cW,
          imgUrl: savedFilePath,
        };
        that.setData({ drawObj: drawObj });

        wx.downloadFile({
          url: "https://media.ccyishe.com/images/20170531/1496205294664.png",
          success: function (res) {
            var savedFilePath = res.tempFilePath;
            that.setData({ twoCodeUrl: savedFilePath });

            that.initCanavsBackgroundImg(drawObj);
          }
        })
      }
    })
  },
  normalDownLoadImg: function (options) {
    var drawObjStr = options.drawObj;
    var drawObj = JSON.parse(drawObjStr);
    this.setData({ imgUrl: drawObj.imgUrl, drawObj: drawObj });
    var that = this;
    if (options.choiceImgUrl != undefined) {

      wx.downloadFile({
        url: options.choiceImgUrl,
        success: function (res) {
          var savedFilePath = res.tempFilePath;
          that.setData({ twoCodeUrl: savedFilePath });
          that.initCanavsBackgroundImg(drawObj);
        }
      })
    } else {
      that.initCanavsBackgroundImg(drawObj);
    }

  },
  onLoad: function (options) {
    this.initSystem();
    var that = this;
    //this.testDownLoadImg();
    console.log("onload进来");
    console.log(options.drawObj);
    this.normalDownLoadImg(options);
  },


  onReady: function () {

  },

  setAnimation: function () {
    var width = this.data.W;
    var that = this;

    var animation2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation2.translate(0, -65).step();
    that.setData({
      animationData2: animation2.export()
    });

  },
  onShow: function () {
    this.initSystem();
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