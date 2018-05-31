// pages/user/setcard/updPhone/updPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCode: true,
    checkvalue: "获取验证码",
    code: "",
    phonecode: "",
    xcxCode: "",
    tuijianren: '',
    buttoncolor: '#EEAFAA',
    phone:""
  },

  /**
   * 设置输入框的值
   */
  setInfo: function (e) {
    var that = this;
    var id = e.target.id;
    var value = e.detail.value;
    console.log(id + "--" + value);
    if (id == "phone") {
      this.setData({ phone: value });
      var length = value.length;
      if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(value)) {
        that.setData({
          buttoncolor: "#EEAFAA",
          isCode: true
        })
      } else {
        that.setData({
          buttoncolor: "#999999",
          isCode: false
        })
      }
    } else if (id == "phonecode") {
      this.setData({ phonecode: value });
    }
  },
  /**
 * 获取验证码
 */
  getCode: function (e) {
    var that = this;
    if (this.data.phone == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: 'loading',
        duration: 1000
      });
      return;
    } else {
      var value = this.data.phone;
      var length = value.length;
      if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(value)) {
        wx.showLoading({
          title: '获取中...',
        })
        var that = this;
        that.getCodeFromService(value);
      } else {
        wx.showToast({
          title: '手机号格式不对',
          icon: 'loading',
          duration: 1000
        });
      }
    }
  },
  /**
   * 发送验证码
   */
  getCodeFromService: function (phone) {
    var xcxSession = wx.getStorageSync("xcxSession");
    var that = this;
    wx.request({//发到服务器，进行解密数据
      url: 'https://m.ccyishe.com/page/xcx/user!postSms.jsp',
      method: "POST",
      data: {
        phone: phone,
        xcxSession: xcxSession
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.result == "phone is exist") {
          wx.showToast({
            title: '该号码已注册过',
            icon: 'loading',
            duration: 1000
          });
        } else {
          var wait = 60;
          that.time(wait);
        }
      },
      fail: function (res) {
        console.log("测试失败返回");
        wx.hideLoading();
        console.log(res);
      }
    })
  },
  /**
 * 验证码倒计时
 */
  time: function (wait) {
    //console.log(wait);
    var that = this;
    if (wait == 0) {
      this.setData({
        checkvalue: "获取验证码",
        buttoncolor: "#EEAFAA",
        isCode: true
      })
      wait = 60;
    } else {
      this.setData({
        checkvalue: wait + "s后重新获取",
        buttoncolor: "#EEAFAA",
        isCode: false
      })
      wait--;
      setTimeout(function () {
        that.time(wait);
      },
        1000)
    }
  },

  /**
   * 注册事件
   */
  save: function (e) {
    var updPhone = this.data.phone;
    var phoneCode = this.data.phonecode;

    if (updPhone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'loading',
        duration: 1000
      })
      return;
    } else if (phoneCode == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'loading',
        duration: 1000
      })
      return;
    } else {
      wx.showLoading({
        title: '注册中...',
      })

      var xcxSession = wx.getStorageSync("xcxSession");
      var that = this;
     
          wx.request({//发到服务器，进行解密数据
            url: 'https://m.ccyishe.com/page/xcx/user!updatePhone.jsp',
            method: "POST",
            data: {
              xcxSession: xcxSession,
              phone: updPhone,
              code: phoneCode
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
             
              console.log(res);
              wx.hideLoading();
              if (res.data.result == "success") {
                wx.showToast({
                  title: '修改成功',
                  icon: 'loading',
                  duration: 1000
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                },
                  1000)
              } else if (res.data.result == "not session") {
                wx.showToast({
                  title: '您还没有登录',
                  icon: 'loading',
                  duration: 1000
                })
              } else if (res.data.result == "phone is exist") {
                wx.showToast({
                  title: '该号码已注册过',
                  icon: 'loading',
                  duration: 1000
                })
              } else if (res.data.result == "code is error") {
                wx.showToast({
                  title: '验证码错误',
                  icon: 'loading',
                  duration: 1000
                })
              } else if (res.data.result == "phone is error") {
                wx.showToast({
                  title: '手机号码错误',
                  icon: 'loading',
                  duration: 1000
                })
              } else {
                wx.showToast({
                  title: '服务器忙',
                  icon: 'loading',
                  duration: 1000
                })
              }
            },
            fail: function (res) {

            }
          })
        
    }
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