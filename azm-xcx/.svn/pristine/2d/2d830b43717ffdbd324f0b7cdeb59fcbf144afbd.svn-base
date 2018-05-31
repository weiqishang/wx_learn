//index.js
/**
 * base64.hot  人气灰色图标
 * base64.hot_th  人气黄色实心图标
 * base64.zan  点赞灰色图标
 * base64.zan_th  点赞黄色实心图标
 * base64.sc  收藏灰色图标
 * base64.sc_th  收藏黄色实心图标
 */
//获取应用实例
var app = getApp()
var base64 = require("../../../image/base64");
var base64_company = require("../base64");

var compare = function (obj1, obj2) {
  var val1 = obj1.orderById;
  var val2 = obj2.orderById;
  if (val1 < val2) {
    return 1;
  } else if (val1 > val2) {
    return -1;
  } else {
    return 0;
  }
}
Page({
  data: {
    bindTapFlag1: 1,//是否点赞过，1代表没有
    bindTapFlag1_2: 1,//是否点赞过，1代表没有
    bindTapFlag2: 1,
    bindTapFlag2_2: 1,
    news_ad: ['images/tp1.jpg', 'images/tp2.jpg', 'images/tp3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    motto: 'Hello World',
    userInfo: {},
    textTest: '',
    personData: undefined,
    havaData: false,

    animationData: {},
    animationData2: {},


    xcxSession: '',//xcxSession这个是保存本用户的id,就是进来应用的用户

    initState: -1,
    ownerId: '',

    picurlXcxQr: '',

    newUser: 1,
  },
  initWH: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ W: res.windowWidth, H: res.windowHeight });
      }
    })
  },
  yulangtouxing: function (e) {
    console.log(e);
    var path = e.target.id;
    wx.previewImage({
      current: path, // 当前显示图片的http链接
      urls: [path] // 需要预览的图片http链接列表
    })
  },
  checkCompanyDetails: function (e) {
    var cid = e.currentTarget.id;
    var that = this;
    wx.navigateTo({
      url: '../../card/contentdetails/contentdetails?cid=' + cid + '&ownerId=' + that.data.ownerId,
    })
  },
  wangshang: function () {
    wx.navigateTo({
      url: '../user/setcard/my-company/my-company',
    })
  },
  checkTeamInfo: function (e) {
    var cid = e.currentTarget.id;
    console.log(e);
    var that = this;
    wx.navigateTo({
      url: '../../card/contentdetails/contentdetails?cid2=' + cid + '&ownerId=' + that.data.ownerId,
    })
  },
  setComListInfo: function (companyinfo) {
    var listInfos = [];
    for (var i = 0; i < companyinfo.length; i++) {
      if (companyinfo[i].pictype) {// 0图标展示   1列表展示
        listInfos.push(companyinfo[i]);
      }
    }
    listInfos.sort(compare);//降序排序
    this.setData({ listInfos: listInfos });
  },
  setComIconInfo: function (companyinfo) {
    var iconInfos = [];
    for (var i = 0; i < companyinfo.length; i++) {
      if (!companyinfo[i].pictype) {// 0图标展示   1列表展示
        iconInfos.push(companyinfo[i]);
      }
    }
    iconInfos.sort(compare);//降序排序
    this.setData({ iconInfos: iconInfos });
  },
  setTeamIconInfo: function (teaminfo) {
    var iconTeamInfos = [];
    for (var i = 0; i < teaminfo.length; i++) {
      if (!teaminfo[i].pictype) {// 0图标展示   1列表展示
        iconTeamInfos.push(teaminfo[i]);
      }
    }

    iconTeamInfos.sort(compare);
    this.setData({ iconTeamInfos: iconTeamInfos });
  },
  setTeamListInfo: function (teaminfo) {
    var listTeamInfos = [];
    for (var i = 0; i < teaminfo.length; i++) {
      if (teaminfo[i].pictype) {// 0图标展示   1列表展示
        listTeamInfos.push(teaminfo[i]);
      }
    }
    listTeamInfos.sort(compare)
    this.setData({ listTeamInfos: listTeamInfos });
  },
  transFormJson: function (res) {
    console.log(res);
    var textTest = res.data.json.user.userInfo;
    var path = res.data.json.user.picurl;
    console.log(path);
    var newPath = "https" + path.substring(4, path.length);

    var newPath = undefined;
    if (path.indexOf('https') > -1) {
      newPath = path;
    } else {
      newPath = "https" + path.substring(4, path.length);
    }

    console.log(newPath);
    var personData = {
      name: res.data.json.user.name,
      teamName: res.data.json.team.smallName + "",
      zhiwei: res.data.json.user.position,
      ishuiyuan: true,
      personImg: newPath,
      phone: res.data.json.user.phone,
      qq: res.data.json.user.qq,
      wechar: res.data.json.user.wechat,
      renqi: res.data.json.user.popularity,
      zan: res.data.json.user.praise,
      fav: res.data.json.user.collection,
      belongCom: res.data.json.company.displayName,
      shareCom: res.data.json.company.smallName,
    };

    this.setData({ company: res.data.json.company, team: res.data.json.team });

    this.setData({ textTest: textTest, personData: personData, picurlXcxQr: res.data.json.user.picurlXcxQr });

    this.setComIconInfo(res.data.json.companyinfo);

    this.setComListInfo(res.data.json.companyinfo);

    this.setTeamIconInfo(res.data.json.teaminfo);

    this.setTeamListInfo(res.data.json.teaminfo);

    wx.setStorageSync('companyinfo', res.data.json.companyinfo);
    wx.setStorageSync('teaminfo', res.data.json.teaminfo);
    wx.setStorageSync('textTest', textTest);
    wx.setStorageSync('personData', personData);
  },
  bindFav: function () {//需要检查是不是游客
    var ownerId = wx.getStorageSync('myId');
    if (ownerId != "" && ownerId != '0') {//是注册过的用户
      this.bindFav2();
    } else {//用户没有注册过
      wx.showToast({
        title: '请先注册',
        icon: 'success',
        duration: 2000
      })
    }
  },
  bindFav2: function () {
    var bindTapFlag2Tmp = this.data.bindTapFlag2;
    this.setData({ bindTapFlag2: !bindTapFlag2Tmp, bindTapFlag2_2: !bindTapFlag2Tmp });

    this.setCollection();//收藏操作

    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: "ease-in-out",
    })
    if (bindTapFlag2Tmp) {
      wx.playBackgroundAudio({
        dataUrl: 'https://media.ccyishe.com/media/wav20170511.wav',
        success: function (res) {
          console.log("播放成功");
          console.log(res);
        },
        fail: function (res) {
          console.log("播放失败");
          console.log(res);
        }
      })
      animation.scale(2, 2).translateY(-20).opacity(1).step();
      animation.translateY(0).scale(1, 1).opacity(0).step();

      var personData = this.data.personData;
      personData.fav = personData.fav + 1;
      this.setData({ personData: personData });
    } else {
      var personData = this.data.personData;
      personData.fav = personData.fav - 1;
      this.setData({ personData: personData });
    }

    this.setData({
      animationData2: animation.export(),
    });
  },
  zixun: function () {
    var that = this;
    wx.switchTab({
      url: '../../home2/home2/tuijianrenId=' + that.data.ownerId,
    });
  },

  checkCollection: function () {//查询是否收藏过
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/mail!selCollection.jsp',
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',//
        userId: that.data.ownerId//userId是被收藏的人
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询收藏返回");
        console.log(res);
        var flag = res.data.isCollection;
        if (flag == '1') {
          that.setData({ bindTapFlag2: 0, bindTapFlag2_2: 1 });
        } else {
          that.setData({ bindTapFlag2: 1, bindTapFlag2_2: 0 });
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  checkIsZan: function () {//查询用户是否点赞过
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/index!selPraiseByUserId.jsp',
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',游客
        userId: that.data.ownerId,//名片拥有者
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询点赞返回");
        console.log(res);
        var flag = res.data.isPraise;
        if (flag == '1') {
          that.setData({ bindTapFlag1: 0, bindTapFlag1_2: 1 });
        } else {
          that.setData({ bindTapFlag1: 1, bindTapFlag1_2: 0 });
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  comfirmZan: function () {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({//发到服务器，进行解密数据
      url: 'https://m.ccyishe.com/page/xcx/index!praiseByUserId.jsp',
      method: "POST",
      data: {
        xcxSession: xcxSession,//praiseSession，这个是访客的session
        userId: that.data.ownerId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("点赞成功");
        console.log(res);
      },
      fail: function (res) {
        console.log("点赞失败");
        console.log(res);
      }
    })
  },
  setCollection: function () {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/mail!addOrDel.jsp',
      method: "POST",
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',//
        userId: that.data.ownerId//userId是被收藏的人
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("收藏成功");
        console.log(res);
      },
      fail: function (res) {
        console.log("收藏失败");
        console.log(res);
      }
    })
  },
  bindZan: function () {
    this.comfirmZan();//点赞操作的时候，先获取点赞者的id


    var bindTapFlag1Tmp = this.data.bindTapFlag1;
    this.setData({ bindTapFlag1: !bindTapFlag1Tmp, bindTapFlag1_2: !bindTapFlag1Tmp });

    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: "ease-in-out",
    })
    if (bindTapFlag1Tmp) {//点赞，否则就是取消赞
      wx.playBackgroundAudio({
        dataUrl: 'https://media.ccyishe.com/media/wav20170511.wav',
        success: function (res) {
          console.log("播放成功");
          console.log(res);
        },
        fail: function (res) {
          console.log("播放失败");
          console.log(res);
        }
      })
      animation.scale(2, 2).translateY(-20).opacity(1).step();
      animation.translateY(0).scale(1, 1).opacity(0).step();
      var personData = this.data.personData;
      personData.zan = personData.zan + 1;
      this.setData({ personData: personData });
    } else {
      var personData = this.data.personData;
      personData.zan = personData.zan - 1;
      this.setData({ personData: personData });
    }

    this.setData({
      animationData: animation.export(),
    });
  },
  contentDetails: function () {
    wx.navigateTo({
      url: '../card/contentdetails/contentdetails',

    })
  },
  drawImg2: function () {//保存图片的
    var canvasH = 1090;
    var canvasW = 720;


    console.log(canvasH + "-TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-" + canvasW);
    var ctx = wx.createCanvasContext('myCanvas2');

    ctx.setFillStyle('#F8F8F8');
    ctx.fillRect(0, 0, canvasW, canvasH);

    console.log(this.data.savePersonImg);

    ctx.drawImage(this.data.savePersonImg, canvasW * (22 / 288), canvasH * (10 / 436), canvasW * (60 / 288), canvasW * (60 / 288));


    ctx.setFontSize(32);
    ctx.setFillStyle('black');
    console.log(this.data.personData.name + "++++++++++++++++++++++++++++++++++++++++++++++姓名");
    ctx.fillText(this.data.personData.name, canvasW * (87 / 288), canvasH * (33 / 436));
    ctx.setFontSize(30);
    ctx.fillText(this.data.personData.zhiwei, canvasW * (87 / 288), canvasH * (62 / 436));

    ctx.setFillStyle('white')
    ctx.fillRect(0, canvasH * (80 / 436), canvasW, canvasH * (33 / 436));
    //------------------------------------------
    ctx.moveTo(canvasW * (22 / 288), canvasH * (110 / 436));
    ctx.setLineWidth(1);
    ctx.setStrokeStyle('#E3E3E3');
    ctx.lineTo(canvasW, canvasH * (110 / 436));
    ctx.stroke();
    ctx.setFillStyle('white')
    //------------------------------------------
    ctx.fillRect(0, canvasH * (113 / 436), canvasW, canvasH * (33 / 436));
    //------------------------------------------
    ctx.moveTo(canvasW * (22 / 288), canvasH * (143 / 436));
    ctx.setLineWidth(1);
    ctx.setStrokeStyle('#E3E3E3');
    ctx.lineTo(canvasW, canvasH * (143 / 436));
    ctx.stroke();
    ctx.setFillStyle('white')
    //------------------------------------------
    ctx.fillRect(0, canvasH * (146 / 436), canvasW, canvasH * (33 / 436));
    //------------------------------------------
    ctx.moveTo(canvasW * (22 / 288), canvasH * (176 / 436));
    ctx.setLineWidth(1);
    ctx.setStrokeStyle('#E3E3E3');
    ctx.lineTo(canvasW, canvasH * (176 / 436));
    ctx.stroke();
    ctx.setFillStyle('white')
    //------------------------------------------
    ctx.fillRect(0, canvasH * (179 / 436), canvasW, canvasH * (33 / 436));
    //------------------------------------------
    ctx.moveTo(canvasW * (22 / 288), canvasH * (209 / 436));
    ctx.setLineWidth(1);
    ctx.setStrokeStyle('#E3E3E3');
    ctx.lineTo(canvasW, canvasH * (209 / 436));
    ctx.stroke();
    ctx.setFillStyle('white')
    //------------------------------------------
    ctx.fillRect(0, canvasH * (212 / 436), canvasW, canvasH * (33 / 436));
    //------------------------------------------
    ctx.moveTo(canvasW * (22 / 288), canvasH * (242 / 436));
    ctx.setLineWidth(1);
    ctx.setStrokeStyle('#E3E3E3');
    ctx.lineTo(canvasW, canvasH * (242 / 436));
    ctx.stroke();
    ctx.setFillStyle('white')
    //------------------------------------------
    ctx.fillRect(0, canvasH * (245 / 436), canvasW, canvasH * (45 / 436));

    ctx.setFillStyle('black');
    ctx.fillText('公司', canvasW * (22 / 288), canvasH * (101 / 436));
    ctx.fillText(this.data.personData.belongCom, canvasW * (70 / 288), canvasH * (101 / 436));
    ctx.fillText('团队', canvasW * (22 / 288), canvasH * (132 / 436));
    var teamNameTmp = "";
    if (this.data.personData.teamName != undefined && this.data.personData.teamName != 'undefined') {
      teamNameTmp = this.data.personData.teamName;
    }
    ctx.fillText(teamNameTmp + "", canvasW * (70 / 288), canvasH * (132 / 436));
    ctx.fillText('电话', canvasW * (22 / 288), canvasH * (166 / 436));
    ctx.setFillStyle('#70a0ff')
    ctx.fillText(this.data.personData.phone, canvasW * (70 / 288), canvasH * (166 / 436));
    ctx.setFillStyle('black')
    ctx.fillText('QQ号', canvasW * (22 / 288), canvasH * (199 / 436));
    ctx.fillText(this.data.personData.qq, canvasW * (70 / 288), canvasH * (199 / 436));
    ctx.fillText('微信', canvasW * (22 / 288), canvasH * (232 / 436));
    ctx.fillText(this.data.personData.wechar, canvasW * (70 / 288), canvasH * (232 / 436));

    ctx.drawImage(this.data.img3,
      canvasW * (30 / 288), canvasH * (245 / 436), canvasW * (24 / 288), canvasW * (24 / 288));
    ctx.drawImage(this.data.img4,
      canvasW * (125 / 288), canvasH * (245 / 436), canvasW * (24 / 288), canvasW * (24 / 288));
    ctx.drawImage(this.data.img5,
      canvasW * (215 / 288), canvasH * (245 / 436), canvasW * (24 / 288), canvasW * (24 / 288));
    ctx.fillText('人气：' + this.data.personData.renqi, canvasW * (25 / 288), canvasH * (285 / 436));
    ctx.fillText('赞：' + this.data.personData.zan, canvasW * (124 / 288), canvasH * (285 / 436));
    ctx.fillText('收藏：' + this.data.personData.fav, canvasW * (210 / 288), canvasH * (285 / 436));

    ctx.drawImage(this.data.img2, canvasW * (22 / 288), canvasH * (310 / 436), canvasW * (110 / 288), canvasW * (110 / 288));
    ctx.setFillStyle('black');
    ctx.fillText('长按与扫一扫识别', canvasW * (140 / 288), canvasH * (355 / 436));
    ctx.fillText('查看我的名片', canvasW * (152 / 288), canvasH * (385 / 436));

    ctx.draw();
    // wx.drawCanvas({
    //   canvasId: 'myCanvas2',
    //   actions: ctx.getActions(), // 获取绘图动作数组
    //   //reverse:true
    // });
  },
  downLoadImg: function (url) {
    var that = this;
    var personImg = that.data.personData.personImg;
    wx.downloadFile({
      url: personImg,//"https://media.ccyishe.com/xcx/image/tx1.png", //仅为示例，并非真实的资源
      success: function (res) {
        var savedFilePath = res.tempFilePath;
        that.setData({ savePersonImg: savedFilePath });

        wx.downloadFile({
          url: url, //仅为示例，并非真实的资源
          success: function (res) {
            var savedFilePath = res.tempFilePath;
            that.setData({ img2: savedFilePath });

            wx.downloadFile({
              url: "https://media.ccyishe.com/xcx/image/review.png", //仅为示例，并非真实的资源
              success: function (res) {
                var savedFilePath = res.tempFilePath;
                that.setData({ img3: savedFilePath });

                wx.downloadFile({
                  url: "https://media.ccyishe.com/xcx/image/zan.png", //仅为示例，并非真实的资源
                  success: function (res) {
                    var savedFilePath = res.tempFilePath;
                    that.setData({ img4: savedFilePath });

                    wx.downloadFile({
                      url: "https://media.ccyishe.com/xcx/image/fav.png", //仅为示例，并非真实的资源
                      success: function (res) {
                        wx.hideLoading();
                        var savedFilePath = res.tempFilePath;
                        that.setData({ img5: savedFilePath });

                        that.drawImg2();
                      }
                    })
                  }
                })
              }
            })

          }
        })
      },
      fail: function (res) {
        console.log("图片失败返回");
        console.log(res);
      }
    })
  },
  saveImgPath: function (url) {//保存小程序码
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    wx.request({
      url: "https://m.ccyishe.com/page/xcx/user!upPicurlXcxQr.jsp",
      data: {
        xcxSession: xcxSession,
        picurlXcxQr: url,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("保存图片地址返回");
        console.log(res);
      },
      fail: function (res) {
        // fail
        console.log("保存图片地址失败返回");
        console.log(res);
      },
      complete: function (res) {
        // complete
      }
    })
  },
  drawCardImg: function () {
    var that = this;
    // wx.showLoading({
    //   title: '加载中',
    // })
    if (this.data.picurlXcxQr == '' || this.data.picurlXcxQr == null) {
      var name = this.data.personData.name;
      if (name.indexOf("测试") > 0) {
        wx.request({
          url: "https://m.ccyishe.com/page/secure!xcxQrcodeTest.jsp",
          data: {
            bf: that.data.ownerId
            // bf: '/pages/card/share/share?ownerId=' + that.data.ownerId
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log("返回图片地址");
            var url = res.data.json.url;
            that.saveImgPath(url);//保存小程序码
            that.downLoadImg(url);
          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })
      } else {
        wx.request({
          url: "https://m.ccyishe.com/page/secure!xcxQrcode.jsp",
          data: {
            //bf: that.data.ownerId
            size: 600,
            bf: '/pages/card/share/share?ownerId=' + that.data.ownerId
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log("返回图片地址");
            var url = res.data.json.url;
            that.saveImgPath(url);//保存小程序码
            that.downLoadImg(url);
          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })
      }
    } else {
      var url = this.data.picurlXcxQr;
      //that.saveImgPath(url);//保存小程序码
      //that.downLoadImg(url);
    }



  },
  saveAsImg: function () {
    this.drawCardImg();
  },

  shareCard: function () {
    wx.showLoading({
      title: '图片生成中',
    });
    var that = this;
    var systemInfo = wx.getSystemInfoSync()

    console.log();
    if (systemInfo.system.indexOf('iOS') != -1) {
      var xcxSession = wx.getStorageSync('xcxSession');
      if (xcxSession == "") {
        app.getXcxSession();
        xcxSession = wx.getStorageSync('xcxSession');
      }
      wx.request({
        url: 'https://m.ccyishe.com/page/xcx/develop!gotoPic.jsp',
        data: {
          xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("返回图片路径" + xcxSession);
          wx.hideLoading();
          console.log(res);
          wx.previewImage({
            current: res.data.json.picurl, // 当前显示图片的http链接
            urls: [res.data.json.picurl] // 需要预览的图片http链接列表
          })
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    } else {
      var xcxSession = wx.getStorageSync('xcxSession');
      if (xcxSession == "") {
        app.getXcxSession();
        xcxSession = wx.getStorageSync('xcxSession');
      }
      wx.request({
        url: 'https://m.ccyishe.com/page/xcx/develop!gotoPic.jsp',
        data: {
          xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("返回图片路径" + xcxSession);
          wx.hideLoading();
          console.log(res);
          wx.previewImage({
            current: res.data.json.picurl, // 当前显示图片的http链接
            urls: [res.data.json.picurl] // 需要预览的图片http链接列表
          })
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
      // wx.canvasToTempFilePath({
      //   canvasId: 'myCanvas2',
      //   success: function (res) {
      //     wx.hideLoading();
      //     //  wx.showToast({
      //     //   title: '成功'+res.tempFilePath,
      //     //   icon:  'loading',
      //     //   duration: 20000
      //     // })
      //     wx.previewImage({
      //       current: res.tempFilePath, // 当前显示图片的http链接
      //       urls: [res.tempFilePath] // 需要预览的图片http链接列表
      //     })
      //   },
      //   fail: function (res) {
      //     wx.hideLoading();
      //     console.log("生成失败");
      //     // wx.showToast({
      //     //   title: '失败'+res.data,
      //     //   icon:  'loading',
      //     //   duration: 20000
      //     // })
      //   },
      //   complete: function (res) {
      //     wx.hideLoading();
      //     console.log("生成结束");
      //     // wx.showToast({
      //     //   title: '结束'+res.data,
      //     //   icon: 'loading',
      //     //   duration: 20000
      //     // })
      //   }
      // })
    }


  },
  checkIsLogin: function () {//判断是否登录
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/user!isLogin.jsp',
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询注册登录返回");
        var userId = res.data.json.userId;
        if (userId != '0') {
          wx.navigateTo({
            url: '../user/setcard/setcard?xcxSession=' + that.data.xcxSession,
          })
        } else {
          wx.showToast({
            title: '请先注册登录',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  editCard: function () {
    this.checkIsLogin();
  },
  focusZhiMai: function () {
    wx.navigateTo({
      url: "../card/follow-us/follow-us",

    })
  },

  //事件处理函数
  onShow: function () {

    var ownerId = wx.getStorageSync('ownerId');
    console.log("+++++++++++++++++" + ownerId + "----------------------------22222");
    console.log(this.data.haveData);
    if (ownerId != "" && ownerId != 0 && this.data.haveData == false) {
      console.log("这里执行15");
      this.setData({ ownerId: ownerId });
      this.getUserInfoFromServer(ownerId, 1);//从服务器拿到名片所有者的信息
      this.setData({ initState: 1 });
    }
    this.initWH();
  },
  onReady: function () {

  },
  getXcxSession: function () {//点赞操作的时候，先获取点赞者的id
    var that = this;
    console.log("执行登录操作了");
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        wx.login({
          success: function (res) {//用户登录成功

            //wx.hideLoading();
            if (res.code) {
              var code = res.code;
              wx.getUserInfo({//获取用户信息

                success: function (res) {
                  console.log("用户登录成功");
                  var encryptedData = res.encryptedData;
                  var iv = res.iv;
                  console.log(code);

                  console.log(encryptedData);
                  console.log(iv);
                  console.log("code:" + code);
                  console.log("iv:" + iv);
                  console.log("encryptedData:" + encryptedData);
                  wx.request({//发到服务器，进行解密数据
                    url: 'https://m.ccyishe.com/page/xcx/user!xcxSession.jsp',
                    method: "POST",
                    data: {
                      code: code,
                      encryptedData: encryptedData,
                      iv: iv
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      console.log("app.js成功返回");
                      console.log(res);
                      var xcxSession = res.data.json.xcxSession;//当前使用小程序的用户令牌
                      var userId = res.data.json.userId;//当前使用小程序的注册用户id
                      wx.setStorageSync('xcxSession', xcxSession);
                      wx.setStorageSync('myId', userId);
                      that.checkIsNewUser();
                      wx.request({
                        url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
                        data: {
                          ownerId: that.data.ownerId,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
                          praiseSession: xcxSession
                        },
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                          console.log("传ownerId返回");
                          console.log(res);
                          wx.setStorageSync('indexData', res);
                          that.transFormJson(res);

                          that.setData({ userId: res.data.json.user.cid });      //不知
                          wx.setStorageSync('userId', res.data.json.user.cid);   //不知


                          //在初始化拿到用户数据后，进行预先画板画图和判断是否点赞，收藏等操作

                          //that.saveAsImg();//先画图,分享页面没有生成图片分享朋友圈的功能，这里要去掉

                          that.checkIsZan();//查询用户是否点赞过
                          that.checkCollection();//查询是否收藏过
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
                    fail: function (res) {
                      wx.showToast({
                        title: '授权失败,请下拉刷新',
                        icon: 'loading',
                        duration: 2000
                      })
                    }
                  })
                },
                fail: function (res) {
                  wx.openSetting({
                    success: function (res) {

                    }
                  })
                }
              })
            } else {
              wx.showToast({
                title: '授权失败,请下拉刷新',
                icon: 'loading',
                duration: 2000
              })
            }
          },
          fail: function (res) {
            console.log("登录失败");
            console.log(res);
            wx.showToast({
              title: '授权失败,请下拉刷新',
              icon: 'loading',
              duration: 2000
            })
          },
          complete: function (res) {
            console.log("最后执行了");
          }
        });
      },
      fail: function () {
        //登录态过期
        wx.login({
          success: function (res) {//用户登录成功

            //wx.hideLoading();
            if (res.code) {
              var code = res.code;
              wx.getUserInfo({//获取用户信息

                success: function (res) {
                  console.log("用户登录成功");
                  var encryptedData = res.encryptedData;
                  var iv = res.iv;
                  console.log(code);

                  console.log(encryptedData);
                  console.log(iv);
                  wx.request({//发到服务器，进行解密数据
                    url: 'https://m.ccyishe.com/page/xcx/user!xcxSession.jsp',
                    method: "POST",
                    data: {
                      code: code,
                      encryptedData: encryptedData,
                      iv: iv
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      console.log("app.js成功返回");
                      console.log(res);
                      var xcxSession = res.data.json.xcxSession;//当前使用小程序的用户令牌
                      var userId = res.data.json.userId;//当前使用小程序的注册用户id
                      wx.setStorageSync('xcxSession', xcxSession);
                      wx.setStorageSync('myId', userId);
                      that.checkIsNewUser();
                      wx.request({
                        url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
                        data: {
                          ownerId: that.data.ownerId,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
                          praiseSession: xcxSession
                        },
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                          console.log("传ownerId返回");
                          console.log(res);
                          wx.setStorageSync('indexData', res);
                          that.transFormJson(res);

                          that.setData({ userId: res.data.json.user.cid });      //不知
                          wx.setStorageSync('userId', res.data.json.user.cid);   //不知


                          //在初始化拿到用户数据后，进行预先画板画图和判断是否点赞，收藏等操作

                          //that.saveAsImg();//先画图,分享页面没有生成图片分享朋友圈的功能，这里要去掉

                          that.checkIsZan();//查询用户是否点赞过
                          that.checkCollection();//查询是否收藏过
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
                    fail: function (res) {
                      wx.showToast({
                        title: '授权失败,请下拉刷新',
                        icon: 'loading',
                        duration: 2000
                      })
                    }
                  })
                },
                fail: function (res) {
                  wx.openSetting({
                    success: function (res) {

                    }
                  })
                }
              })
            } else {
              wx.showToast({
                title: '授权失败,请下拉刷新',
                icon: 'loading',
                duration: 2000
              })
            }
          },
          fail: function (res) {
            console.log("登录失败");
            console.log(res);
            wx.showToast({
              title: '授权失败,请下拉刷新',
              icon: 'loading',
              duration: 2000
            })
          },
          complete: function (res) {
            console.log("最后执行了");
          }
        });
      }
    })

  },
  getUserInfoFromServer: function (ownerId, flag) {
    wx.setStorageSync("ownerId", ownerId);
    var that = this;
    var praiseSession = wx.getStorageSync('xcxSession');
    if (praiseSession == "") {
      this.getXcxSession();
      return;
    }
    this.checkIsNewUser();
    if (ownerId) {
      wx.request({
        url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
        data: {
          ownerId: ownerId,//名片拥有者
          praiseSession: praiseSession//该微信用户
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("传ownerId返回");
          console.log(res);
          wx.setStorageSync('indexData', res);
          that.transFormJson(res);

          that.setData({ userId: res.data.json.user.cid });      //不知
          wx.setStorageSync('userId', res.data.json.user.cid);   //不知


          //在初始化拿到用户数据后，进行预先画板画图和判断是否点赞，收藏等操作

          //that.saveAsImg();//先画图,分享页面没有生成图片分享朋友圈的功能，这里要去掉

          that.checkIsZan();//查询用户是否点赞过
          that.checkCollection();//查询是否收藏过
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
    }
  },
  getXcxSessionPage: function () {//点赞操作的时候，先获取点赞者的id
    var that = this;
    wx.login({
      success: function (res) {//用户登录成功

        wx.hideLoading();
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({//获取用户信息

            success: function (res) {
              console.log("用户登录成功");
              var encryptedData = res.encryptedData;
              var iv = res.iv;
              console.log(code);

              console.log(encryptedData);
              console.log(iv);
              wx.request({//发到服务器，进行解密数据
                url: 'https://m.ccyishe.com/page/xcx/user!xcxSession.jsp',
                method: "POST",
                data: {
                  code: code,
                  encryptedData: encryptedData,
                  iv: iv
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log("app.js成功返回");
                  console.log(res);
                  var xcxSession = res.data.json.xcxSession;//当前使用小程序的用户令牌
                  var userId = res.data.json.userId;//当前使用小程序的注册用户id

                  var ownerId = userId;//因为此函数在自己打开自己才调用，所以这里的首页的名片拥有这为当前使用小程序的注册用户

                  wx.setStorageSync('xcxSession', xcxSession);
                  wx.setStorageSync('myId', userId);

                  if (ownerId != "" && ownerId != '0') {//是注册过的用户
                    console.log("这里执行15");
                    that.setData({ ownerId: ownerId });
                    that.getUserInfoFromServer(ownerId, 1);//从服务器拿到名片所有者的信息
                    that.setData({ initState: 1 });
                  } else {//用户没有注册过
                    that.setData({ initState: 0 });
                  }
                },
                fail: function (res) {
                  console.log("app.js失败返回");
                  console.log(res);
                }
              })
            }
          })
        } else {
          console.log('用户登陆状失败' + res.errMsg);
        }
      }
    });
  },
  IWantToKaiTong: function () {
    // wx.navigateTo({
    //   url: '../../user/setcard/my-company/my-company',
    // })
    var ownerId = this.data.ownerId;
    wx.navigateTo({
      url: '../../register/register?tuijianrenId=' + ownerId,
    })
  },

  IWantToKaiTong2: function () {
    wx.reLaunch({
      url: '../../card/index',
    })
  },
  getXcxSessionCheckIsNewUser:function(){
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      //app.getXcxSession();
      
    }
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/user!isLogin.jsp',
      data: {
        xcxSession: xcxSession,//'f1a0695d-5340-4e18-9b7d-b17212f5e921',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询注册登录返回");
        var userId = res.data.json.userId;
        if (userId != '0') {
          this.setData({ newUser: 0 });
        } else {
          
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
   
  },
  checkIsNewUser:function(){
    var ownerId = wx.getStorageSync('myId');
    var xcxSession = wx.getStorageSync('xcxSession');
    if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
      this.getXcxSessionCheckIsNewUser();
    } else {//
      if (ownerId != "" && ownerId != '0') {//是注册过的用户
        this.setData({ newUser:0});
      } else {//用户没有注册过
        
      }
    }
  },
  onLoad: function (options) {
    
    var ownerId = options.ownerId;

    if (ownerId != undefined) {//带参进来的
      this.setData({ ownerId: ownerId });
      wx.setStorageSync('ownerId', ownerId);
      wx.setStorageSync('parentOne', ownerId);
      this.getUserInfoFromServer(ownerId, 1);//从服务器拿到名片所有者的信息
      this.setData({ initState: 1 });
    } else {//自己打开自己
      var ownerId = wx.getStorageSync('myId');
      var xcxSession = wx.getStorageSync('xcxSession');
      if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
        this.getXcxSessionPage();
      } else {//
        if (ownerId != "" && ownerId != '0') {//是注册过的用户
          console.log("这里执行15");
          this.setData({ ownerId: ownerId });
          this.getUserInfoFromServer(ownerId, 1);//从服务器拿到名片所有者的信息
          this.setData({ initState: 1 });
        } else {//用户没有注册过
          this.setData({ initState: 0 });
          
        }
      }


    }


    this.setData({
      icon1: base64.hot_th,//人气图标
      icon1_th: base64.hot_th,//人气图标
      icon2: base64.zan,//点赞图标
      icon2_th: base64.zan_th,//点赞图标
      icon3: base64.sc,//收藏图标
      icon3_th: base64.sc_th,//收藏图标
      //comImg: base64.jiuji,
      y20: base64_company.y20,
      shi: base64_company.shi,
      pai: base64_company.pai,
      chi: base64_company.chi,
      pyq: base64_company.pyq,
      shili: base64_company.shili
    });
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '您好，我是' + that.data.personData.shareCom + '的' + that.data.personData.name + that.data.personData.zhiwei + '，这是我的事业名片',
      path: "/pages/card/share/share?ownerId=" + that.data.ownerId,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }
})