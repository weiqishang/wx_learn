// tqarticle.js
Page({
  data: {
    isTeam:0,

    addr: '',
    isSure: true,
  },
  onLoad:function(options){
    this.setData({ isTeam: options.isTeam});

  }, 
  setAddr: function (e) {
    console.log(e);
    var addr = e.detail.value;
    this.setData({ isSure: false,addr: addr });
  },
  getArticleFromAdrr: function () {

    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/user!userInfo.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var version = res.data.json.user.version;
        if (version == 0) {
          wx.navigateTo({
            url: '../../message/message',
          })
        }else{
          if (that.data.addr == "") {
            wx.showToast({
              title: '文章链接有误',
              icon: 'loading',
              duration: 2000
            })
            return;
          }
          wx.showLoading({
            title: '加载中...',
          })
          wx.request({
            url: 'https://m.ccyishe.com/page/xcx/article!getwxart.jsp',
            data: {
              xcxSession: xcxSession,
              url: that.data.addr,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },

            success: function (res) {
              // successs
              console.log("地址查询文章返回" + xcxSession);
              console.log(res);
              wx.hideLoading();
              var result = res.data.result;
              console.log(result);
              var ownerId = wx.getStorageSync('myId');
              if (result == "errorUrl" || result == "undefined" || result == undefined) {
                wx.showToast({
                  title: '文章链接有误',
                  icon: 'loading',
                  duration: 2000
                })
              } else if (result == "notProNumber") {
                /**wx.navigateTo({
                  url: '../../message/message',
                })**/
              } else if (result == "success") {
                wx.setStorageSync("articleDesc", res.data.json.articleDesc)
                wx.navigateTo({
                  url: '../editarticle/editarticle?ownerId=' + ownerId + "&isTeam=" + that.data.isTeam + "&picurl=" + res.data.json.picurl + "&aid=" + res.data.json.cid + "&postType=" + res.data.json.postType,
                })
              }

            }
          });
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
    });

    

  },
})