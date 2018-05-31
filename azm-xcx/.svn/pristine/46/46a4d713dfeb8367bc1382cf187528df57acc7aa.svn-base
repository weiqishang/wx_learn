// pages/home2/list/renmai/renmai.js
var rmNum=50;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    blockIndex:1,
    list:[],
    lookNum: 0
  },
  copyphone: function (e) {
    var obj = e.currentTarget.id;
    console.log("obj=" + obj) // data
    wx.setClipboardData({
      data: obj,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '手机号复制成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  },
  copywechat: function (e) {
    var obj = e.currentTarget.id;
    console.log("obj=" + obj) // data
    wx.setClipboardData({
      data: obj,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '微信复制成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  }
  ,
 

  /**
   * 生命周期函数--监听页面加载
   */
  dateToString: function (TimeStamp) {
    var now = new Date(TimeStamp);
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    var second = (now.getSeconds()).toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    if (hour.length == 1) {
      hour = "0" + hour;
    }
    if (minute.length == 1) {
      minute = "0" + minute;
    }
    if (second.length == 1) {
      second = "0" + second;
    }
    //var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    var dateTime = year + "-" + month + "-" + day
    return dateTime;
  },
  checkSaveInRenMai: function (cid, rmNumber) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/userresources!selectResources.jsp',
      data: {
        xcxSession: xcxSession,
        cid: cid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log(cid + "查询具体一个详情人脉返回");
        console.log(res);


        wx.hideLoading();

        if (res.data.result == "not number") {
          that.renmaiTips(rmNumber);
          /**var datestr = that.dateToString(new Date());
          wx.setStorageSync(datestr, rmNumber);
          that.setData({ lookNum: rmNumber });
          wx.showModal({
            title: '使用提醒',
            content: '今天已经查看了' + rmNumber+'条联系方式',
            confirmText: "查看",
            cancelText: '明天再来',
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                wx.redirectTo({
                  url: '../my/my',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }

            }
          });*/
          return;
        } else if (res.data.result == 'exist') {
          wx.showModal({
            title: '查看提醒',
            content: '此人脉您已经查看过，无需重复查看!',
            confirmText: "确定",
            cancelText: false,
            success: function (res) {
            }
          });
          return;
        }
        var obj = res.data.json.resources;
        obj.havaCheck = 1;


        var index = -1;
        var list = that.data.list;

        for (var i = 0; i < list.length; i++) {
          if (list[i].cid == cid) {
            index = i;
          }
        }
        if (index != -1) {
          list[index] = obj;
        }

        that.setData({ list: list });
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
  renmaiTips: function (rmNumber)
  {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/userresources!selectNumber.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var look_Num = res.data.json;
        if (look_Num == rmNumber) {
          that.setData({ lookNum: look_Num});
          wx.showModal({
            title: '使用提醒',
            content: '今天已经查看了' + rmNumber + '条联系方式',
            confirmText: "查看",
            cancelText: '明天再来',
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                wx.redirectTo({
                  url: '../my/my',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }

            }
          });
          return;
        }
        else
        {
          that.setData({ lookNum: look_Num + 1 });
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
  checkDetailsNote: function (e) {
    var that = this;
    if (this.data.version == 0) {
      wx.showModal({
        title: '使用提醒',
        content: '您还不是vip会员,无法查看联系方式',
        confirmText: "开通会员",
        cancelText: "再看看",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            that.shenji();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
      return;
    }
   else{
    var xcxSession = wx.getStorageSync('xcxSession');
    var rmNumber = 50;
    //查询当前用户已查看人脉数
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
        rmNumber = res.data.json.user.renmainumber == 0 ? 50 : res.data.json.user.renmainumber;
        that.renmaiTips(rmNumber);
        var id = e.currentTarget.id;
        that.checkSaveInRenMai(id, rmNumber);
        console.log("rmNumber=="+rmNumber);
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
    }
 

  },
  setInNotes: function (e) {
    var obj = e.currentTarget.dataset.my;
    wx.addPhoneContact({
      nickName: obj.name,
      firstName: obj.name,
      mobilePhoneNumber: obj.phone,
      hostNumber: obj.phone,
      weChatNumber: obj.wechat,
      addressState: obj.provine,
      addressCity: obj.city,
      title: obj.position,
      success: function (res) {
        wx.setClipboardData({
          data: obj.phone,
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
              }
            })
          }
        });
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        });
      },
      fail: function (res) {

        wx.showToast({
          title: '保存失败' + res,
          icon: 'success',
          duration: 1000
        });
        console.log("保存失败");
        console.log(res);
      }
    });

  },
  getBack:function(){
    wx.navigateBack({
      delta:1,
    })
  },
  transFromJson2_1: function (list) {
    for (var i = 0; i < list.length; i++) {
      list[i].havaCheck = 0;
    }
    this.setData({ list: list });
  },
  getRenMaiKu:function(id){
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/userresources!classlist.jsp',
      data: {
        xcxSession: xcxSession,
        cid:id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log(id+"得到人脉返回" + xcxSession);
        wx.hideLoading();
        console.log(res);
        
        if (res.data.result=="time before"){
          that.setData({blockIndex:2});
        } else if (res.data.result == "success"){
          that.transFromJson2_1(res.data.json.list);
        }
      },
      fail: function (res) {
        // fail
        that.setData({ isshow: true });
        wx.hideLoading();
      },
      complete: function (res) {
        // complete
        wx.hideLoading();
      }
    })

  },
  onLoad: function (options) {
      var that = this;
      var id = options.id;
      this.setData({id:id});
      this.getRenMaiKu(id);
      var xcxSession = wx.getStorageSync('xcxSession');
      //查询当前用户已查看人脉数
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
          that.setData({
            rmNum: res.data.json.user.renmainumber == 0 ? 50 : res.data.json.user.renmainumber
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
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/userresources!selectNumber.jsp',
      data: {
        xcxSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({ lookNum: res.data.json });
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
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})