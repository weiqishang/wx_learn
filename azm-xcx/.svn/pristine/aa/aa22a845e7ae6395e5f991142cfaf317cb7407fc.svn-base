
var compare = function (obj1, obj2) {
  var val1 = obj1.order;
  var val2 = obj2.order;
  if (val1 < val2) {
    return -1;
  } else if (val1 > val2) {
    return 1;
  } else {
    return 0;
  }
};
Page({
  data: {
    // article: [{
    //   "id": 1,
    //   "content": "小米 6?",
    //   "atype": "text",
    //   "style": "background-color:#212121;color:white;font-size:18px;text-align:center;font-weight:normal;",
    //   "order": 1
    // }
    textareaH:0,
    publish:0,
    postType:0,
    isTeam: 0,
    fmpicurl:"",
    article: [],
    editHidden: true,

    fontSize0: '../../../../../image/s0.png',
    fontWeight0: '../../../../../image/b0.png',
    fontColor0: '../../../../../image/a0.png',
    fontBg0: '../../../../../image/bg0.png',
    fontClear0: '../../../../../image/clear0.png',
    fontalign0: '../../../../../image/fontalign0.png',

    fontSize1: '../../../../../image/s1.png',
    fontWeight1: '../../../../../image/b1.png',
    fontColor1: '../../../../../image/a1.png',
    fontBg1: '../../../../../image/bg1.png',
    fontClear1: '../../../../../image/clear1.png',
    fontalign1: '../../../../../image/fontalign1.png',

    textcolor: '#212121',
    bgcolor: '#ffffff',
    textSizeChoose: false,

    fontalignChoose: false,
    textWeightChoose: false,
    textWeight: 'normal',
    fontaligntext: 'left',
    textColorChoose: false,
    fontBgChoose: false,

    sizeChoice: 17,
    colorChoice: 3,
    bgcolorChoice: 0,
    cg1: '../../../../../image/cg1.png',
    cg0: '../../../../../image/cg0.png',
    cb1: '../../../../../image/cb1.png',
    cb0: '../../../../../image/cb0.png',
    cgr1: '../../../../../image/cgr1.png',
    cgr0: '../../../../../image/cgr0.png',
    cgw1: '../../../../../image/cgw1.png',
    cgw0: '../../../../../image/cgw0.png',
    cp1: '../../../../../image/cp1.png',
    cp0: '../../../../../image/cp0.png',
    co1: '../../../../../image/co1.png',
    co0: '../../../../../image/co0.png',
    cr1: '../../../../../image/cr1.png',
    cr0: '../../../../../image/cr0.png',

    _2B2D3A:'../../../../../image/2B2D3A.png',
    _2B2D3A1: '../../../../../image/2B2D3A-1.png',
    _33cc33: '../../../../../image/33cc33.png',
    _33cc331: '../../../../../image/33cc33-1.png',
    _353535: '../../../../../image/353535.png',
    _3535351: '../../../../../image/353535-1.png',
    _626574: '../../../../../image/626574.png',
    _6265741: '../../../../../image/626574-1.png',
    _888888: '../../../../../image/888888.png',
    _8888881: '../../../../../image/888888-1.png',
    _B2B2B2: '../../../../../image/B2B2B2.png',
    _B2B2B21: '../../../../../image/B2B2B2-1.png',
    _FF6666: '../../../../../image/FF6666.png',
    _FF66661: '../../../../../image/FF6666-1.png',

    choiceId: -100,
    delHidden: true,

    inserFlag: false,
    longtapTextFlag: false,
    isSure:true,

    choosedStyle: 'background-color: #09BB07;opacity: 0.7;padding: 10px;text-align:left;font-size:17px;font-weight:normal;',
  defaultStyle: "color:#353535;font-size:17px;font-weight:normal;text-align:left;background-color:white;"

  },
 ReplaceAll:function(str, sptr, sptr1){
    while(str.indexOf(sptr) >= 0) {
      str = str.replace(sptr, sptr1);
    }
                    return str;
  },
  saveImgBeforeSaveArticleByNone: function (saveImgObjPaths,i){
    var that = this;
    if (saveImgObjPaths.length==0){
      that.savaArticleByNone();
      return;
    }


    
    wx.uploadFile({
      url: 'https://m.ccyishe.com/page/upload!pic.jsp',
      filePath: saveImgObjPaths[i],
      name: 'file',
      formData: {
        fileFileName: 'file.png',
      },
      success: function (res) {
        console.log("上传图片成功返回2_1" + saveImgObjPaths[i]);
        console.log(res);
        var url = res.data;

        var articleStr = JSON.stringify(that.data.article);
        var strIndex = articleStr.indexOf(saveImgObjPaths[i]);
        console.log(articleStr);

        //articleStr.replace(saveImgObjPaths[i],url);
        articleStr = that.ReplaceAll(articleStr, saveImgObjPaths[i],url);
        console.log(articleStr);
        that.setData({ article: JSON.parse(articleStr)})
        

        console.log(strIndex+"上传图片成功返回2_2");
        console.log(that.data.article);
        if (i + 1 == saveImgObjPaths.length){
          that.savaArticleByNone();
        }else{
          that.saveImgBeforeSaveArticleByNone(saveImgObjPaths, i+1);
        }

      },
      fail: function (res) {
        var data = res.data
        console.log("上传失败");
        console.log(res);
        wx.showToast({
          title: '保存失败',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },  

  saveImgPathsBeforeSaveArticleByNone:function(){
    wx.showLoading({
      title: '保存中',
    })

    var saveImgObjPaths = [];
    var article = this.data.article;
    for (var i = 0; i < article.length;i++){
      if (article[i].atype == 'img' && article[i].content.indexOf("wxfile:")>-1){
        saveImgObjPaths.push(article[i].content);
      }
    }
    this.saveImgBeforeSaveArticleByNone(saveImgObjPaths,0);//0代表数组第一个元素
  },

  savaArticleByNone:function(){
    console.log("从0开始的保存");
    wx.showLoading({
      title: '保存中',
    })

    var xcxSession = wx.getStorageSync("xcxSession");
    var article = this.data.article;
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!add.jsp',
      data: {
        articleDesc: JSON.stringify(article),
        xcxSession: xcxSession,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("保存文章详情返回");
        console.log(res);
        wx.hideLoading();
        if (res.data.result == "success") {
          wx.hideLoading();
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1000
          })
          
          var fengmian = res.data.json.picurl;
          var title = res.data.json.displayName;
          var dis = res.data.json.smallDesc;
          var cid = res.data.json.cid;
          var isTeam = that.data.isTeam;
          var ownerId = that.data.ownerId;
          setTimeout(function () {
            wx.redirectTo({
              url: '../editBTD/editBTD?fengmian=' + fengmian + "&title=" + title + "&dis=" + dis + "&cid=" + cid + "&isTeam=" + isTeam + "&ownerId=" + ownerId +"&byNone=1",
            })
          }, 100);
        } else if (res.data.result == "notProNumber") {
          wx.navigateTo({
            url: '../../message/message',
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '保存失败',
            icon: 'loading',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },

  saveImgBeforeSaveArticle: function (saveImgObjPaths,i){
    var that = this;
    if (saveImgObjPaths.length == 0) {
      that.savaArticle();
      return;
    }


    
    wx.uploadFile({
      url: 'https://m.ccyishe.com/page/upload!pic.jsp',
      filePath: saveImgObjPaths[i],
      name: 'file',
      formData: {
        fileFileName: 'file.png',
      },
      success: function (res) {
        console.log("上传图片成功返回1_1");
        console.log(res);
        var url = res.data;

        var articleStr = JSON.stringify(that.data.article);
        console.log(articleStr);

        //articleStr.replace(saveImgObjPaths[i],url);
        articleStr = that.ReplaceAll(articleStr, saveImgObjPaths[i], url);
        console.log(articleStr);
        
        that.setData({ article: JSON.parse(articleStr)})
        console.log("上传图片成功返回1_2");
        console.log(that.data.article);

        if (i + 1 == saveImgObjPaths.length){
          that.savaArticle();
        }else{
          that.saveImgBeforeSaveArticle(saveImgObjPaths, i+1);
        }

      },
      fail: function (res) {
        var data = res.data
        console.log("上传失败");
        console.log(res);
        wx.showToast({
          title: '保存失败',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },  

  saveImgPathsBeforeSaveArticle:function(){
    wx.showLoading({
      title: '保存中',
    })

    var saveImgObjPaths = [];
    var article = this.data.article;
    for (var i = 0; i < article.length;i++){
      if (article[i].atype == 'img' && article[i].content.indexOf("wxfile:")>-1){
        saveImgObjPaths.push(article[i].content);
      }
    }
    this.saveImgBeforeSaveArticle(saveImgObjPaths,0);//0代表数组第一个元素
  },

  savaArticle: function () {
    // wx.showLoading({
    //   title: '保存中',
    // })
    var xcxSession = wx.getStorageSync("xcxSession");
    var article = this.data.article;
    console.log("this.data.fmpicurl" + this.data.fmpicurl);
    
    var that = this;
    var postType = this.data.postType;
   
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!modify.jsp',
      data: {
        cid: that.data.cid,
        articleDesc: JSON.stringify(article),
        displayName: '',
        smallDesc: '',
        picurl: '',
        xcxSession: xcxSession,
        artType: 0, //个人文章0、团队文章1、
        postType: postType,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        // 'content-type': 'application/json'
      },
      success: function (res) {
        // success
        console.log("保存文章详情返回6-22");
        console.log(that.data.cid + "----" + xcxSession);
        console.log(res);
        wx.hideLoading();

        if (res.data.result == "success") {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1000
          })
          var fengmian = that.data.fengmian;
          var title = that.data.title;
          var dis = that.data.dis;
          var cid = that.data.cid;
          var isTeam = that.data.isTeam;
          var ownerId = that.data.ownerId;
          setTimeout(function () {
            wx.redirectTo({
              url: '../editBTD/editBTD?cid=' + cid + " &isTeam=" + isTeam + "&ownerId=" + ownerId + "&postType=" + postType + "&fengmian=" + fengmian + "&title=" + title + "&dis=" + dis ,
              success:function(res){
                console.log("成功");
                console.log(res);
              },
              fail:function(res){
                console.log("失败");
                console.log(res);
              }
            })
          }, 100);
        } else if (res.data.result == "notProNumber") {
          wx.navigateTo({
            url: '../../message/message',
          })
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'loading',
            duration: 1000
          })
          wx.hideLoading();
        }



      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  indexEditText: function () {
    var choiceId = this.data.choiceId;
    if (choiceId == -100) {
      wx.showToast({
        title: '请选择要修改的文字',
        icon: 'loading',
        duration: 2000
      })
    } else {

      var obj = this.getContent(choiceId);
      if (obj.atype != "text") {
        wx.showToast({
          title: '请选择要修改的文字',
          icon: 'loading',
          duration: 2000
        })
        return;
      }
      var height = this.data.height;
      this.setData({ textareaH: height - 51 });
      var styleObj = this.getOldStyleObj(obj);//得到原来段落文本的样式
      console.log(styleObj);
      this.setTextareaStyle(styleObj);
      this.setData({
        content: obj.content, editHidden: false,
        inserFlag: false
      });
    }
  },
  insertImg2: function (paths) {
    var choiceId = parseInt(this.data.choiceId);
    console.log("插入的前个id:" + choiceId);
    var content = this.data.content;
    var article = this.data.article;
    //元素向后移动
    var indexTmp = -100;
    for (var i = 0; i < article.length; i++) {
      if (article[i].id == choiceId) {
        indexTmp = i;
        break;
      }
    }
    for (var i = article.length - 1; i > indexTmp; i--) {
      console.log("移动对象");
      console.log(article[i]);
      var id = article[i].id;
      var order = article[i].order;
      article[i].id = id + paths.length;
      article[i].order = order + paths.length;
    }

    //插入
    console.log("插入之前的文章对象：");
    console.log(article);
    for (var i = 0; i < paths.length; i++) {
      var insertObj = {
        id: choiceId + i + 1,
        content: paths[i],
        atype: "img",
        style: '',
        order: choiceId + i + 1,
      };
      article.push(insertObj);
    }



    article.sort(compare);//降序排序
    this.setData({ article: article });
  },
  insertImg: function () {
    var choiceId = this.data.choiceId;
    if (choiceId == -100) {
      wx.showToast({
        title: '请选择要插入的位置',
        icon: 'loading',
        duration: 2000
      })
    } else {//调用插入图片的函数
      this.setData({ inserFlag: true });
      var that = this;
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var paths = res.tempFilePaths;
          that.insertImg2(paths);
        }
      })
    }
  },
  insertText: function () {
    var choiceId = this.data.choiceId;
    if (choiceId == -100) {
      wx.showToast({
        title: '请选择要插入的位置',
        icon: 'loading',
        duration: 2000
      })
    } else {
      this.setData({ editHidden: false, inserFlag: true });
    }
  },

  scrollArticle: function (e) {
    //console.log(e);
    var nowTop = e.detail.scrollTop;
    this.setData({ nowTop: nowTop });
  },
  setChooseOldStyle: function (e) {
    var obj = this.getContent(e.currentTarget.id);
    var styleObj = this.getOldStyleObj(obj);//得到原来段落文本的样式
    console.log(styleObj);
    var textAlign = styleObj.fontaligntext;
    if (textAlign == "center") {
      var choosedStyle = this.data.choosedStyle;
      choosedStyle = choosedStyle.replace("left", "center");
      this.setData({ choosedStyle: choosedStyle });
    } else if (textAlign == "left") {
      var choosedStyle = this.data.choosedStyle;
      choosedStyle = choosedStyle.replace("center", "left");
      this.setData({ choosedStyle: choosedStyle });
    } else if (textAlign == "") {
      var choosedStyle = this.data.choosedStyle;
      console.log("执行了111");
      choosedStyle = choosedStyle.replace("center", "left");
      this.setData({ choosedStyle: choosedStyle });
    }

    var textWeight = styleObj.textWeight;
    if (textWeight == "normal") {
      var choosedStyle = this.data.choosedStyle;
      choosedStyle = choosedStyle.replace("bolder", "normal");
      this.setData({ choosedStyle: choosedStyle });
    } else if (textWeight == "bolder") {
      var choosedStyle = this.data.choosedStyle;
      choosedStyle = choosedStyle.replace("normal", "bolder");
      this.setData({ choosedStyle: choosedStyle });
    } else if (textWeight == "") {
      var choosedStyle = this.data.choosedStyle;
      choosedStyle = choosedStyle.replace("bolder", "normal");
      this.setData({ choosedStyle: choosedStyle });
    }

    var sizeChoice = styleObj.sizeChoice;
    if (sizeChoice == "") {
      sizeChoice = 17;
    }
    var oldFontSize = this.getStyleValue(this.data.choosedStyle, "font-size:");
    console.log("代替后" + oldFontSize);
    var choosedStyle = this.data.choosedStyle;
    choosedStyle = choosedStyle.replace(oldFontSize, sizeChoice);
    this.setData({ choosedStyle: choosedStyle });
  },
  chooseText: function (e) {
    console.log("点击选择文本");
    console.log(e);
    this.setData({ choiceId: e.currentTarget.id });

    this.setChooseOldStyle(e);


  },
  getStyleValue: function (style, styleName) {
    var styleLen = style.length;
    if (styleName == "color:") {
      style = style.replace("background-color:", "");
    }
    var index = style.indexOf(styleName);
    if (index == -1) {
      return '';
    }
    var endIndex = -100;
    for (var i = index; i < styleLen; i++) {
      if (style.substring(i, i + 1) == ";") {
        endIndex = i;
        break;
      }
    }
    if (endIndex == -100) {
      endIndex = styleLen;
    }
    var value = style.substring(index + styleName.length, endIndex);
    return value;
  },
  getOldStyleObj: function (obj) {
    var style = obj.style;
    console.log(style);
    var background_color_value = this.getStyleValue(style, "background-color:");
    var color_value = this.getStyleValue(style, "color:");
    var font_size_value = this.getStyleValue(style, "font-size:");
    var font_weight_value = this.getStyleValue(style, "font-weight:");
    var text_align_value = this.getStyleValue(style, "text-align:");
    console.log("背景颜色：" + background_color_value);
    console.log("字体颜色：" + color_value);
    console.log("字体大小：" + font_size_value);
    console.log("加粗：" + font_weight_value);
    console.log("居中：" + text_align_value);
    var styleObj = {
      textcolor: color_value,
      bgcolor: background_color_value,
      sizeChoice: font_size_value,
      textWeight: font_weight_value,
      fontaligntext: text_align_value,
    };
    return styleObj;
  },
  setTextareaStyle: function (styleObj) {
    if (styleObj.textcolor == "") {
      styleObj.textcolor = "#212121";
    }
    if (styleObj.bgcolor == "") {
      styleObj.bgcolor = "white";
    }
    if (styleObj.sizeChoice == "") {
      styleObj.sizeChoice = "17";
    } else {
      var tmp = styleObj.sizeChoice;
      styleObj.sizeChoice = tmp.replace("px", "");
    }
    if (styleObj.fontaligntext == "") {
      styleObj.fontaligntext = "left";
    }
    if (styleObj.textWeight == "") {
      styleObj.textWeight = "normal";
    }

    //根据样式设置编辑框的选项
    if (styleObj.fontaligntext == 'center') {
      this.setData({ fontalignChoose: true, fontaligntext: styleObj.fontaligntext, });
    } else {
      this.setData({ fontalignChoose: false, fontaligntext: styleObj.fontaligntext, });
    }

    if (styleObj.textWeight == 'bolder') {
      this.setData({ textWeightChoose: true, textWeight: styleObj.textWeight });
    } else {
      this.setData({ textWeightChoose: false, textWeight: styleObj.textWeight });
    }

    if (styleObj.textcolor == "#ffffff") {
      this.setData({ colorChoice: 0 });
    } else if (styleObj.textcolor == "#50BC10") {
      this.setData({ colorChoice: 1 });
    } else if (styleObj.textcolor == "#1296DB") {
      this.setData({ colorChoice: 2 });
    } else if (styleObj.textcolor == "#212121") {
      this.setData({ colorChoice: 3 });
    } else if (styleObj.textcolor == "D4237A") {
      this.setData({ colorChoice: 4 });
    } else if (styleObj.textcolor == "#FF7F00") {
      this.setData({ colorChoice: 5 });
    } else if (styleObj.textcolor == "#D81E06") {
      this.setData({ colorChoice: 6 });
    } else if (styleObj.textcolor == "#2B2D3A") {
      this.setData({ colorChoice: 7});
    } else if (styleObj.textcolor == "#33cc33") {
      this.setData({ colorChoice: 8});
    } else if (styleObj.textcolor == "#353535") {
      this.setData({ colorChoice: 9});
    } else if (styleObj.textcolor == "#626574") {
      this.setData({ colorChoice: 10});
    } else if (styleObj.textcolor == "#888888") {
      this.setData({ colorChoice: 11});
    } else if (styleObj.textcolor == "#B2B2B2") {
      this.setData({ colorChoice: 12});
    } else if (styleObj.textcolor == "#FF6666") {
      this.setData({ colorChoice: 13});
    }

    if (styleObj.bgcolor == "#ffffff") {
      this.setData({ bgcolorChoice: 0 });
    } else if (styleObj.bgcolor == "#50BC10") {
      this.setData({ bgcolorChoice: 1 });
    } else if (styleObj.bgcolor == "#1296DB") {
      this.setData({ bgcolorChoice: 2 });
    } else if (styleObj.bgcolor == "#212121") {
      this.setData({ bgcolorChoice: 3 });
    } else if (styleObj.bgcolor == "D4237A") {
      this.setData({ bgcolorChoice: 4 });
    } else if (styleObj.bgcolor == "#FF7F00") {
      this.setData({ bgcolorChoice: 5 });
    } else if (styleObj.bgcolor == "#D81E06") {
      this.setData({ bgcolorChoice: 6 });
    } else if (styleObj.bgcolor == "#2B2D3A") {
      this.setData({ bgcolorChoice: 7 });
    } else if (styleObj.bgcolor == "#33cc33") {
      this.setData({ bgcolorChoice: 8 });
    } else if (styleObj.bgcolor == "#353535") {
      this.setData({ colorChoice: 9 });
    } else if (styleObj.bgcolor == "#626574") {
      this.setData({ bgcolorChoice: 10 });
    } else if (styleObj.bgcolor == "#888888") {
      this.setData({ bgcolorChoice: 11 });
    } else if (styleObj.bgcolor == "#B2B2B2") {
      this.setData({ bgcolorChoice: 12 });
    } else if (styleObj.bgcolor == "#FF6666") {
      this.setData({ bgcolorChoice: 13 });
    }
    this.setData({
      sizeChoice: styleObj.sizeChoice,
      textColorChoose: false,
      fontBgChoose: false,

      textcolor: styleObj.textcolor,
      bgcolor: styleObj.bgcolor,
    });
  },
  longtapText: function (e) {
    console.log("长按编辑文本");
    this.setData({ choiceId: e.currentTarget.id });
    var obj = this.getContent(e.currentTarget.id);
    var styleObj = this.getOldStyleObj(obj);//得到原来段落文本的样式
    console.log(styleObj);
    this.setTextareaStyle(styleObj);
    var height = this.data.height;
    this.setData({ textareaH: height - 51 });
    this.setData({
      content: obj.content, editHidden: false,
      choiceId: e.currentTarget.id, longtapTextFlag: true
    });
  },
  delFast: function (e) {
    var id = e.currentTarget.id;
    var article = this.data.article;
    var obj = undefined;
    for (var i = 0; i < article.length; i++) {
      if (article[i].id == id) {
        article.splice(i, 1);
        break;
      }
    }
    this.setData({ article: article });
  },
  indexDelFast: function () {
    var delHidden = this.data.delHidden;
    this.setData({ delHidden: !delHidden });
  },
  longTapArticle: function () {
    this.setData({ delHidden: false });
    
  },
  setSure:function(e){
    this.setData({ isSure: false});
  },
  setEditContent: function (e) {//根据输入设置回复内容
    console.log(e);
  
    var content = e.detail.value;
    this.setData({ isSure:true,content: content });
  },
  confirmDelImg: function (id) {
    var article = this.data.article;
    var obj = undefined;
    for (var i = 0; i < article.length; i++) {
      if (article[i].id == id) {
        article.splice(i, 1);
        break;
      }
    }
    this.setData({ article: article });
  },
  finish: function () {
    this.setData({ delHidden: true, choiceId: -100 });
  },
  editImg: function (e) {
    var id = e.currentTarget.id;
    this.setData({ choiceId: e.currentTarget.id });

    this.setData({ inserFlag: true });
    // var that = this;
    // wx.showModal({
    //   title: '删除提示',
    //   content: '是否删除这张图片',
    //   confirmText: "确认删除",
    //   cancelText: "暂不删除",
    //   success: function (res) {
    //     console.log(res);
    //     if (res.confirm) {
    //       that.confirmDelImg(id);
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // });
  },
  setNewArticle: function (style) {
    if (this.data.inserFlag) {//插入
      var choiceId = parseInt(this.data.choiceId);
      console.log("插入的前个id:" + choiceId);
      var content = this.data.content;
      var article = this.data.article;
      var insertObj = {
        id: choiceId + 1,
        content: content,
        atype: "text",
        style: style,
        order: choiceId + 1,
      };

      var indexTmp = -100;
      for (var i = 0; i < article.length; i++) {
        if (article[i].id == choiceId) {
          indexTmp = i;
          break;
        }
      }
      for (var i = indexTmp + 1; i < article.length; i++) {
        var id = article[i].id;
        var order = article[i].order;
        article[i].id = id + 1;
        article[i].order = order + 1;
      }
      console.log("插入之前的文章对象：");
      console.log(article);
      article.push(insertObj);

      article.sort(compare);//降序排序
      this.setData({ article: article });

    } else {//修改
      var choiceId = this.data.choiceId;
      var article = this.data.article;
      var content = this.data.content;
      var obj = undefined;
      for (var i = 0; i < article.length; i++) {
        if (article[i].id == choiceId) {
          article[i].style = style;
          article[i].content = content;
          break;
        }
      }
      this.setData({ article: article });
    }
  },
  comfirmEdit: function () {//确定提交编辑
    this.setData({ editHidden: true });
    var style = "color:" + this.data.textcolor + ";font-size:" + this.data.sizeChoice + "px;font-weight:" + this.data.textWeight + ";text-align:" + this.data.fontaligntext + ";background-color:" + this.data.bgcolor;
    if (this.data.bgcolor != '#ffffff') {
      style = style + ";padding:5px;"
    }
    this.setNewArticle(style);
    this.setData({ content: "", choiceId: -100, inserFlag: false, longtapTextFlag: false });
    this.setData({
      textcolor: '#212121',
      bgcolor: '#ffffff',
      sizeChoice: 17,
      textWeightChoose: false,
      textWeight: 'normal',
      textColorChoose: false,
      fontBgChoose: false,
      colorChoice: 3,
      bgcolorChoice: 0,
      fontalignChoose: false,
      fontaligntext: 'left',
      inserFlag:false
    });
  },
  setTextSize: function (e) {
    console.log(e);
    var id = e.currentTarget.id;
    if (id == "s12") {
      this.setData({ sizeChoice: 12 });
    } else if (id == "s14") {
      this.setData({ sizeChoice: 14 });
    } else if (id == "s17") {
      this.setData({ sizeChoice: 17 });
    } else if (id == "s18") {
      this.setData({ sizeChoice: 18 });
    } else if (id == "s20") {
      this.setData({ sizeChoice: 20 });
    } else if (id == "s22") {
      this.setData({ sizeChoice: 22 });
    } else if (id == "s24") {
      this.setData({ sizeChoice: 24 });
    }
  },
  setTextColor: function (e) {
    console.log(e);
    var id = e.currentTarget.id;
    if (id == "c0") {
      this.setData({ colorChoice: 0 });
      this.setData({ textcolor: '#ffffff' });
    } else if (id == "c1") {
      this.setData({ colorChoice: 1 });
      this.setData({ textcolor: '#50BC10' });
    } else if (id == "c2") {
      this.setData({ colorChoice: 2 });
      this.setData({ textcolor: '#1296DB' });
    } else if (id == "c3") {
      this.setData({ colorChoice: 3 });
      this.setData({ textcolor: '#212121' });
    } else if (id == "c4") {
      this.setData({ colorChoice: 4 });
      this.setData({ textcolor: '#D4237A' });
    } else if (id == "c5") {
      this.setData({ colorChoice: 5 });
      this.setData({ textcolor: '#FF7F00' });
    } else if (id == "c6") {
      this.setData({ colorChoice: 6 });
      this.setData({ textcolor: '#D81E06' });
    } else if (id == "2B2D3A") {
      this.setData({ colorChoice: 7 });
      this.setData({ textcolor: '#2B2D3A' });
    } else if (id == "33cc33") {
      this.setData({ colorChoice: 8 });
      this.setData({ textcolor: '#33cc33' });
    } else if (id == "353535") {
      this.setData({ colorChoice: 9 });
      this.setData({ textcolor: '#353535' });
    } else if (id == "626574") {
      this.setData({ colorChoice: 10 });
      this.setData({ textcolor: '#626574' });
    } else if (id == "888888") {
      this.setData({ colorChoice: 11 });
      this.setData({ textcolor: '#888888' });
    } else if (id == "B2B2B2") {
      this.setData({ colorChoice: 12 });
      this.setData({ textcolor: '#B2B2B2' });
    } else if (id == "FF6666") {
      this.setData({ colorChoice: 13 });
      this.setData({ textcolor: '#FF6666' });
    } 
  },
  setBg: function (e) {
    console.log(e);
    var id = e.currentTarget.id;
    if (id == "c0") {
      this.setData({ bgcolorChoice: 0 });
      this.setData({ bgcolor: '#ffffff' });
    } else if (id == "c1") {
      this.setData({ bgcolorChoice: 1 });
      this.setData({ bgcolor: '#50BC10' });
    } else if (id == "c2") {
      this.setData({ bgcolorChoice: 2 });
      this.setData({ bgcolor: '#1296DB' });
    } else if (id == "c3") {
      this.setData({ bgcolorChoice: 3 });
      this.setData({ bgcolor: '#212121' });
    } else if (id == "c4") {
      this.setData({ bgcolorChoice: 4 });
      this.setData({ bgcolor: '#D4237A' });
    } else if (id == "c5") {
      this.setData({ bgcolorChoice: 5 });
      this.setData({ bgcolor: '#FF7F00' });
    } else if (id == "c6") {
      this.setData({ bgcolorChoice: 6 });
      this.setData({ bgcolor: '#D81E06' });
    } else if (id == "2B2D3A"){
      this.setData({ bgcolorChoice: 7 });
      this.setData({ bgcolor: '#2B2D3A' });
    } else if (id == "33cc33") {
      this.setData({ bgcolorChoice: 8 });
      this.setData({ bgcolor: '#33cc33' });
    } else if (id == "353535") {
      this.setData({ bgcolorChoice: 9 });
      this.setData({ bgcolor: '#353535' });
    } else if (id == "626574") {
      this.setData({ bgcolorChoice: 10 });
      this.setData({ bgcolor: '#626574' });
    } else if (id == "888888") {
      this.setData({ bgcolorChoice: 11 });
      this.setData({ bgcolor: '#888888' });
    } else if (id == "B2B2B2") {
      this.setData({ bgcolorChoice: 12 });
      this.setData({ bgcolor: '#B2B2B2' });
    } else if (id == "FF6666") {
      this.setData({ bgcolorChoice: 13 });
      this.setData({ bgcolor: '#FF6666' });
    } 
  },
  setYangShi: function (e) {
    console.log(e);
    var id = e.currentTarget.id;

    if (id == "fontSize0") {
      var textSizeChoose = this.data.textSizeChoose;
      this.setData({ textSizeChoose: !textSizeChoose });
      this.setData({ textColorChoose: false, fontBgChoose: false });
      var height = this.data.height;
      this.setData({ textareaH: height - 51 - 41});
    } else if (id == "fontWeight") {
      var height = this.data.height;
      this.setData({ textareaH: height - 51 });
      var textWeightChoose = this.data.textWeightChoose;
      if (!textWeightChoose) {
        this.setData({ textWeight: 'bolder' });
      } else {
        this.setData({ textWeight: 'normal' });
      }
      this.setData({ textColorChoose: false, fontBgChoose: false, textSizeChoose: false });
      this.setData({ textWeightChoose: !textWeightChoose });
    } else if (id == "fontColor") {
      this.setData({ textSizeChoose: false, fontBgChoose: false });
      var textColorChoose = this.data.textColorChoose;
      this.setData({ textColorChoose: !textColorChoose });
      var height = this.data.height;
      if (textColorChoose) {
        this.setData({ textareaH: height - 51 });
      } else {
        this.setData({ textareaH: height - 51 - 82 });
      }
    } else if (id == "fontBg") {
      this.setData({ textColorChoose: false, textSizeChoose: false });
      var fontBgChoose = this.data.fontBgChoose;
      this.setData({ fontBgChoose: !fontBgChoose });
      var height = this.data.height;
      if (fontBgChoose){
        this.setData({ textareaH: height - 51});
      }else{
        this.setData({ textareaH: height - 51 - 82 });
      }
      
    } else if (id == "fontalign") {
      var height = this.data.height;
      this.setData({ textareaH: height - 51 });
      var fontalignChoose = this.data.fontalignChoose;
      if (!fontalignChoose) {
        this.setData({ fontaligntext: 'center' });
      } else {
        this.setData({ fontaligntext: 'left' });
      }
      this.setData({ textColorChoose: false, fontBgChoose: false, textSizeChoose: false });
      this.setData({ fontalignChoose: !fontalignChoose });
    } else if (id == "clear") {
      this.setData({ textColorChoose: false, fontBgChoose: false, textSizeChoose: false });
      this.setData({ content: '' });
    }
  },
  editViewHidden: function () {//让回复的界面隐藏
    this.setData({ editHidden: true });
    this.setData({ content: "", choiceId: -100, inserFlag: false, longtapTextFlag: false });
    this.setData({
      textcolor: '#212121',
      bgcolor: '#ffffff',
      sizeChoice: 17,
      textWeightChoose: false,
      textWeight: 'normal',
      textColorChoose: false,
      fontBgChoose: false,
      colorChoice: 3,
      bgcolorChoice: 0,
      fontalignChoose: false,
      fontaligntext: 'left',
    });
  },
  getContent: function (id) {
    var article = this.data.article;
    var obj = undefined;
    for (var i = 0; i < article.length; i++) {
      if (article[i].id == id) {
        obj = article[i];
        break;
      }
    }
    return obj;
  },

  initSystem: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth;
        var height = res.windowHeight;
        that.setData({ width: width, height: height });
        that.setData({ textareaH:height-51});
      }
    })
  },
  transFromJsonArticle: function (article) {
    this.setData({ article: article });
  },
  initArticleData: function (addr) {
    var that = this;

    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!getwxart.jsp',
      data: {
        xcxSession: that.data.xcxSession,
        url: addr,
        //url: 'http://mp.weixin.qq.com/s/8LOOMCjv19j-qoSNl-ijBQ',
        //url: 'http://mp.weixin.qq.com/s/_TBTC66HgQAFTmo580Elkg',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        // successs
        console.log("地址查询文章返回" + that.data.xcxSession);
        console.log(res);
        if (res.data.json.articleDesc != undefined) {

          var article = res.data.json.articleDesc;


          that.setData({
            fengmian: res.data.json.picurl,
            title: res.data.json.displayName,
            dis: res.data.json.smallDesc,
            cid: res.data.json.cid,
            postType: res.data.json.postType
          });

          that.transFromJsonArticle(res.data.json.articleDesc);

          wx.hideLoading();
        } else {

          wx.showToast({
            title: '文章链接有误',
            icon: 'loading',
            duration: 2000
          })
        }

      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

  },
  getArticleByArr: function (addr) {//点赞操作的时候，先获取点赞者的id
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    that.setData({ xcxSession: xcxSession });
    that.initArticleData(addr);
  },
  tranFromJsonArticle: function (article) {
    var that = this;
    that.setData({
      fengmian: article.picurl,
      title: article.displayName,
      dis: article.smallDesc
    });
    this.setData({ article: article.articleDesc });
    // wx.setStorageSync("newTest", article.articleDesc);
    // WxParse.wxParse("editArticle", 'html', article.articleDesc, that, 5);
  },
  getArticleById: function (aid) {
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!articleDesc.jsp',
      data: {
        cid: aid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询文章详情返回");
        console.log(res);
        wx.hideLoading();
        that.setData({ postType: res.data.json.article.postType});
        that.tranFromJsonArticle(res.data.json.article);


      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  setArticleDataByArr:function(options){
    var articleDesc = wx.getStorageSync("articleDesc");
   
    this.setData({
      fengmian: options.picurl,
      fmpicurl: options.picurl,
      title: options.displayName,
      dis: options.smallDesc,
      cid: options.cid,
      postType: options.postType,
      article: articleDesc
    });

    wx.hideLoading();
  },
  onLoad: function (options) {
    var that = this;
    console.log("onload参数" + options);
    //options.publish = 1;
    console.log(options);
    this.initSystem();
   // https://m.ccyishe.com/page/xcx/article!articleDesc.jsp
   
  
    this.setData({ isTeam: options.isTeam, ownerId: options.ownerId });
    if (options.publish != undefined) {
      var article = [{
        "id": 1,
        "content": "段落一：点击可开始编辑",
        "atype": "text",
        "style": "text-align:center;",
        "order": 1
      }];

      this.setData({ article: article, publish:1});
      return;
    }

        
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!articleDesc.jsp',
      data: {
        cid: options.aid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.json.article.addr != undefined) {
          //this.getArticleByArr(options.addr);
          that.setArticleDataByArr(res.data.json.article);
        } else if (options.aid != undefined) {
          that.setData({ cid: options.aid });
          that.getArticleById(options.aid);
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

   


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

  },
})