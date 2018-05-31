var app=getApp();
Page({
    data:{
      activeIndex: 0,

      checkColorFlag:false,
      colorChoice: 3,
      cg1: '../../../../../../../image/cg1.png',
      cg0: '../../../../../../../image/cg0.png',
      cb1: '../../../../../../../image/cb1.png',
      cb0: '../../../../../../../image/cb0.png',
      cgr1: '../../../../../../../image/cgr1.png',
      cgr0: '../../../../../../../image/cgr0.png',
      cp1: '../../../../../../../image/cp1.png',
      cp0: '../../../../../../../image/cp0.png',
      co1: '../../../../../../../image/co1.png',
      co0: '../../../../../../../image/co0.png',
      cr1: '../../../../../../../image/cr1.png',
      cr0: '../../../../../../../image/cr0.png',
      codecolor:'#212121',
      codeAddr:'',

      picfiles: [],
      codeName:'',
      codeImgName:'',
      isHaveTX:true,

      examUrl:'',
    },
    setCodeImgName:function(e){
        var codeImgName = e.detail.value;
        this.setData({ codeImgName: codeImgName });
    },
    saveCodeByImg:function(){
      var xcxSession = wx.getStorageSync("xcxSession");
      var picfiles = this.data.picfiles;
      var codeImgName = this.data.codeImgName;
      wx.showLoading({
        title: '保存中...',
      })
      wx.uploadFile({
        url: 'https://m.ccyishe.com/page/xcx/twocode!addTwo.jsp',
        filePath: picfiles[0],
        name: "file",
        formData: {
          xcxSession: xcxSession,
          fileFileName: codeImgName,
          displayName: codeImgName,
        },
        success: function (res) {
          console.log(codeImgName+"上传图片二维码成功返回" + picfiles[0]);
          console.log(res);
          wx.hideLoading();
          var obj = JSON.parse(res.data);
          console.log(obj);
          
          wx.redirectTo({
            url: '../../../myfatory/myfatory?needRefresh=1&checkCode=1',
            fail: function (res) {
              console.log("跳转失败");
              console.log(res);
            }
          })
          // wx.redirectTo({
          //   url: '../../../previewCode/previewCode?url=' + obj.json.picUrl + "&id=" + obj.json.cid,
          //   fail:function(res){
          //     console.log("跳转失败");
          //     console.log(res);
          //   }
          // })
        },
        fail: function (res) {
          var data = res.data
          wx.hideLoading();
          console.log("上传图片二维码图片失败");
          console.log(res);
        }
      })
    },

    saveCode:function(){
      var xcxSession = wx.getStorageSync('xcxSession');
      var url = encodeURIComponent(this.data.codeAddr);
      var displayName = this.data.codeName;
      var ishead = this.data.isHaveTX;
      var isheadNum = -1;
      if (ishead){
        isheadNum = 1;
      }else{
        isheadNum = 0;
      }
      var colorTmp = this.data.codecolor;
      var color = colorTmp.replace("#","");
      console.log(xcxSession + "--" + url + "--" + displayName + "--" + isheadNum + "--" + color);
      wx.showLoading({
        title: '保存中...',
      })
      if(url.indexOf("http")<0){
        url = "http://"+url;
      }
      wx.request({
        url: 'https://m.ccyishe.com/page/xcx/twocode!add.jsp',
        data: {
          xcxSession: xcxSession,
          url: url ,
          displayName: displayName ,
          ishead: isheadNum  ,
          color: color,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("保存二维码返回" + url);
          console.log(res);
          wx.hideLoading();
          var obj = res.data;
          console.log(obj);
          wx.redirectTo({
            url: '../../../myfatory/myfatory?needRefresh=1&checkCode=1',
            fail: function (res) {
              console.log("跳转失败");
              console.log(res);
            }
          })
          // wx.redirectTo({
          //   url: '../../../previewCode/previewCode?url=' + obj.json.picUrl + "&id=" + obj.json.cid,
          // })
         
          
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    },
    validateCheck:function(){
      //https://media.ccyishe.com/xcx/images/codeExam/c1.png
    },
    previewCode:function(){
      var codecolor = this.data.codecolor;
      if (codecolor=='#50BC10') {
        this.setData({ examUrl:"https://media.ccyishe.com/xcx/images/codeExam2/c1.png"});
      } else if (codecolor =='#1296DB') {
        this.setData({ examUrl: "https://media.ccyishe.com/xcx/images/codeExam2/c2.png" });
      } else if (codecolor == '#212121') {
        this.setData({ examUrl: "https://media.ccyishe.com/xcx/images/codeExam2/c3.png" });
      } else if (codecolor == '#D4237A') {
        this.setData({ examUrl: "https://media.ccyishe.com/xcx/images/codeExam2/c4.png" });
      } else if (codecolor == '#FF7F00') {
        this.setData({ examUrl: "https://media.ccyishe.com/xcx/images/codeExam2/c5.png" });
      } else if (codecolor == '#D81E06') {
        this.setData({ examUrl: "https://media.ccyishe.com/xcx/images/codeExam2/c6.png" });
      } 
    },
    checkTX:function(e){
      console.log(e);
      var isHaveTX = e.detail.value;
      this.setData({ isHaveTX: isHaveTX});
    },
    setCodeName:function(e){
      var codeName = e.detail.value;
      this.setData({ codeName: codeName});
    },

    choosePic: function (e) {
      var that = this;
      wx.chooseImage({//打开相机/相片
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
         var url = res.tempFilePaths[0];
         console.log(url);
         wx.navigateTo({
           url: '../edit-my-code/edit-my-code?imgUrl='+url,
         })
        }
      })
    },
    setCodeAddr:function(e){//设置二维码网址
      console.log("设置二维码地址");
      console.log(e);
      var codeAddr = e.detail.value;
      if (codeAddr == ""){
        return ;
      }
      this.setData({ codeAddr: codeAddr});
    },

    setcodecolor: function (e) {
      console.log(e);
      var id = e.currentTarget.id;
      if (id == "c1") {
        this.setData({ colorChoice: 1 });
        this.setData({ codecolor: '#50BC10' });
      } else if (id == "c2") {
        this.setData({ colorChoice: 2 });
        this.setData({ codecolor: '#1296DB' });
      } else if (id == "c3") {
        this.setData({ colorChoice: 3 });
        this.setData({ codecolor: '#212121' });
      } else if (id == "c4") {
        this.setData({ colorChoice: 4 });
        this.setData({ codecolor: '#D4237A' });
      } else if (id == "c5") {
        this.setData({ colorChoice: 5 });
        this.setData({ codecolor: '#FF7F00' });
      } else if (id == "c6") {
        this.setData({ colorChoice: 6 });
        this.setData({ codecolor: '#D81E06' });
      }
    },
    checkColor:function(){
      var checkColorFlag = this.data.checkColorFlag;
      this.setData({ checkColorFlag: !checkColorFlag});
    },
    tabClick: function (e) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
      if (e.currentTarget.id == 1) {
        console.log("11");
        // if (this.data.myCode.length == 0) {//只有第一次点击才需要加载
        //   this.getMyCode();
        // }

      }
    },

    onLoad: function (options) {
      if (options.picfile!=undefined){
        var picfiles = [];
        this.setData({
          picfiles: picfiles});
        picfiles.push(options.picfile);
        this.setData({ 
          picfiles: picfiles,
          activeIndex: 1,});
      }

      
      var personImg = wx.getStorageSync('personImg');
      this.setData({ personImg: personImg});
    },
   
})