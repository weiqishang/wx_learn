var base64 = require("../../../../../image/base64");
var util = require("../../../../../utils/util");
Page({
  data: {
    picfiles: [],
    fengmian: '',
    title: '',
    dis: '',

    choosePicFlag: false,
    postType: 0,

    displaceholder: '',
    titleplaceholder: '',
    byNone:0,
    areaHidden: true
  },
  setNotHidden:function(){
    this.setData({ areaHidden: false});
  },
  setHidden:function(){
    this.setData({areaHidden:true});
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
  imgLoadFunction: function (e) {
    console.log("图片加载");
    console.log(e);
    var w = e.detail.width;
    var h = e.detail.height;

    var width = this.data.width;

    var imgHeight = (2 / 4) * width;//只显示出来的图片部分
    var oldImgHeight = (h / w) * width;
    var top = (oldImgHeight - imgHeight) / 2;
    this.setData({ imgHeight: imgHeight, oldImgHeight: oldImgHeight, top: top });
  }
  ,
  setTitle: function (e) {
    var value = e.detail.value;
    console.log(value);
    this.setData({ title: value.replace(/(^\s*)|(\s*$)/g, "") });
  },

  setDis: function (e) {
    var value = e.detail.value;
    console.log(value);
    this.setData({ dis: value.replace(/(^\s*)|(\s*$)/g, "") });
  },
  tipMessage: function (res) {
    var that = this;
    wx.hideLoading();
    if (res.data.result == "success") {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000
      })
      var fengmian = that.data.fengmian;
      var title = that.data.title;
      var dis =that.data.dis;
      var cid = that.data.cid;
      var ownerId = that.data.ownerId;
      setTimeout(function () {
        console.log("跳转了");
        wx.redirectTo({
          url: '../articledetailsmag/articledetailsmag?aid=' + cid + "&ownerId=" + ownerId,
          success: function (res) {
            console.log("跳转成功");
            console.log(res);
          },
          fail: function (res) {
            console.log("跳转失败");
            console.log(res);
          }
        })
      }, 1000);
    } else if (res.data.result == "notProNumber") {
      wx.navigateTo({
        url: '../../message/message',
      })
    } else {
      wx.showToast({
        title: '保存失败',
        icon: 'loading',
        duration: 1000
      })
    }
  },
 
  savaAsDraftsHavaChangeFengMian: function (flag) {
    var that = this;

    wx.uploadFile({
      url: 'https://m.ccyishe.com/page/upload!pic.jsp',
      filePath: that.data.fengmian,
      name: 'file',
      formData: {
        fileFileName: 'file.png',
      },
      success: function (res) {
        console.log("上传图片成功返回");
        console.log(res);

        that.savaAsDrafts2(res.data);
      },
      fail: function (res) {
        var data = res.data
        console.log("上传失败");
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: '保存失败',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },
  savaAsDrafts: function () {//如果参数为0就是保存为个人，否则就是团队文章
    var that = this;
    wx.showLoading({
      title: '保存中',
    })
    var xcxSession = wx.getStorageSync("xcxSession");
    if (this.data.choosePicFlag) {//有重新选择了封面
      this.savaAsDraftsHavaChangeFengMian();
    } else {
      wx.request({
        url: 'https://m.ccyishe.com/page/xcx/article!modify.jsp',
        data: {
          xcxSession: xcxSession,
          cid: that.data.cid,
          articleDesc: '',
          displayName: util.strDiscode(that.data.title),
          smallDesc:  util.strDiscode(that.data.dis),
          picurl: '',
          artType: 0,
          postType: 0,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // success
          console.log("草稿没有修改封面保存文章返回");
          console.log(res);
          that.tipMessage(res);
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }
  },
  savaArticle2: function (url, flag) {//如果参数为0就是保存为个人，否则就是团队文章
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!modify.jsp',
      data: {
        xcxSession: xcxSession,
        cid: that.data.cid,
        articleDesc: '',
        displayName: util.strDiscode(that.data.title),
        smallDesc: util.strDiscode(that.data.dis),
        picurl: url,
        artType: flag,
        postType: 1,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("修改了封面返回");
        console.log(res);
        that.tipMessage(res);//返回提示
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

  },
  savaArticleHavaChangeFengMian: function (flag) {
    var that = this;

    wx.uploadFile({
      url: 'https://m.ccyishe.com/page/upload!pic.jsp',
      filePath: that.data.fengmian,
      name: 'file',
      formData: {
        fileFileName: 'file.png',
      },
      success: function (res) {
        console.log("上传图片成功返回");
        console.log(res);
        that.savaArticle2(res.data, flag);
      },
      fail: function (res) {
        var data = res.data
        console.log("上传失败");
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: '保存失败',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },
  savaAsPersoOrTeam: function (flag) {//如果参数为0就是保存为个人，否则就是团队文章
    var that = this;
    wx.showLoading({
      title: '保存中',
    })
    var xcxSession = wx.getStorageSync("xcxSession");
    if (this.data.choosePicFlag) {//有重新选择了封面
      this.savaArticleHavaChangeFengMian(flag);
    } else {
      wx.request({
        url: 'https://m.ccyishe.com/page/xcx/article!modify.jsp',
        data: {
          xcxSession: xcxSession,
          cid: that.data.cid,
          articleDesc: '',
          displayName: util.strDiscode(that.data.title.replace(/(^\s*)|(\s*$)/g, "")),
          smallDesc: util.strDiscode(that.data.dis.replace(/(^\s*)|(\s*$)/g, "")),
          picurl: '',
          artType: flag,
          postType: 1,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // success
          console.log("没有修改封面保存文章返回");
          console.log(res);
          that.tipMessage(res);
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }
  },

  savaArticle: function () {
    var that = this;
    if (this.data.isTeam == 1) {//如果是团队用户，需要让其选择要保存为个人文章还是团队文章
      wx.showModal({
        title: '文章类型',
        content: '发布为个人文章还是团队文章？',
        confirmText: "团队文章",
        cancelText: "个人文章",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            that.savaAsPersoOrTeam(1);//如果参数为0就是保存为个人，否则就是团队文章
          } else if (res.cancel) {
            that.savaAsPersoOrTeam(0);//如果参数为0就是保存为个人，否则就是团队文章
          }
        }
      });
    } else {
      this.savaAsPersoOrTeam(0);//如果参数为0就是保存为个人，否则就是团队文章
    }


  },
 
  choosePic: function () {
    var that = this;
    wx.chooseImage({//打开相机/相片
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({ choosePicFlag: true });
        var url = res.tempFilePaths[0];
        console.log(url);
        that.setData({ fengmian: res.tempFilePaths[0] });
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
        var marginLeft = (width - 28 - 120) / 2;
        that.setData({ marginLeft: marginLeft });
      }
    })
  },
  onLoad: function (options) {
    console.log(options);
    this.initSystem();

    this.setData({ isTeam: options.isTeam, ownerId: options.ownerId, postType: options.postType });
    var fengmian = options.fengmian;
    var title = "";
    var dis = "";
    this.setData({ cid: options.cid });

    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!articleDesc.jsp',
      data: {
        cid: options.cid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log(res);
        title= util.strDiscode(res.data.json.article.displayName);
        dis=util.strDiscode(res.data.json.article.smallDesc);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

    if (options.byNone == undefined) {
      setTimeout(function () {
        if (title != undefined) {
          
          that.setData({ title: title });
        }
        if (fengmian != undefined) {
          that.setData({ fengmian: fengmian, });
        }
        if (dis != undefined) {
         
          that.setData({ dis: dis });
        }
      }, 800);
    } else {
      that.setData({ byNone:1});
      that.setData({ displaceholder: dis });
      that.setData({ titleplaceholder: title }); 
      if (fengmian != undefined) {
        that.setData({ fengmian: fengmian, });
      }
    }



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