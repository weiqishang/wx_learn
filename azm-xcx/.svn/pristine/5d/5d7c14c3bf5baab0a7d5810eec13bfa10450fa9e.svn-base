Page({
    data: {
        pBookScrollHeight: 0,
        inputShowed: false,
        inputVal: "",
        itemHidden: false,
        cengHidden: true,
        team: '',
        pBooK: [],
        companyId:undefined,
    },
    initWH:function(){
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({ W: res.windowWidth, H: res.windowHeight});
        }
      })
    },
    setCom: function (e) {
        var id = e.currentTarget.id;
        var comid = id.split("_");
        console.log(comid[0] +"---"+this.data.companyId);
        if (this.data.companyId != undefined && this.data.companyId != comid[0]){
          console.log("设置团队数据为空");
          this.setData({ team:""});
        }
        var that = this;

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
            companyId: comid[0],
            teamId: '',
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
            console.log(comid[0]+"修改成功"+id);
            console.log(res);
            console.log(that.data.team);
            wx.navigateBack({
              delta: 1
            })
            // wx.navigateTo({
            //   url: "../setcard?belongCom=" + id + "&teamName=" + that.data.team
            // });
          },
          fail: function (res) {
            console.log("修改失败");
            wx.navigateBack({
              delta: 1
            })
            // wx.navigateTo({
            //   url: "../setcard?belongCom=" + id + "&teamName=" + that.data.team
            // });
          },
          complete: function (res) {

          }
        })

        
    },
    searchAndSetNewPeopleList: function (value) {
        console.log(value);
        let oldList = this.data.pBooK;
        var flag = false;
        for (var i = 0; i < oldList.length; i++) {
            let zuflag = false;
            for (var j = 0; j < oldList[i].coms.length; j++) {
                var perObj = oldList[i].coms[j];
                let rowflag = false;
                if ((perObj.cName.indexOf(value) >= 0)) {
                    oldList[i].hidden = false;
                    oldList[i].coms[j].hidden = false;
                    zuflag = true;
                    rowflag = true;
                } else if (!rowflag) {
                    oldList[i].coms[j].hidden = true;
                }
                if (((j + 1) == oldList[i].coms.length) && (!zuflag)) {
                    oldList[i].hidden = true;
                }
            }
        }
        console.log(oldList);
        this.setData({ pBooK: oldList });
    },
    searchPerson: function (e) {
        if (e.detail.value == "") {
            this.setData({ cengHidden: false });
        } else {
            this.setData({ cengHidden: true });
            let nowh = this.data.wh - 60;
            this.setData({ pBookScrollHeight: nowh });
            this.searchAndSetNewPeopleList(e.detail.value);
        };
    },
    inputFocus: function () {
        this.setData({ itemHidden: true });
        this.setData({ cengHidden: false });
        let nowh = this.data.wh - 60;
        this.setData({ pBookScrollHeight: nowh });
    },
    setComObjTool: function (zubie, list) {
        if (list.length != 0) {
            var pBooK = this.data.pBooK;
            //console.log("服务器公司数据");
            //console.log(list);
            var obj = { zubie: zubie, coms: [], hidden: false };
            for (var i = 0; i < list.length; i++) {
                var comObjTmp = {
                    cName: list[i].smallName,
                    cid: list[i].cid,
                    hidden: false
                }
                obj.coms.push(comObjTmp);
            }
            pBooK.push(obj);
            this.setData({ pBooK: pBooK });
        }

    },
    setComObj: function (listObj) {

        var list = listObj.json.list;
        this.setComObjTool("A", list.A);
        this.setComObjTool("B", list.B);
        this.setComObjTool("C", list.C);
        this.setComObjTool("D", list.D);
        this.setComObjTool("E", list.E);
        this.setComObjTool("F", list.F);
        this.setComObjTool("G", list.G);
        this.setComObjTool("H", list.H);
        this.setComObjTool("I", list.I);
        this.setComObjTool("J", list.J);
        this.setComObjTool("K", list.K);
        this.setComObjTool("L", list.L);
        this.setComObjTool("M", list.M);
        this.setComObjTool("N", list.N);
        this.setComObjTool("O", list.O);
        this.setComObjTool("P", list.P);
        this.setComObjTool("Q", list.Q);
        this.setComObjTool("R", list.R);
        this.setComObjTool("S", list.S);
        this.setComObjTool("T", list.T);
        this.setComObjTool("U", list.U);
        this.setComObjTool("V", list.V);
        this.setComObjTool("W", list.W);
        this.setComObjTool("X", list.X);
        this.setComObjTool("Y", list.Y);
        this.setComObjTool("Z", list.Z);
    },
    getSetPBookFromService: function () {
        var that = this;
        wx.request({
            url: 'https://m.ccyishe.com/page/xcx/company!list.jsp',
            data: {},
            method: 'GET',
            success: function (res) {
                console.log("公司数据");
                console.log(res.data);
                that.setComObj(res.data);
            },
            fail: function (res) {

            },
            complete: function (res) {

            }
        })
    },
    getAndSetPBook: function () {
        //TODO 从服务器拿该客户的通讯录信息
        this.getSetPBookFromService();
    },
    onLoad: function (options) {
        console.log("选择公司页面：" + options.team);
        if (options.companyId!=undefined){
          this.setData({ companyId: options.companyId});
        }
        this.setData({ team: options.team });
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({ itemHidden: false });
        this.setData({ cengHidden: true });
        this.getAndSetPBook();

        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    setSystem: function () {//得到系统的信息
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let pBookScrollHeight = wh - 206;

                this.setData({
                    pBookScrollHeight: pBookScrollHeight,
                    wh: wh,
                });
            }
        })
    },

    onShow: function () {
        // 页面显示
        if (this.data.pBookScrollHeight == 0) {
            this.setSystem();
        }
        this.getAndSetPBook();
        this.initWH();
    }
});