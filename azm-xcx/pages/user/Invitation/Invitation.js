// Invitation.js
Page({
  data: {
    savePersonImg: '',
    img2: '',
    name: ''
  },
  draw: function (img1, img2, i) {
    console.log("图1：" + img1);
    console.log("图2：" + img2);
    if (i == 1) {
      var ctx = wx.createCanvasContext("canvas1");
      ctx.drawImage(img1, 0, 0, 1080, 1920);
      ctx.drawImage(img2, 250, 1071, 580, 580);
/**
 * ctx.setFillStyle('#999999');
      ctx.setFontSize(25);
      var name = this.data.name;
      ctx.fillText(name, 507, 517);
      ctx.draw();
 */
      
      ctx.draw();
      console.log("执行：" + i);
      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 1080,
          height: 1920,
          canvasId: 'canvas1',
          success: function (res) {
            wx.hideLoading();
            console.log(res.tempFilePath);
            wx.previewImage({
              urls: [res.tempFilePath],
            })

          },
          fail: function (res) {
            console.log("生成失败");
            console.log(res);
          }
        })

      }, 2000);
    }
    else if (i == 2) {
      var ctx = wx.createCanvasContext("canvas2");
      ctx.drawImage(img1, 0, 0, 792, 366);
      ctx.drawImage(img2, 503, 47, 250, 250);
      ctx.draw();

      console.log("执行区：" + i);
      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 792,
          height: 366,
          canvasId: 'canvas2',
          success: function (res) {
            wx.hideLoading();
            console.log(res.tempFilePath);
            wx.previewImage({
              urls: [res.tempFilePath],
            })

            console.log("执行区：" + i);
          },
          fail: function (res) {
            console.log("生成失败");
            console.log(res);
          }
        })

      }, 2000);
    }
    else if (i == 3) {
      var ctx = wx.createCanvasContext("canvas3");
      ctx.drawImage(img1, 0, 0, 900, 500);
      ctx.drawImage(img2, 146, 158, 190, 190);
      ctx.draw();

      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 900,
          height: 500,
          canvasId: 'canvas3',
          success: function (res) {
            wx.hideLoading();
            console.log(res.tempFilePath);
            wx.previewImage({
              urls: [res.tempFilePath],
            })
          },
          fail: function (res) {
            console.log("生成失败");
            console.log(res);
          }
        })

      }, 2000);
    } else if (i == 4) {
      var ctx = wx.createCanvasContext("canvas4");
      ctx.drawImage(img1, 0, 0, 860, 980);
      ctx.drawImage(img2, 30, 30, 800, 800);
      ctx.draw();

      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 860,
          height: 980,
          canvasId: 'canvas4',
          success: function (res) {
            wx.hideLoading();
            console.log(res.tempFilePath);
            wx.previewImage({
              urls: [res.tempFilePath],
            })
          },
          fail: function (res) {
            console.log("生成失败");
            console.log(res);
          }
        })

      }, 2000);
    } else if (i == 5) {
      var ctx = wx.createCanvasContext("canvas5");
      ctx.drawImage(img1, 0, 0, 860, 980);
      ctx.drawImage(img2, 30, 30, 800, 800);
      ctx.draw();

      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 860,
          height: 980,
          canvasId: 'canvas5',
          success: function (res) {
            wx.hideLoading();
            console.log(res.tempFilePath);
            wx.previewImage({
              urls: [res.tempFilePath],
            })
          },
          fail: function (res) {
            console.log("生成失败");
            console.log(res);
          }
        })

      }, 2000);
    }
    else if (i == 8) {
      var ctx = wx.createCanvasContext("canvas8");
      ctx.drawImage(img1, 0, 0, 750, 750);
      ctx.drawImage(img2, 474, 390, 190, 190);
      ctx.draw();

      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 750,
          height: 750,
          canvasId: 'canvas8',
          success: function (res) {
            wx.hideLoading();
            console.log(res.tempFilePath);
            wx.previewImage({
              urls: [res.tempFilePath],
            })
          },
          fail: function (res) {
            console.log("生成失败");
            console.log(res);
          }
        })

      }, 2000);
    }
    else if (i == 9) {
      var ctx = wx.createCanvasContext("canvas9");
      ctx.drawImage(img1, 0, 0, 900, 1600);
      ctx.drawImage(img2, 293, 764, 315, 315);
      ctx.draw();
      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 900,
          height: 1600,
          canvasId: 'canvas9',
          success: function (res) {
            wx.hideLoading();
            console.log(res.tempFilePath);
            wx.previewImage({
              urls: [res.tempFilePath],
            })
          },
          fail: function (res) {
            console.log("生成失败");
            console.log(res);
          }
        })

      }, 2000);
    }
  },
  downLoadImg: function (url, data_id) {
    console.log("下载图片" + url + "---" + data_id);

    var bg_url = "";
    if (data_id == 1) {
      bg_url = "https://media.ccyishe.com/images/20171023/1508754012924.png";
    }
    else if (data_id == 2) {
      bg_url = "https://media.ccyishe.com/xcx/images/kfmssc.png";
    } else if (data_id == 3) {
      bg_url = "https://media.ccyishe.com/xcx/images/zx2sd.png";
    } else if (data_id == 4) {
      bg_url = "https://m.ccyishe.com/web/img/gh860.png";
    } else if (data_id == 5) {
      bg_url = "https://m.ccyishe.com/web/img/gh860.png";
    } else if (data_id == 8) {
      bg_url = "https://media.ccyishe.com/xcx/images/xhr-55.png";
    } else if (data_id == 9) {
      bg_url = "https://media.ccyishe.com/xcx/images/freeremai-55.png";
    }
    var that = this;
    wx.downloadFile({
      url: bg_url,
      success: function (res) {
        var img1 = res.tempFilePath;
        that.setData({ img1: img1 });

        wx.downloadFile({
          url: url, //仅为示例，并非真实的资源
          success: function (res) {
            console.log("下载成功");
            var img2 = res.tempFilePath;
            that.setData({ img2: img2 });
            that.draw(img1, img2, data_id);

          },
          fail: function (res) {
            console.log("下载图片2失败返回");
            console.log(res);
            wx.hideLoading(savedFilePath, );
          }

        })
      },
      fail: function (res) {
        console.log("下载图片1失败返回");
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  saveImgPath: function (url) {//保存小程序码
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: "https://m.ccyishe.com/page/xcx/user!saveRegisterPic.jsp",
      data: {
        xcxSession: xcxSession,
        picurl: url,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("保存注册图片地址返回");
        console.log(res);
      },
      fail: function (res) {
        // fail
        console.log("保存注册图片地址失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete
      }
    })
  },
  makeRigisterCodeWhenNotPicurl: function (data_id) {
    var that = this;
    var ownerId = wx.getStorageSync("myId");
    console.log("生" + ownerId);
    //https://m.ccyishe.com/page/secure!xcxQrcodeTest.jsp
    // bf: ownerId + "_zhuce"
    var qr_url = 'https://m.ccyishe.com/page/xcx/user!twocode.jsp';
    if (data_id == 5 || data_id == 3) {
      qr_url = 'https://m.ccyishe.com/page/secure!xcxQrcodeTest.jsp';
    }
    wx.request({
      url: qr_url,
      data: {
        cid: ownerId,
        bf: ownerId + "_zhuce"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("生成注册二维码返回图片地址");
        console.log(res);
          var url = "";
        if (data_id == 5 || data_id == 3) {
         url = res.data.json.url;
        } else {
         url = res.data.twocode;
        }
        that.saveImgPath(url);
        //下载二维码进行画图
        that.downLoadImg(url, data_id);
      },
      fail: function (res) {
        // fail
        wx.hideLoading();
      },
      complete: function (res) {
        // complete
      }
    })
  },
  checkIsHaveRigisterCode: function (data_id) {

    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    var ownerId = wx.getStorageSync("myId");
    //https://m.ccyishe.com/page/xcx/user!saveRegisterPic.jsp
    //xcxSession: xcxSession,
    var qr_url = 'https://m.ccyishe.com/page/xcx/user!twocode.jsp';
    if (data_id == 5 || data_id == 3) {
      qr_url = 'https://m.ccyishe.com/page/xcx/user!saveRegisterPic.jsp';
    }
    wx.request({
      url: qr_url,
      data: {
        cid: ownerId,
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("查询注册小程序码返回" + res.data.picurl);
        console.log(res);

        if (data_id == 5 || data_id == 3) {
          if (res.data.picurl == "" || res.data.picurl == "undefined") {//如果为空就调用函数生成
            that.makeRigisterCodeWhenNotPicurl(data_id);
          } else {//否则下载二维码进行画图
            that.downLoadImg(res.data.picurl, data_id);
          }
        } else {
          if (res.data.twocode == "" || res.data.picurl == "undefined") {//如果为空就调用函数生成
            that.makeRigisterCodeWhenNotPicurl(data_id);
          } else {//否则下载二维码进行画图
            that.downLoadImg(res.data.twocode, data_id);
          }
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
  makeRigisterCode: function (e) {
    wx.showLoading({
      title: '生成中...',
    })
    var data_id = e.currentTarget.dataset.id;
    var ownerId = wx.getStorageSync("myId");
    var xcxSession = wx.getStorageSync("xcxSession");
    var that = this;
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
      data: {
        ownerId: ownerId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("传ownerId返回7-11");
        console.log(res);
        that.setData({ name: res.data.json.user.name });
        that.checkIsHaveRigisterCode(data_id);
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

  getMyXiaoChengXuCard: function () {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/develop!gotoPicByCard.jsp',
      data: {
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("得到小程序码图");
        console.log(res);
        wx.hideLoading();
        wx.previewImage({
          urls: [res.data.json.picurl],
        })
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
  shareMyXiaoChengXuMa: function () {
    wx.showLoading({
      title: '图片生成中',
    });
    var ownerId = wx.getStorageSync("myId");
    var xcxSession = wx.getStorageSync("xcxSession");
    var that = this;
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
        console.log("传ownerId返回7-11");
        console.log(res);
        var userws = res.data.json.user.userws;
        if (userws != 1) {

          wx.showModal({
            title: '温馨提示',
            content: '您还需要完善个人信息才能使用！',
            showCancel: false,
            confirmText: '立即完善',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../setcard/setcard',
                })

              } else if (res.cancel) {

              }
            }
          })
        } else {
          that.getMyXiaoChengXuCard();
        }
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
  getRecommendName: function (picurl) {
    var parentOne = 535; wx.getStorageSync("parentOne");
    if (parentOne == "") {
      wx.navigateTo({
        url: 'get2/get2?url=' + picurl + "&recommendName=" + '',
      })
    } else {
      var that = this;
      var praiseSession = wx.getStorageSync('xcxSession');
      if (praiseSession == "") {
        console.log("praiseSession:" + praiseSession);

        app.getXcxSession();
        return;
      }
      if (parentOne) {
        wx.request({
          url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
          data: {
            ownerId: parentOne,
            praiseSession: praiseSession
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log("传ownerId返回");
            console.log(res);
            var recommendName = res.data.json.user.name
            wx.navigateTo({
              url: 'get2/get2?url=' + picurl + "&recommendName=" + recommendName,
            })
          },
          fail: function (res) {
            // fail
            console.log("传xcxSession失败返回");
            console.log(res);
            wx.navigateTo({
              url: 'get2/get2?url=' + picurl + "&recommendName=" + '',
            })
          },
          complete: function (res) {
            // complete

          }
        })
      }
    }
  },
  jietuToShareCard: function () {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      return;
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/develop!gotoPicByCard.jsp',
      data: {
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("得到小程序码图");
        console.log(res);
        wx.hideLoading();

        that.getRecommendName(res.data.json.picurl);
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
  free: function () {
    var myId = wx.getStorageSync("myId");
    wx.navigateTo({
      url: '../../register/register?tuijianrenId=' + myId,
    })
  },
  onLoad: function (options) {


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