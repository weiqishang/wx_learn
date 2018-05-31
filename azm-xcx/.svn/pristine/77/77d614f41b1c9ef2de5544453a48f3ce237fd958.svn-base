// name.js
Page({
  data: {
    id: 'name',

    phone: '',
    code: '',
    name: '',
    wechat: '',
    qq: '',
    position: '',
    userInfo: '',
    companyId: '',
    teamId: '',
    sex: '',
    province: '',
    city: '',
    Birthday: '',
    doit: '',
    picurl: '',

    date: '2016-09-01',
    region: ['广东省', '广州市', '海珠区'],
    array: ['男', '女'],
    index: 0,
    haveChooseImg: false,
    buttoncolor: "#999999",//灰色
    yanzhengmahidden: true,
    checkvalue: "获取验证码",

    methodFlag: true,
    isSure:true,
  },
  getCodeFromService: function (phone, code) {
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
          })
        } else {
          var wait = 60;
          that.time(wait);
        }
      },
      fail: function (res) {
        console.log("测试失败返回");
        console.log(res);
      }
    })
  },
  getCheckCode: function () {
    if (this.data.phone == "") {
      wx.showToast({
        title: '缺少必要信息',
        icon: 'loading',
        duration: 1000
      });
    }
    var that = this;
    wx.login({
      success: function (res) {//用户登录成功
        if (res.code) {
          console.log(res);
          var code = res.code;
          that.setData({ xcxCode: code });
          that.getCodeFromService(that.data.phone, code);
        }
      }
    });

  },
  time: function (wait) {
    //console.log(wait);
    var that = this;
    if (wait == 0) {
      this.setData({
        checkvalue: "获取验证码",
        buttoncolor: "green",
      })
      wait = 60;
    } else {
      this.setData({
        checkvalue: wait + "s后重新获取",
        buttoncolor: "#999999",
      })
      wait--;
      setTimeout(function () {
        that.time(wait);
      },
        1000)
    }
  },
  setInfo: function (e) {
    var that = this;
    var id = e.target.id;
    var value = e.detail.value;
    console.log(id + "--" + value);


    if (id == "personPhone") {
      this.setData({ phone: value });
      var length = value.length;
      if (this.data.methodFlag) {
        if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(value)) {
          that.setData({
            buttoncolor: "green",
            yanzhengmahidden: false,
          })
        } else {
          that.setData({
            buttoncolor: "#999999",
            yanzhengmahidden: true,
          })
        }
      } else {
        if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(value)) {
          that.setData({
            buttoncolor: "green",
            yanzhengmahidden: false,
          })
        } else {
          that.setData({
            buttoncolor: "#999999",
            yanzhengmahidden: true,
          })
        }
      }
      //phoneFlag

    } else if (id == "checkCode") {
      this.setData({ code: value, isSure:false });

    }
  },
  chooseImage2: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files2: res.tempFilePaths,
          picurl: res.tempFilePaths,
          haveChooseImg: true,
        });

      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    var sexTmp = '';
    if (e.detail.value == 0) {
      sexTmp = "男";
    } else {
      sexTmp = "女";
    }
    var e2 = {
      detail: {
        value: sexTmp
      }
    };
    this.setValue(e2);
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    var e2 = {
      detail: {
        value: e.detail.value
      }
    };
    this.setValue(e2);
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    var e2 = {
      detail: {
        value: e.detail.value
      }
    };
    this.setValue(e2);
  },
  upPersonImg: function () {
    var file = this.data.files2;
    var that = this;
    console.log("上传参数：" + that.data.xcxSession + "---" + file[0]);
    var dotLoc = file[0].lastIndexOf('.');
    var fileLen = file[0].length;
    var fileFileName = file[0].substring(dotLoc, fileLen);
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.showLoading({
      title: '保存中...',
    })
    console.log(fileFileName);
    if (file.length != 0) {
      wx.uploadFile({
        url: 'https://m.ccyishe.com/page/xcx/user!uppic.jsp',
        filePath: file[0],
        name: 'file',
        formData: {
          'type': 0,
          'xcxSession': xcxSession,
          'fileFileName': fileFileName,
        },
        success: function (res) {
          console.log("上传成功");
          console.log(res);
          wx.hideLoading();
          wx.redirectTo({
            url: '../setcard',
          })
        },
        fail: function (res) {
          var data = res.data
          console.log("上传失败");
          console.log(res);
        }
      })
    }

  },
  savepicurl1: function () {
    if (this.data.haveChooseImg) {
      this.upPersonImg();
    } else {
      wx.redirectTo({
        url: '../setcard',
      })
    }
  },
  save: function () {
    if (this.data.id == 'picurl') {//如果是更换头像就另外操作
      this.savepicurl1();
      return;
    }

    var that = this;
    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/user!updateUser.jsp',
      data: {
        xcxSession: xcxSession,
        phone: that.data.phone,
        code: that.data.code,
        name: that.data.name,
        wechat: that.data.wechat,
        qq: that.data.qq,
        position: that.data.position,
        userInfo: that.data.userInfo,
        companyId: that.data.companyId,
        teamId: that.data.teamId,
        sex: that.data.sex,
        province: that.data.province,
        city: that.data.city,
        Birthday: that.data.Birthday,
        doit: that.data.doit,
        picurl: that.data.picurl,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("修改成功" + that.data.Birthday);
        console.log(that.data.phone + "修改电话" + that.data.code);
        console.log(res);
        if (res.data.result =='code is error')
        {
          wx.showToast({
            title: '验证码错误',
            icon: 'loading',
            duration: 1000
          })
        } else if (res.data.result == 'phone is error') {
          wx.showToast({
            title: '手机号已存在',
            icon: 'loading',
            duration: 1000
          })
        }else{
        wx.navigateBack({
          delta: 1
        })
        }
      },
      fail: function (res) {
        console.log("修改失败");
        console.log(res);
      },
      complete: function (res) {

      }
    })
  },
  setValue: function (e) {
    var value = e.detail.value;
    if (this.data.id == 'name') {
      this.setData({ name: value,isSure:false });
    }
    if (this.data.id == 'wechat') {
      this.setData({ wechat: value, isSure: false });
    }
    if (this.data.id == 'qq') {
      this.setData({ qq: value, isSure: false });
    }
    if (this.data.id == 'position') {
      this.setData({ position: value, isSure: false});
    }
    if (this.data.id == 'userInfo') {
      this.setData({ userInfo: value, isSure: false });
    }
    if (this.data.id == 'sex') {
      this.setData({ sex: value });
    }
    if (this.data.id == 'area') {
      this.setData({
        province: value[0],
        city: value[1],
      });
    }
    if (this.data.id == 'Birthday') {
      this.setData({ Birthday: value });
    }
    if (this.data.id == 'doit') {
      this.setData({ doit: value, isSure: false });
    }

  },
  onLoad: function (options) {
    console.log("设置页面");
    console.log(options)
    var that = this;
    that.setData({ id: options.id, teamId: options.teamId})
    var that = this;
    setTimeout(function(){
      that.setData({ value: options.value});
    },400);
    if (this.data.id == 'area') {
      this.setData({
        province: '广东省',
        city: '广州市',
      });
    }
    if (this.data.id == 'Birthday') {
      this.setData({ Birthday: '2016-09-01', });
    }
    if (this.data.id == 'sex') {
      this.setData({ sex: '男' });
    }
    if (this.data.id == 'picurl') {
      this.setData({ picurl: options.picurl });
    }

    if (this.data.id == 'name') {
      wx.setNavigationBarTitle({
        title: '编辑姓名',
      })
    }
    if (this.data.id == 'phone') {
      wx.setNavigationBarTitle({
        title: '修改电话',
      })
    }
    if (this.data.id == 'wechat') {
      wx.setNavigationBarTitle({
        title: '编辑微信号',
      })
    }
    if (this.data.id == 'qq') {
      wx.setNavigationBarTitle({
        title: '编辑QQ号',
      })
    }
    if (this.data.id == 'position') {
      wx.setNavigationBarTitle({
        title: '编辑职位',
      })
    }
    if (this.data.id == 'userInfo') {
      wx.setNavigationBarTitle({
        title: '编辑个人介绍',
      })
    }
    if (this.data.id == 'sex') {
      wx.setNavigationBarTitle({
        title: '设置性别',
      })
    }
    if (this.data.id == 'area') {
      wx.setNavigationBarTitle({
        title: '编辑所在区域',
      })
    }
    if (this.data.id == 'Birthday') {
      wx.setNavigationBarTitle({
        title: '编辑生日',
      })
    }
    if (this.data.id == 'doit') {
      wx.setNavigationBarTitle({
        title: '编辑所做业务',
      })
    }

    if (this.data.id == 'picurl') {
      wx.setNavigationBarTitle({
        title: '设置头像',
      })
    }
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