// pages/home2/regrm/regrm.js
var format = require("../../../utils/formatTime");
Page({

  /**
   * 页面的初始数据
   * 
   */
  data: {
    rmNum: 0,//每种人脉可查看的人脉条数
    typeName: '',//人脉种类名称
    rmType: 0,//人脉类型参数
    version: 0,//当前用户的版本：0=免费会员；1=VIP会员
    lookNum: 0,//已查看条数
    list: [],
    userws: 0,//判断当前用户是否完善资料
    pagesize:50
  },
  /**
   * 添加通讯里
   */
  setInNotes: function (e) {
    var obj = e.currentTarget.dataset.my;
    var typeName = this.data.typeName;
    wx.addPhoneContact({
      nickName: "［" + typeName+"］"+obj.name,
      firstName: obj.name,
      mobilePhoneNumber: obj.phone,
      hostNumber: obj.phone,
      weChatNumber: obj.wechat,
      addressState: obj.provine,
      addressCity: obj.city,
      title: obj.position,
      organization: obj.companyName,
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
  shenji: function () {
    var that = this;
    wx.showLoading({
      title: '查询数据中...',
    })
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/userserver!getVip.jsp',
      data: {
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询是否vip返回");
        console.log(res);
        wx.hideLoading();
        var vipObj = res.data.json;
        var personData = that.data.personData;
        wx.navigateTo({
          url: '../../user/openvip/openvip?personData='
          + JSON.stringify(personData) + "&vipObj=" + JSON.stringify(vipObj),
        })
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
  checkRenMaiKu: function (e) {
    console.log("查看人脉库");
    console.log(e);
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: './renmai/renmai?id=' + id,
    })
  },
  /**
   * 根据人脉类型参数，判断人脉属性
   */
  getRmType: function () {
    var rm_Type = this.data.rmType;
    if (rm_Type == 1) {
      wx.setNavigationBarTitle({
        title: '实时人脉',
      });
      this.setData({ typeName: '实时人脉', rmNum: 35 })
    } else if (rm_Type == 2) {
      wx.setNavigationBarTitle({
        title: '精选人脉',
      })
      this.setData({ typeName: '精选人脉', rmNum: 50 })
    } else if (rm_Type == 3) {
      wx.setNavigationBarTitle({
        title: 'VIP人脉',
      })
      this.setData({ typeName: 'VIP人脉', rmNum: 15 })
    }
  },
  /**
   * 获取用户基本信息
   * 主要获取用户版本信息
   */
  getUserVersion: function () {
    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
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
        var _version = res.data.json.user.version;
        if (_version == 0) {
          that.setData({
            rmNum: 5,
            version: 0,
            userws: res.data.json.user.userws
          })
        }
        else if (_version == 1) {
          that.setData({
            version: 1,
            userws: res.data.json.user.userws
          })
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
  /**
   * 获取人脉列表
   */

  transFromJson: function (list) {
    for (var i = 0; i < list.length; i++) {
      list[i].havaCheck = 0;
    }
    this.setData({ list: list });

    console.log("QQ:" + list);
  },
  getRmList: function () {
    var xcxSession = wx.getStorageSync("xcxSession");
    var userType = this.data.rmType;
    var dataTime = format.formatTime(new Date());
    var rmstartIndex = wx.getStorageSync("rmstartIndex");
    if (rmstartIndex == "") {
      rmstartIndex = 1;
      wx.setStorageSync("rmstartIndex", 2);
    } else {
      rmstartIndex = parseInt(rmstartIndex);
      wx.setStorageSync("rmstartIndex", rmstartIndex + 1);
    }
    var ds = this.data.pagesize;
    var that = this;
    console.log('https://m.ccyishe.com/page/xcx/userresources!rcList.jsp?userType=' + userType + '&xcxSession=' + xcxSession + '&pn=' + 1 + '&dtime=' + dataTime + '&ds=1');
    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/userresources!rcList.jsp',
      data: {
        userType: userType,
        xcxSession: xcxSession,
        pn: rmstartIndex,
        dtime: dataTime,
        ds: ds
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(userType + "--" + rmstartIndex + "查询list返回" + xcxSession);
        console.log(res);
        if (res.data.result == 0) {
          that.transFromJson(res.data.json.list);
          that.setData({ lookNum: res.data.json.todayLookNum });
        } else if (res.data.result == '-1') {
          wx.showLoading({
            title: '网络异常(-1)',
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else if (res.data.result == '-2') {
          wx.showLoading({
            title: '网络异常(-2)',
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else if (res.data.result == '-10000') {
          wx.showLoading({
            title: '网络异常(-10000)',
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
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
  /**
   * 根据用户查看次数，今天判断提示
   */
  getRmNumber: function (todayLookNum, totalLookNum) {
    var v = this.data.version;
    var rmNum = this.data.rmNum;
    this.setData({ lookNum: todayLookNum })
    var that = this;
    if (v == 0) {
      if (todayLookNum == 5) {//当今天免费用户查看5个人脉
        if (totalLookNum == 20) {//当免费用户累计查看20个人脉
          wx.showModal({
            title: '使用提醒',
            content: '非VIP会员累计只能查20条免费人脉',
            confirmText: "升级会员",
            cancelText: '我的人脉',
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                that.shenji();
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../my/my',
                })
              }
            }
          });
        }
        else {
          wx.showModal({
            title: '使用提醒',
            content: '非VIP会员，每天只能查看' + rmNum + '条',
            confirmText: "升级会员",
            cancelText: '取消',
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                that.shenji();
              } else if (res.cancel) {
              }
            }
          });
        }
      }
    } else if (v == 1) {
      if (rmNum - todayLookNum == 0) {//当VIP用户今天查看到达上线
        wx.showModal({
          title: '使用提醒',
          content: '今天您已经查看' + rmNum + '条',
          confirmText: "我的人脉",
          cancelText: '再看看',
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              wx.navigateTo({
                url: '../my/my',
              });
            } else if (res.cancel) {
            }
          }
        });
      }
    }
  },
  /**
   * 点击查看联系方式事件
   * 查询出此条人脉的联系方式
   * 并返回当前人脉类型当天已查看的条数
   */
  getQueryContact: function (e) {
    var userws=this.data.userws;
    if (userws == 0) {

      wx.showModal({
        title: '温馨提示',
        content: '完善资料，才可查看人脉',
        showCancel: false,
        confirmText: '立即完善',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../user/setcard/setcard',
            })
          } else if (res.cancel) {
           
          }
        }
      })
    } else {
      var uid = e.currentTarget.id;
      var that = this;
      var xcxSession = wx.getStorageSync("xcxSession");
      //查询当前用户已查看人脉数
      wx.request({//请求拿到用户数据的接口
        url: 'https://m.ccyishe.com/page/xcx/userresources!selectResources.jsp',
        data: {
          xcxSession: xcxSession,
          cid: uid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          wx.hideLoading();
          if (res.data.result == "not number") {
            that.getRmNumber(that.data.rmNum, 0);
          } else if (res.data.result == "not vip not number") {
            that.getRmNumber(that.data.rmNum, 0);
          } else if (res.data.result == "not vip not readCount") {
            that.getRmNumber(that.data.rmNum, 20);
          } else if (res.data.result == 'exist') {
            wx.showLoading({
              title: '重复查看人脉',
            })
            setTimeout(function () {
              wx.hideLoading();
            }, 2000)
          } else if (res.data.result == "success") {
            var obj = res.data.json.resources;
            var list = that.data.list;
            for (var i = 0; i < list.length; i++) {
              if (list[i].cid == uid) {
                list[i].position = obj.position;
                list[i].phone = obj.phone;
                list[i].name = obj.name;
                list[i].province = obj.province;
                list[i].picurl = obj.picurl;
                list[i].wechat = obj.wechat;
                list[i].createDate = obj.createDate;
                list[i].cid = obj.cid;
                list[i].qq = obj.qq;
                list[i].city = obj.city;
                list[i].companyName = obj.companyName;
                list[i].havaCheck = 1;
              }
            }
            that.setData({ list: list });
            that.getRmNumber(res.data.json.todayLookNum, res.data.json.totalLookNum);
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setStorageSync("rmstartIndex", "");
    var rm_Type = options.rmtype;//1:实时人脉；2：精选人脉；3：VIP人脉
    this.setData({ rmType: rm_Type })
    this.getRmType();
    this.getUserVersion();
    this.getRmList();
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
    wx.setStorageSync("rmstartIndex", "");
    this.getRmType();
    this.getUserVersion();
    this.getRmList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getRmList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})