// mydrafts.js
Page({
  data:{
    myarticles:[],
    isTeam:0,
  },
  checkArticle: function (e) {
    console.log(e);
    var id = e.currentTarget.id;
    var ownerId = wx.getStorageSync('myId');
    var that = this;
    wx.navigateTo({
      url: '../articledetailsmag/articledetailsmag?aid=' + id + "&ownerId=" + ownerId + "&isTeam=" + that.data.isTeam +"&draft=1",
    })
  },
  onLoad:function(options){
    this.setData({ ownerId:options.ownerId});
    this.setData({ isTeam: options.isTeam });
    this.getPersonArticle();
  },
  onPullDownRefresh: function () {
    wx.setStorageSync("myDtratfsArticleIndex", "");
    this.setData({ myarticles: [], count: 0 });
    wx.showLoading({
      title: '加载中...',
    })
    this.getPersonArticle();
  },
  onReachBottom: function () {
    
    this.getPersonArticle();

  },
  transFromJsonArticle: function (list) {//转换个人文章json
    var myarticlesTmp = this.data.myarticles;
    for (var i = 0; i < list.length; i++) {
      myarticlesTmp.push(list[i]);
    }
    this.setData({ myarticles: myarticlesTmp });
  },
  onUnload: function () {
    wx.setStorageSync("myDtratfsArticleIndex", "");
  },

  getPersonArticle: function () {
    var myDtratfsArticleIndex = wx.getStorageSync("myDtratfsArticleIndex");
    if (myDtratfsArticleIndex == "") {
      myDtratfsArticleIndex = 1;
      wx.setStorageSync("myDtratfsArticleIndex", 2);
    } else {
      myDtratfsArticleIndex = parseInt(myDtratfsArticleIndex);
      wx.setStorageSync("myDtratfsArticleIndex", myDtratfsArticleIndex + 1);
    }
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/article!pagingList.jsp',
      data: {
        ownerId: that.data.ownerId,
        startIndex: myDtratfsArticleIndex,
        size: 20,
        artType: 2,//个人文章 0、 团队文章 1 查询所有2
        postType: 0,//0为草稿、1为发布
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log("查询个人文章" + myDtratfsArticleIndex);
        console.log(res);
        wx.hideLoading();
        that.setData({ count: res.data.json.count });
        that.transFromJsonArticle(res.data.json.articleList);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
})