// pages/home2/speed/speed.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTeam: 0,
    avatarUrl:'',
    personData: {
      name:'',
      teamName:"",
      zhiwei:'',
      phone: '',
      qq:'',
      wechar:'',
      belongCom:'',
      shareCom:'',
      picurlXcxQr:'',
      picurl:''
      },
    tuijianrenId: '',
    havateam: 0,
    vipObj: {
      vip: 0,
      endTime: '',

    }, 
    icon: {
      title: 'https://m.ccyishe.com/html/images/20171102/ktitle.png',
      zhifu: 'https://m.ccyishe.com/html/images/20171102/jingru.png',

    },
    person: {
      belongCom: '做事业,您必须有一个实用的电子名片',
      belongren: '做事业,您不能没有人脉',
      belongwen: '做事业,我们最喜欢做的就是转发推广',
      belongtui: '最高可以拿到200元、100元的佣金',
      personImg: 'https://m.ccyishe.com/html/images/20171102/findrenm.png',
      findrenm: 'https://m.ccyishe.com/html/images/20171102/findrenm.png',
      name: '我的名片',
      tuiguang: '推广赚钱',
      findren: '找人脉',
      wenzhang: '我的文章',
      mywenz: 'https://m.ccyishe.com/html/images/20171102/mywenz.png',
      tuigzq: 'https://m.ccyishe.com/html/images/20171102/tuigzqian.png',

    },
    mymingpian: [{
      id: 0,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/mingpian.png',
      smallName: '设置名片',

    }, {
      id: 1,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/zixun.png',
      smallName: '我的咨询',

    }, {
      id: 2,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/zuji.png',
      smallName: '我的足迹',

    }, {
      id: 3,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/zan.png',
      smallName: '我的赞',
    }],
    zhaorenmai: [{
      id: 0,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/renmai.png',
      smallName: '我的人脉',

    }, {
      id: 1,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/tuijianjian.png',
      smallName: '我的推荐',

    }, {
      id: 2,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/mingpj.png',
      smallName: '名片夹',

    }, {
      id: 3,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/jiameng.png',
      smallName: '招商加盟',
    }],
    mywenzheng: [{
      id: 0,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/fawenz.png',
      smallName: '发文章',

    }, {
      id: 1,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/cgaox.png',
      smallName: '草稿箱',

    }, {
      id: 2,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/fabu.png',
      smallName: '已发布',

    }, {
      id: 3,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/fenx.png',
      smallName: '分享朋友圈',
    }],
    tuiqian: [{
      id: 0,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/erweima.png',
      smallName: '推广二维码',

    }, {
      id: 1,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/tuig.png',
      smallName: '推广页面',

    }, {
      id: 2,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/huoban.png',
      smallName: '我的伙伴',

    }, {
      id: 3,
      picUrl: 'https://m.ccyishe.com/html/images/20171102/tixian.png',
      smallName: '体现收益',
    }],

  },
  // 我的名片
  setmycard: function () {
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
                  url: '../../user/setcard/setcard',
                })
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '../../card/index',
                })
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '../../card/index',
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
    })
  },
  checkDetails: function (e) {
    var id = e.currentTarget.id;
    if (id == 0) {
      var ownerId = wx.getStorageSync("myId");
      var xcxSession = wx.getStorageSync("xcxSession");
      var that = this;
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
          console.log("传ownerId返回7-11");
          console.log(res);
          var userws = res.data.json.user.userws;
          if (userws != 1) {
            wx.navigateTo({
              url: '../../user/setcard/setcard',
            })
     
          } else {
            wx.navigateTo({
              url: '../../user/setcard/setcard',
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
      })

    } else if (id == 1) {
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
            wx.navigateTo({
              url: '../../user/mychat/mychat',
            })
       
          } else {
            wx.navigateTo({
              url: '../../user/mychat/mychat',
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
      })


    } else if (id == 2) {
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
            wx.navigateTo({
              url: '../../user/foot/foot',
            })
        
          } else {
            wx.navigateTo({
              url: '../../user/foot/foot',
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
      })
    } else if (id == 3) {
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
            wx.navigateTo({
              url: '../../user/zan/zan',
            })
            
          } else {
            wx.navigateTo({
              url: '../../user/zan/zan',
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
      })
    }
  },
  //找人脉
  findrenmai:function(){
    this.index();
  },
  checkIsWangshang: function () {
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
        console.log(res);
        var userws = res.data.json.user.userws;
        if (userws != 1) {
          wx.navigateTo({
            url: '../../notes/myrm/myrm',
          })
        } else {
          wx.navigateTo({
            url: '../../notes/myrm/myrm',
          })
        }
      },
      fail: function (res) {
        // fail
        console.log("传xcxSession失败返回");
        console.log(res);

      },
      complete: function (res) {
        // complete 招商加盟

      }
    })
  },
  checkDetail: function (e) {
    var id = e.currentTarget.id;
    var my_Id = wx.getStorageSync("myId");
    if (id == 0) {
      wx.navigateTo({
        url: '../my/my',
      })
    } else if (id == 1) {
        this.checkIsWangshang();  
    } else if (id == 2) {
      wx.navigateTo({
        url: '../../notes/index/notes',
      })
    } else if (id == 3) {
      
    }
  },

  //我的文章
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
      picurlXcxQr: res.data.json.user.picurlXcxQr,
      picurl: res.data.json.user.picurl
    };
    wx.setStorageSync('personImg', newPath);
    this.setData({ company: res.data.json.company, team: res.data.json.team });
    this.setData({ textTest: textTest, personData: personData, picurlXcxQr: res.data.json.user.picurlXcxQr });

    this.setComIconInfo(res.data.json.companyinfo);

    this.setComListInfo(res.data.json.companyinfo);

    this.setTeamIconInfo(res.data.json.teaminfo);

    this.setTeamListInfo(res.data.json.teaminfo);
    this.setData({ condition: res.data.json.condition });
    wx.setStorageSync('companyinfo', res.data.json.companyinfo);
    wx.setStorageSync('teaminfo', res.data.json.teaminfo);
    wx.setStorageSync('textTest', textTest);
    wx.setStorageSync('personData', personData);
  },
  panduanIsWangShangZiLiao: function () {
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
                wx.navigateTo({
                  url: '../../../../user/setcard/setcard',
                })
              } else if (res.cancel) {
                var ownerId = wx.getStorageSync("myId");
                wx.navigateTo({
                  url: '../../discover/tools/article/editarticle/editarticle?publish=' + 1 + "&isTeam=" + that.data.isTeam + "&ownerId=" + ownerId,
                })
              }
            }
          })
        } else {
          var ownerId = wx.getStorageSync("myId");
          wx.navigateTo({
            url: '../../discover/tools/article/editarticle/editarticle?publish=' + 1 + "&isTeam=" + that.data.isTeam + "&ownerId=" + ownerId,
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
    })
  },
  myxiaochengxuzhan: function () {
    var ownerId = wx.getStorageSync("myId");
    wx.navigateTo({
      url: '../../discover/tools/article/myarticle/myarticle?ownerId=' + ownerId,
    })
  },
  checkDetailss: function (e) {
    var id = e.currentTarget.id;
    var my_Id = wx.getStorageSync("myId");
    if (id == 0) {
      // wx.navigateTo({
      //   // url: '../help/new-user/new-user?tuijianrenId=' + my_Id,
      //   url: '../../discover/tools/article/editarticle/editarticle?ownerId=' + ownerId,
      //   //publish=' + 1 + "&isTeam=" + that.data.isTeam + "&ownerId=" + ownerId
      // })
      this.panduanIsWangShangZiLiao();
    } else if (id == 1) {
      var ownerId = wx.getStorageSync("myId");
      var that = this;
      wx.navigateTo({
        url: '../../discover/tools/article/mydrafts/mydrafts?ownerId=' + ownerId + "&isTeam=" + that.data.isTeam,
      })
    } else if (id == 2) {

      wx.navigateTo({
        url: '../../discover/tools/article/published/published?ownerId=' + ownerId,
        //havateam='+ that.data.havateam + "&isTeam=" + that.data.isTeam
      })
      
    } else if (id == 3) {
      
      var personData = this.data.personData;
      wx.navigateTo({
        url: '../../discover/tools/article/help/help', //  + JSON.stringify(personData) + "&" +personData+ "ownerId="+ ownerId
      })
    }
  },
