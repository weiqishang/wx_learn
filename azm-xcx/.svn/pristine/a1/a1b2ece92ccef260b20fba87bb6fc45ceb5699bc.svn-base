// pages/user/setcard/my-team/my-team.js
Page({
  data: {
    teamInfo: [],
    belongCom: '',
    companyId: '',
  },
  initWH: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ W: res.windowWidth, H: res.windowHeight });
      }
    })
  },
  teamIn:function(){
    wx.navigateTo({
      url: '../../team/team',
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let belongCom = options.belongCom;
    if (belongCom != undefined) {
      var ss = belongCom.split("_");
      this.setData({ belongCom: ss[1], companyId: ss[0] });
    }
  },
  checkTeam: function (e) {
    var teamId = e.target.id;
    var teamName = undefined;
    let teamInfo = this.data.teamInfo;
    for (var i = 0; i < teamInfo.length; i++) {
      teamInfo[i].check = 0;
    }
    for (var i = 0; i < teamInfo.length; i++) {
      if (teamInfo[i].teamId == teamId) {
        teamInfo[i].check = 1;
        teamName = teamId+"_"+teamInfo[i].teamName;
        break;
      }
    }
    this.setData({ teamInfo: teamInfo });
    var that = this;
    var belongCom = that.data.companyId + "_" + that.data.belongCom;

    var ss = teamName.split("_");
    //this.setData({ team: ss[1], teamId: ss[0] });

    var xcxSession = wx.getStorageSync("xcxSession");
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/user!updateUser.jsp',
      data: {
        xcxSession: xcxSession,
        phone: '',
        code: '',
        name: '',
        wechat: '',
        qq: '',
        position: '',
        userInfo: '',
        companyId: '',
        teamId: ss[0],
        sex: '',
        province: '',
        city: '',
        Birthday: '',
        doit: '',
        picurl: '',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log( "修改成功" + ss[0]);
        console.log(res);
        wx.navigateBack({
          delta: 1
        })
        // wx.navigateTo({
        //   url: '../setcard?teamName=' + teamName + "&belongCom=" + belongCom
        // })
      },
      fail: function (res) {
        console.log("修改失败");
        wx.navigateBack({
          delta: 1
        })
        // wx.navigateTo({
        //   url: '../setcard?teamName=' + teamName + "&belongCom=" + belongCom
        // })
      },
      complete: function (res) {

      }
    })
    
  },
  transFormJson: function (list) {
    var teamInfo = this.data.teamInfo;
    for (var i = 0; i < list.length; i++) {
      var obj = {
        teamImg: list[i].picUrl1,
        teamName: list[i].displayName,
        teamIntru: list[i].teamInfo,
        teamId: list[i].cid,
        check: 0,
      }
      teamInfo.push(obj);
    }
    this.setData({teamInfo:teamInfo});
  },
  getSetTeamInfoFromService: function () {
    var that = this;

    console.log("公司id:"+that.data.companyId);
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/team!list.jsp',
      data: {
        companyId: that.data.companyId,
      },
      method: 'GET',
      success: function (res) {
        console.log("团队数据");
        console.log(res.data.json);
        that.transFormJson(res.data.json);
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  },
  getTeamInfo: function () {
    //
    this.getSetTeamInfoFromService();

    // let teamInfo = [{
    //   teamId: 0,
    //   teamImg: '../../../images/ct.jpg',
    //   teamName: '九极易成国际系统',
    //   teamIntru: '一台电脑，一个手机轻松创业',
    //   check: 0,
    // }];
    // //TODO从服务器拿团队数据
    // this.setData({ : teamInfo });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getTeamInfo();
    this.initWH();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})