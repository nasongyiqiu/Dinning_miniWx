//index.js
//获取应用实例
var netManager = require('../../utils/netManager')
const app = getApp()

Page({
  data: {
    id:'',
    motto: 'Hello World',
    userInfo: '',
    avatar: null,
    name: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    
    var _this = this;
    app.getOpenid().then(function(res){
      console.log(res)
      if(res.code == "200"){
        wx.request({
          url: 'https://sys.songna.top:9090/api/open/wx/user/login',
          data: { wxMiniId: res.data.openid },
          method: "POST",
          success(data) {
            console.log(data.data.data.id)
            _this.setData({
              id:data.data.data.id
            })
          }
        })
      }
    })
    
    
  },

  //这里也是我新加的
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  }, 

  getUserInfo: function(e) {
    // console.log("这里我获取到")
    
    // app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      avatar: e.detail.userInfo.avatarUrl,
      name: e.detail.userInfo.nickName,
      hasUserInfo: true
    });
    console.log(e, this.data.avatar)
    wx.request({
      url: 'https://sys.songna.top:9090/api/open/wx/user/info/check',
      data: { avatar: this.data.avatar, city: e.detail.userInfo.city, country: e.detail.userInfo.country, gender: e.detail.userInfo.gender, language: e.detail.userInfo.language, nickname: this.data.name, province: e.detail.userInfo.province,userId:this.data.id},
      method:'post',
      success:function(data){
        console.log(data);
      }
    })

  },

    
    //以下是4.23新添加的
    toAboutUs: function () {
      wx.navigateTo({
        url: "../aboutUs/aboutUs"
      });
    },
    //意见反馈
    toFeedback: function () {
      wx.navigateTo({
        url: "../feedback/feedback?orderId=0"
      });
    },
    //协议
    showAgreement: function () {
      wx.navigateTo({
        url: "../webview/agreement/agreement"
      });
    },

    //客服电话
  phoneCall: function () {
    netManager.makePhoneCall('18839159126')
  }


})