//推广赚钱
  friends: function () {
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
          wx.navigateTo({
            url: '../../user/Invitation/Invitation',
          })

        } else {
          wx.navigateTo({
            url: '../../user/Invitation/Invitation',
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
    })
  },
  tuiguangzq:function(e){
    this.friends();
  },
  checkDetailsss: function (e) {
    var id = e.currentTarget.id;
    var my_Id = wx.getStorageSync("myId");
    if (id == 0) {
      this.friends();

    } else if (id == 1) {
      var ownerId = wx.getStorageSync("myId");
      var that = this;
      wx.navigateTo({
        url: '../../register/register?ownerId=' + ownerId,
      })
    } else if (id == 2) {

      wx.navigateTo({
        
        url: '../../notes/myrm/rmtypedetails/rmtypedetails?rmtype=' + (id-1) + "&category=1",
      })

    } else if (id == 3) {

      wx.navigateTo({
        url: '../../user/mymoney/mymoney',
      });
    }
  },
//跳转到首页
  index: function (e) {

    var ownerId = wx.getStorageSync("myId");
    wx.switchTab({
      url: '../../home2/home2?tuijianrenId=' + ownerId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({ avatarUrl: userInfo.avatarUrl});
        // that.setData({          
        //   name: userInfo.personData.name,
        //   picurl: userInfo.personData.picurl,
        //   phone: userInfo.personData.phone,
        //   qq: userInfo.personData.qq,
        //   zhiwei: userInfo.personData.zhiwei,
        //   wechar: userInfo.personData.wechar,
        //   belongCom: userInfo.personData.belongCom,
        //   picurlXcxQr: userInfo.personData.picurlXcxQr,
        // });
        console.log(userInfo.avatarUrl);
    
      } 
    })
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
    var ownerId = wx.getStorageSync("myId");
    var that = this;
    return {
      title: '爱知脉：找人脉、电子名片、发文章、推广赚钱',
      path: "page/home2/speed/speed?tuijianrenId="+ownerId,
      imageUrl: "https://media.ccyishe.com/xcx/images/openvip.jpg",
      success: function (res) {
        console.log(111);
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }
})