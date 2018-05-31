
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var area = require("../../../utils/area");
var p = 0, c = 0, d = 0
var rmNum = 5
Page({
  /**
   * 页面的初始数据setInNotes
   */
  data: {
    provinceName: [],
    provinceCode: [],
    provinceSelIndex: '',
    citiName: [],
    cityCode: [],
    citySelIndex: '',
    districtName: [],
    districtCode: [],
    districtSelIndex: '',
    showMessage: false,
    messageContent: '',
    showDistpicker: false,

    btntext: "查看联系方式",

    tabs: ["100条直销人脉", "人脉订阅"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    list: [],
    list2: [],
    isshow: true,
    region: ['广东省', '广州市', '海珠区'],
    diyueqi: [],
    version: 1,

    usertype: 1,
    lookNum: 0,
    condition: false,
    userId:0
  },
  moveToHome: function () {
    wx.switchTab({
      url: '../../home2/home2',
    })
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
  delDiYueQi: function (e) {
    var that = this;
    wx.showModal({
      title: '删除提示',
      content: '是否删除该订阅器？',
      confirmText: "确认删除",
      cancelText: "暂不删除",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          that.delDiYueQi2(e);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  delLoadDiYueQi: function (id) {
    var diyueqi = this.data.diyueqi;
    var index = -1;
    for (var i = 0; i < diyueqi.length; i++) {
      if (diyueqi[i].cid == id) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      diyueqi.splice(i, 1);
    }
    this.setData({ diyueqi: diyueqi });
  },
  delDiYueQi2: function (e) {
    var id = e.currentTarget.id;
    wx.showLoading({
      title: '删除中...',
    })
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/userresourcesclass!delete.jsp',
      data: {
        xcxSession: xcxSession,
        cid: id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("确定删除人脉返回" + xcxSession);
        wx.hideLoading();
        console.log(res);
        if (res.data.result == "success") {
          that.delLoadDiYueQi(id);
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
          })

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
  setAreaData: function (p, c, d) {
    var p = p || 0 // provinceSelIndex
    var c = c || 0 // citySelIndex
    var d = d || 0 // districtSelIndex
    // 设置省的数据
    var province = area['100000']
    var provinceName = [];
    var provinceCode = [];
    for (var item in province) {
      provinceName.push(province[item])
      provinceCode.push(item)
    }
    this.setData({
      provinceName: provinceName,
      provinceCode: provinceCode
    })
    // 设置市的数据
    var city = area[provinceCode[p]];
    var cityName = [];
    var cityCode = [];
    for (var item in city) {
      cityName.push(city[item])
      cityCode.push(item)
    }
    this.setData({
      cityName: cityName,
      cityCode: cityCode
    })

    // 设置区的数据
    var district = area[cityCode[c]]
    var districtName = [];
    var districtCode = [];
    for (var item in district) {
      districtName.push(district[item])
      districtCode.push(item)
    }
    this.setData({
      districtName: districtName,
      districtCode: districtCode,
    });
    this.setData({
      region: [provinceName[p], cityName[c], districtName[d]]
    });

  },
  changeArea: function (e) {
    p = e.detail.value[0]
    c = e.detail.value[1]
    d = e.detail.value[2]
    this.setAreaData(p, c, d);
  }, close: function () {
    this.setData({ isshow: true });
  },
  bindRegionChange: function (e) {
    this.setAreaData();
    this.setData({
      showDistpicker: true
    })
  },
  distpickerCancel: function () {
    this.setData({
      showDistpicker: false
    })
  },
  distpickerSure: function () {
    this.setData({
      showDistpicker: false
    });
  },
  adddiyueqi: function () {
    // wx.showLoading({
    //   title: '添加中...',
    // })
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    var usertype = this.data.usertype;
    var region = this.data.region;
    var provine = region[0];
    var city = region[1];
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/userresourcesclass!add.jsp',
      data: {
        xcxSession: xcxSession,
        userType: usertype,
        provine: provine,
        city: city
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log(usertype + "确定添加人脉订阅器返回" + xcxSession);
        //wx.hideLoading();
        console.log(res);
        that.setData({ isshow: true });
        if (res.data.result == "not vip") {
          wx.showToast({
            title: '您不是vip用户',
            icon: 'loading',
            duration: 1000
          })
        } else if (res.data.result == "number left 5") {

          console.log("数据执行饿");

          if (that.data.usertype == 1) {
            wx.showModal({
              title: '温馨提醒',
              content: '直销人脉的5个订阅器已添加完',
              confirmText: "确定",
              showCancel: false,
              success: function (res) {
                console.log(res);
                if (res.confirm) {

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
          } else if (that.data.usertype == 2) {
            wx.showModal({
              title: '温馨提醒',
              content: '微商人脉的5个订阅器已添加完',
              confirmText: "确定",
              showCancel: false,
              success: function (res) {
                console.log(res);
                if (res.confirm) {

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
          } else if (that.data.usertype == 3) {
            wx.showModal({
              title: '温馨提醒',
              content: '宝妈人脉的5个订阅器已添加完',
              confirmText: "确定",
              showCancel: false,
              success: function (res) {
                console.log(res);
                if (res.confirm) {

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });

          } else if (that.data.usertype == 4) {
            wx.showModal({
              title: '温馨提醒',
              content: '在校大学生人脉的5个订阅器已添加完',
              confirmText: "确定",
              showCancel: false,
              success: function (res) {
                console.log(res);
                if (res.confirm) {

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
          } else if (that.data.usertype == 5) {
            wx.showModal({
              title: '温馨提醒',
              content: '私营老板人脉的5个订阅器已添加完',
              confirmText: "确定",
              showCancel: false,
              success: function (res) {
                console.log(res);
                if (res.confirm) {

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
          } else if (that.data.usertype == 6) {
            wx.showModal({
              title: '温馨提醒',
              content: '保险从业者人脉的5个订阅器已添加完',
              confirmText: "确定",
              showCancel: false,
              success: function (res) {
                console.log(res);
                if (res.confirm) {

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
          }

        } else if (res.data.result == "success") {
          wx.redirectTo({
            url: '../list/list?activeIndex=1&usertype=' + usertype,
          })
        }

      },
      fail: function (res) {
        that.setData({ isshow: true });
      },
      complete: function (res) {
      }
    })

  },
  addshow: function () {
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
    this.setData({ isshow: false });
  },
  getDiYueQi: function () {
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.showLoading({
      title: '加载订阅器中...',
    })
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/userresourcesclass!list.jsp',
      data: {
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询订阅器返回" + xcxSession);
        wx.hideLoading();
        console.log(res);
        that.setData({ diyueqi: res.data.json.list })
      },
      fail: function (res) {
        // fail
        wx.hideLoading();
      },
      complete: function (res) {
        // complete
        wx.hideLoading();
      }
    })
  },
  tabClick: function (e) {//导航切换
    var that = this;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id == 0 && this.data.list.length == 0) {
      this.getRenMai();
    }
    if (e.currentTarget.id == 1 && this.data.diyueqi.length == 0) {
      this.getDiYueQi();
    }
  },
  openConfirm: function () {
    var that = this;
    wx.showModal({
      title: '查看提醒',
      content: '您还不是VIP会员无法查看联系方式',
      confirmText: "开通会员",
      cancelText: "再看看",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确认查看')
          that.setData({
            btntext: "保存到手机通讯录"
          })

        } else {
          console.log('用户点击暂不查看')
        }
      }
    });
  },
  gotoconnection: function () {
    wx.navigateTo({
      url: 'connection/connection',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  initSystem: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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
          that.renmaiTips(rmNumber, 0);
          return;
        } else if (res.data.result == "not vip not number") {
          that.renmaiTips(rmNumber, 1);
          return;
        } else if (res.data.result == "not vip not readCount") {
          that.renmaiTips(rmNumber, 2);
          return;
        }else{

        that.renmaiTips(rmNumber, 0);

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
        }
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
  renmaiTips: function (rmNumber, viptype) {
    var that = this;
    var user_id = this.data.userId;
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
        if (look_Num == "-20") {
          viptype = 2;
          console.log(viptype + "viptype");
        }
        that.setData({ lookNum: look_Num });
        if (viptype == 2) {
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
          that.setData({ lookNum: 5 });
          return;
        }

        var ownerId = wx.getStorageSync("myId");
        if (look_Num == rmNumber) {
          if (viptype == 0) {
          
             if (look_Num == 5 ) {
              wx.showModal({
                title: '温馨提示',
                content: '邀请5位好友注册，每天可查看50条人脉！',
                showCancel: '继续加',
                confirmText: '去邀请',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../register?tuijianrenId=' + user_id + '&part=yes',
                    });
                  }
                }
              })
            } else {
              wx.showModal({
                title: '使用提醒',
                content: '今天您已经查看' + rmNumber + '条',
                confirmText: "我的人脉",
                cancelText: '明天再来',
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
          else if (viptype == 1) {

            wx.showModal({
              title: '温馨提示',
              content: '邀请5位好友注册，每天可查看50条人脉！',
              showCancel: false,
              confirmText: '去邀请',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../register?tuijianrenId=' + user_id + '&part=yes',
                  })
                } else if (res.cancel) {

                }
              }
            })
            return;
          }
          return;
        }else{
          if (look_Num == 2) {
            wx.showModal({
              title: '温馨提示',
              content: '邀请5位好友注册，每天可查看50条人脉！',
              showCancel: '继续加',
              confirmText: '去邀请',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../register?tuijianrenId=' + user_id + '&part=yes',
                  });
                }
              }
            })
          }
        }
        if (viptype == 2) {
          wx.showModal({
            title: '使用提醒',
            content: '非VIP会员只能查20条免费人脉',
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
          return;
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
      rmNumber = 5;
      var id = e.currentTarget.id;
      that.checkSaveInRenMai(id, rmNumber);
    }
    else {
      var xcxSession = wx.getStorageSync('xcxSession');
      var rmNumber = 5;
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
          rmNumber = res.data.json.user.renmainumber == 0 ? 5 : res.data.json.user.renmainumber;

          console.log("version=" + that.data.version);
          var id = e.currentTarget.id;
          that.checkSaveInRenMai(id, rmNumber);
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
  getRenMai: function () {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    var xcxSession = wx.getStorageSync('xcxSession');
    var usertype = this.data.usertype;
    wx.request({
      //url: 'https://m.ccyishe.com/page/xcx/userresources!list.jsp',
      url: 'https://m.ccyishe.com/page/xcx/userresources!yibai.jsp',
      data: {
        xcxSession: xcxSession,
        userType: usertype,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log(usertype + "查询人脉返回" + that.data.version + "--" + xcxSession);
        console.log(res);
        //if (that.data.version == 1) {
        that.transFromJson2_1(res.data.json.list);
        // } else {
        //   that.transFromJson2_2(res.data.json.list);
        // }

      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        wx.hideLoading();
      }
    })
  },
  transFromJson2_1: function (list) {
    for (var i = 0; i < list.length; i++) {
      list[i].havaCheck = 0;
    }
    this.setData({ list: list });

    console.log("QQ:" + list);
  },
  transFromJson2_2: function (list) {
    console.log("QQ:" + list);
    this.setData({ list2: list });
    for (var i = 0; i < list.length; i++) {
      if (list[i].name != null) {
        list[i].name = list[i].name.substring(0, 1) + "**";
      }
      if (list[i].phone != null) {
        list[i].phone = list[i].phone.slice(0, 3) + "***" + list[i].phone.slice(6, 8);
      }
      if (list[i].qq != null) {
        list[i].qq = list[i].qq.slice(0, 3) + "***" + list[i].qq.slice(6, 8);
      }
      if (list[i].wechat != null) {
        console.log("QQ:" + list[i].wechat);
        list[i].wechat = list[i].wechat.slice(0, 2) + "***";
      }

    }

    this.setData({ list: list });
  },
  checkIsVip: function () {


  },
  transFormJson: function (res) {
    console.log(res);
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
      teamId: res.data.json.user.teamId,
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
      proNumber: res.data.json.user.proNumber,
      proNumberCount: res.data.json.user.proNumberCount,
    };
    this.setData({
      personData: personData,
      version: res.data.json.user.version,// 0,//
      hehuo: res.data.json.user.hehuo
      // version: 1,
      // hehuo: 1
    });
  },
  onLoad: function (options) {
    wx.setStorageSync('isnewhome', "false");
    var that = this;
    this.initSystem();

    var ownerId = wx.getStorageSync("myId");
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
        var version = res.data.json.user.version;
        that.SetData({ userId: res.data.json.user.cid});
        if (version == 0) {
          that.setData({
            rmNum: 5,
            version: 0
          })
        }
        else if (version == 1) {
          that.setData({
            rmNum: res.data.json.user.renmainumber == 0 ? 5 : res.data.json.user.renmainumber,
            version: 1
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

    wx.request({//请求拿到用户数据的接口
      url: 'https://m.ccyishe.com/page/xcx/index!mp.jsp',
      data: {
        ownerId: ownerId,
        praiseSession: xcxSession
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(ownerId + "传ownerId返回7-31" + xcxSession);
        console.log(res);
        console.log("onLoadusertype:" + options.usertype);
        var usertype =1;
        that.setData({ usertype: 1 });
        if (usertype == '1') {
            var tabs = ["100条直销人脉"];
            that.setData({ tabs: tabs });
        } 
        if (res.data.result == "success") {
          that.transFormJson(res);
        }
        that.getRenMai();
        that.checkIsVip();
        if (options.activeIndex != undefined) {
          that.setData({ activeIndex: 1 });
          that.getDiYueQi();
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
        that.setData({ lookNum: res.data.json == "-20" ? 5 : res.data.json });
        console.log("lookNum" + res.data.json);
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