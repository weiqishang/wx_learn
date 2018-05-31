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
    imgUrl: '',
    oldx: 0,
    oldy: 0,
    imgH: 0,
    imgW: 0,
    scaleHeight: 0,
    scaleWidth: 0,
  },
  finishToDraw: function (drawObj) {
    var ctx = wx.createCanvasContext('myCanvas3');
    ctx.clearActions();
    var v1 = drawObj.oldx * 2 / 2;
    var v2 = drawObj.oldy * 2 / 2;
    var v3 = drawObj.scaleWidth * 2 / 2;
    var v4 = drawObj.scaleHeight * 2 / 2;
    ctx.drawImage(drawObj.imgUrl, v1, v2, v3, v4);

    var cW = this.data.cW * 4;;
    var cH = this.data.cH * 4;
    var that = this;
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas3',
        x: 0,
        y: 0,
        width: that.data.cW,
        height: that.data.cH,
        destWidth: cW,
        destHeight: cH,
        success: function (res) {
          console.log("成功");
          console.log(res);
          wx.previewImage({
            current: res.tempFilePath, // 当前显示图片的http链接
            urls: [res.tempFilePath] // 需要预览的图片http链接列表
          })
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
    }, 10);

  },
 
  finishToInserTwoCode: function () {
    var scaleHeight = this.data.scaleHeight;
    var scaleWidth = this.data.scaleWidth;

    var imgUrl = this.data.imgUrl;
    var that = this;
    var drawObj = {
      oldx: that.data.oldx,
      oldy: that.data.oldy,
      scaleHeight: scaleHeight,
      scaleWidth: scaleWidth,
      imgUrl: imgUrl,
    };

    //this.finishToDraw(drawObj);
    wx.navigateTo({
      url: './codeInPoster/codeInPoster?drawObj=' + JSON.stringify(drawObj),
    })
  },
  imgLoadFinish: function (e) {
    console.log("图片加载完成");
    console.log(e);
    var imgW = e.detail.width;
    var imgH = e.detail.height;
    var cH = this.data.cH;
    var cW = this.data.cW;

    var newImgH = (imgH * cW) / imgW;//让图片宽度适应编辑框宽度

    var newy = (cH - newImgH) / 2;

    this.setData({ imgW: cW, imgH: newImgH, oldy: newy });

    this.setData({ scaleHeight: newImgH, scaleWidth: cW });

    ctx = wx.createCanvasContext('myCanvas3');
    var imgUrl = this.data.imgUrl;
    ctx.drawImage(imgUrl, 0, newy, cW, newImgH);
    ctx.draw();
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
        //that.setData({ scaleHeight: newHeight, scaleWidth: newWidth });
        that.setData({ cH: newHeight, cW: newWidth });
      }
    })
  },
  drawNewImg: function (scaleHeight, scaleWidth) {
    ctx.clearActions();
    var cH = this.data.cH;
    var cW = this.data.cW;
    ctx.clearRect(0, 0, cW, cH);

    var imgUrl = this.data.imgUrl;

    ctx.drawImage(imgUrl, this.data.oldx, this.data.oldy, scaleWidth, scaleHeight);
    ctx.draw();
  },
  moveImg: function (disx, disy) {
    var scaleWidth = this.data.scaleWidth;
    var scaleHeight = this.data.scaleHeight;
    ctx.clearActions();
    var cH = this.data.cH;
    var cW = this.data.cW;
    ctx.clearRect(0, 0, cW, cH);

    var imgUrl = this.data.imgUrl;

    var newx = this.data.oldx + disx;
    var newy = this.data.oldy + disy;
    console.log(this.data.oldx + "移动3---" + this.data.oldy);
    this.setData({ oldx: newx, oldy: newy });

    console.log(newx + "移动" + newy);
    ctx.drawImage(imgUrl, newx, newy, scaleWidth, scaleHeight);
    ctx.draw();
  },
  touchMoveImg: function (e) {

    // console.log("手移动");
    console.log(e);
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
        olddistance = newdistance; //计算之后更新  
        console.log(diffdistance);
        var newScale = 1 + 0.002 * diffdistance;  //比例  
        console.log(newScale);
        //刷新.wxml  
        var baseHeight = this.data.scaleHeight;
        var baseWidth = this.data.scaleWidth;
        if (baseHeight == 0 || baseWidth == 0) {//图片加载未完毕，不允许缩放
          return;
        }
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
      // this.setData({
      //   oldx: 0,
      //   oldy: 0
      // });
    }
  },
  touchstartImg: function (e) {
    console.log("触摸开始");
    console.log(e);
  },
  openConfirm: function () {
    var that = this;
    wx.showModal({
      title: '重置提示',
      content: '是否恢复原来设置？',
      confirmText: "确认",
      cancelText: "暂不",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          that.chongzhi();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  chongzhi: function () {
    var height = this.data.H;
    var width = this.data.W;
    var cH = this.data.cH;
    var cW = this.data.cW;
    var imgW = this.data.imgW;
    var imgH = this.data.imgH;

    var newy = (cH - imgH) / 2;

    this.setData({
      scaleHeight: imgH,
      scaleWidth: imgW,
      oldx: 0,
      oldy: newy
    });

    ctx.clearActions();

    ctx.clearRect(0, 0, cW, cH);

    var imgUrl = this.data.imgUrl;
    ctx.drawImage(imgUrl, 0, newy, imgW, imgH);
    ctx.draw();

    olddistance = 0;  //这个是上一次两个手指的距离  
    newdistance = 0;      //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）
    oldscale = 1;     //这个是上一次动作留下的比例  
    diffdistance = 1;     //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
  },

  onLoad: function (options) {
    
    //options.imgUrl = 'http://img05.tooopen.com/images/20150531/tooopen_sy_127457023651.jpg';
    var imgUrl = options.imgUrl;
    this.setData({ imgUrl: imgUrl });
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

  },
})


// var olddistance = 0;  //这个是上一次两个手指的距离  
// var newdistance;      //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
// var oldscale = 1;     //这个是上一次动作留下的比例  
// var diffdistance;     //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  

// Page({
//   data: {
//     windowW: '',
//     windowH: '',
//     posterWidth: '',
//     posterHeight: '',
//     imgLeft: 0,
//     imgTop: 0,
//     posterUrl: '',
//     posterId: '',
//     displayName: '',
//     cutWidth: '',
//     cutHeight: '',


//     twoFlag: false,
//     imgUrl: '',

//   },

//   initSystem: function () {
//     var that = this;
//     wx.getSystemInfo({
//       success: function (res) {
//         var width = res.windowWidth;
//         var height = res.windowHeight;
//         console.log(height + "++++++++++" + width);
//         that.setData({ W: width, H: height });
//         var newHeight = height - 65 - 40 - 2;
//         var newWidth = width - 40 - 2;
//         console.log(newHeight + "---" + newWidth);
//         that.setData({ scaleHeight: newHeight, scaleWidth: newWidth });
//         that.setData({ cH: newHeight, cW: newWidth });
//       }
//     })
//   },
//   touchMoveImg: function (e) {

//     // console.log("手移动");
//     // console.log(e);
//     if (e.touches.length == 2) {
//       this.setData({ twoFlag: true });
//       var xMove = e.touches[1].clientX - e.touches[0].clientX;
//       var yMove = e.touches[1].clientY - e.touches[0].clientY;
//       var distance = Math.sqrt(xMove * xMove + yMove * yMove);//两手指之间的距离   
//       if (olddistance == 0) {
//         olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
//         console.log(olddistance);
//       }
//       else {
//         newdistance = distance; //第二次就可以计算它们的差值了  
//         diffdistance = newdistance - olddistance;
//         olddistance = newdistance; //计算之后更新  
//         console.log(diffdistance);
//         var newScale = 1 + 0.002 * diffdistance;  //比例  
//         console.log(newScale);
//         //刷新.wxml  
//         var baseHeight = this.data.scaleHeight;
//         var baseWidth = this.data.scaleWidth;
//         this.setData({
//           scaleHeight: newScale * baseHeight,
//           scaleWidth: newScale * baseWidth
//         })
//         //oldscale = newScale;
//         //更新比例  

//       }
//     }
//   },
//   touchendImg: function (e) {
//     if (this.data.twoFlag) {
//       // console.log("触摸结束");
//       // console.log(e);
//       olddistance = 0;
//       this.setData({ twoFlag: false });
//     }
//   },
//   touchstartImg: function (e) {
//     // console.log("触摸开始");
//     // console.log(e);
//   },
//   openConfirm: function () {
//     var that = this;
//     wx.showModal({
//       title: '重置提示',
//       content: '是否恢复原来设置？',
//       confirmText: "确认",
//       cancelText: "暂不",
//       success: function (res) {
//         console.log(res);
//         if (res.confirm) {
//           that.chongzhi();
//         } else if (res.cancel) {
//           console.log('用户点击取消')
//         }
//       }
//     });
//   },
//   chongzhi: function () {
//     var height = this.data.H;
//     var width = this.data.W;
//     this.setData({ scaleHeight: height - 65 - 40 - 2, scaleWidth: width - 40 - 2 });

//     olddistance = 0;  //这个是上一次两个手指的距离  
//     newdistance = 0;      //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）
//     oldscale = 1;     //这个是上一次动作留下的比例  
//     diffdistance = 1;     //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
//   },
//   finishToDraw: function () {
//     var scaleHeight = this.data.scaleHeight;
//     var scaleWidth = this.data.scaleWidth;
//     var cH = this.data.cH;
//     var cW = this.data.cW;

//     var ctx = wx.createCanvasContext('myCanvas3');
//     var imgUrl = this.data.imgUrl;
//     console.log(scaleWidth + "--" + scaleHeight+"图片" + imgUrl);
//     ctx.drawImage(imgUrl, 0, 0, scaleWidth, scaleHeight);
//     ctx.draw();

//     setTimeout(function () {
//       wx.canvasToTempFilePath({
//         canvasId: 'myCanvas3',
//         // x: 0,
//         // y: 0,
//         // width: 278,
//         // height: 397,
//         // destWidth: 278,
//         // destHeight: 397,
//         success: function (res) {
//           console.log("成功");
//           console.log(res);
//           wx.previewImage({
//             current: res.tempFilePath, // 当前显示图片的http链接
//             urls: [res.tempFilePath] // 需要预览的图片http链接列表
//           })
//         },
//         fail: function (res) {
//           console.log("生成失败");
//           console.log(res);
//         },
//         complete: function (res) {
//           console.log("生成结束");
//           console.log(res);
//         }
//       })
//     }, 10);

//   },
//   onReady: function (e) {

//   },
//   onShow: function () {

//   },
//   onLoad: function (options) {
//     this.initSystem();
//     //options.imgUrl = 'http://img05.tooopen.com/images/20150531/tooopen_sy_127457023651.jpg';
//     var imgUrl = options.imgUrl;
//     this.setData({ imgUrl: imgUrl });
//   },
// })  