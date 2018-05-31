// pages/card/wx-qrcode/wx-qrcode.js
var app = getApp()
Page({
  data:{
    wheight:"",
    picw:"",
    contenth:"",
    buttonw:"",
    buttonpw:"",
   middlep:"",
    userInfo:""
  
  },
  onLoad:function(options){
   
      
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
     var that=this;
      wx.getSystemInfo({
      success: function(res) {
         console.log(res.windowHeight);
         that.setData({
          wheight:res.windowHeight*0.9,

          contenth:res.windowHeight*0.9*0.8,
          middlep:res.windowHeight*0.9*0.8*0.7,
          picw:res.windowHeight*0.9*0.8*0.7*0.8,

          buttonw:res.windowHeight*0.07,
          buttonpw:res.windowHeight*0.03,
          
             });
        console.log(that.data.contenth); 
          }
      })
      //调用应用实例的方法获取全局数据
     app.getUserInfo(function(userInfo){
       //更新数据
       console.log(userInfo);
       that.setData({
         userInfo:userInfo
       })
     })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  getqrcode:function (){
       let qrcode={
         images:"",
         name:"Alun彭先灿",
         provice:"广东",
         city:""
       }
  }
})