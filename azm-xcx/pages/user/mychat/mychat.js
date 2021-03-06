Page({
  data: {
    chats: [],
    H: 0,
  },
  openConfirm: function (e) {
    var id = e.target.id;
    var that = this;
    var xcxSession = wx.getStorageSync('xcxSession');
    wx.showModal({
      title: '删除提示',
      content: '是否删除这条咨询',
      confirmText: "确认删除",
      cancelText: "暂不删除",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: 'https://m.ccyishe.com/page/team/teampromo!deleteConsult.jsp',
            data: {
              xcxSession: xcxSession,
              cid: id,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {

            },
            fail: function (res) {

            },
            complete: function (res) {

            }
          })




        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  getNewChatsScroll: function () {
    wx.showLoading({
      title: '加载中',
    })
    var page = wx.getStorageSync('page');
    console.log("触底了" + page);
    var xcxSession = wx.getStorageSync('xcxSession');
    this.getNewChats(xcxSession, parseInt(page));
  },
  checkIs: function (cid) {
    var flag = 0;
    var chats = this.data.chats;
    for (var i = 0; i < chats.length; i++) {
      if (cid == chats[i].cid) {
        flag = 1;
        break;
      }
    }
    return flag;
  },
  tranfromJSON: function (list) {
    var chats = this.data.chats;
    for (var i = 0; i < list.length; i++) {
      var chatObj = {
        cid: list[i].cid,
        createDate: list[i].createDate,
        name: list[i].name,
        province: list[i].province,
        city: list[i].city,
        wechat: list[i].wechat,
        sex: list[i].sex,
        phone: list[i].phone,
        qdesc: list[i].qdesc,
        userId: list[i].userId,
        isDelete: list[i].isDelete
      };
      if (!this.checkIs(chatObj.cid)) {
        chats.push(chatObj);
      }
    }
    this.setData({ chats: chats });
  },
  delLocal: function (id) {
    var chats = this.data.chats;
    for (var i = 0; i < chats.length; i++) {
      if (chats[i].cid == id) {
        chats.splice(i, 1);
        break;
      }
    }
    this.setData({ chats: chats });
  },
  phoneNumTap: function (e){
    var that = this;
    var name = e.currentTarget.dataset.name;
    var id = e.target.id;
    console.log(name);
    
    // 提示呼叫号码还是将号码添加到手机通讯录
    wx.showActionSheet({
      itemList: ['添加联系人'],
      success: function (res) {
        if (res.tapIndex === 1) {
          // 呼叫号码
          wx.makePhoneCall({
            phoneNumber: that.data.phoneNum,
          })
        } else if (res.tapIndex == 0) {
          // 添加到手机通讯录
          wx.addPhoneContact({
            firstName: name,//联系人姓名
            mobilePhoneNumber: id,//联系人手机号
          })
        }
      }
    })
  
  },
  //复制手机和微信号
  copyData:function(e){
    var id = e.currentTarget.id;
    console.log(id);
    wx.setClipboardData({
      data: id,
      success: function (res) {
        console.log(res)
        wx.getClipboardData({
          success: function (res) {
            console.log(res)
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

  del: function (id) {

    var that = this;
    wx.showLoading({
      title: '删除中',
    })
    wx.request({
      url: 'https://m.ccyishe.com/page/xcx/question!delete.jsp',
      data: {
        cid: id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("删除完成");
        console.log(res);
        wx.hideLoading();
        that.delLocal(id);
        wx.showToast({
          title: '已删除',
          icon: 'success',
          duration: 1500
        })

      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  },
  call: function (e) {
    var phone = e.target.id;
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  },
  getNewChats: function (xcxSession, page) {//从服务器拿新的咨询数据
    console.log(xcxSession)
    var that = this;
    wx.request({
      url: 'https://m.ccyishe.com/page/team/teampromo!consultList.jsp',
      data: {
        xcxSession: xcxSession,
        ds: 10,
        pn:1,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("咨询列表");
        console.log(res);
        var newPage = 1 + page;
        console.log(newPage);
        wx.setStorageSync('page', newPage + "");
        that.tranfromJSON(res.data.json.list);

        wx.hideLoading();
        wx.stopPullDownRefresh();

      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    //2
    var ownerId = wx.getStorageSync('myId');
    console.log(ownerId)
    var xcxSession = wx.getStorageSync('xcxSession');
    if (ownerId == "" && xcxSession == "") {//app.js里面的getXcxSession没有执行成功到,需要重新调用一次请求getXcxSession
      app.getXcxSession();
    }
    console.log(this.data.chats)
   
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    //3
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    //4
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var H = res.windowHeight;
        that.setData({ H: H });
      }
    })
    wx.setStorageSync('page', '1');
    var xcxSession = wx.getStorageSync('xcxSession');
    if (xcxSession == "") {
      app.getXcxSession();
      xcxSession = wx.getStorageSync('xcxSession');
    }
    this.getNewChats(xcxSession, 1);
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    //5
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    //6
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    //7
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    //8
  },
  onPullDownRefresh: function () {
    this.setData({ chats: [] });
    wx.setStorageSync('page', '1');
    var xcxSession = wx.getStorageSync('xcxSession');
    this.getNewChats(xcxSession, 1);
  }
})