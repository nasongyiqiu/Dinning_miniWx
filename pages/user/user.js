//index.js
//获取应用实例
var netManager = require('../../utils/netManager')
const app = getApp()

Page({
  data: {
    id: '',
    motto: 'Hello World',
    userInfo: '',
    avatar: null,
    name: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderArray:[]

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    console.log(app.globalData.userInfo);
    this.setData({
      name: app.globalData.userInfo.nickName,
      avatar: app.globalData.userInfo.avatarUrl
    })
    var _this = this;
    app.getOpenid().then(function (res) {
      // console.log(res)
      if (res.code == "200") {
        wx.request({
          url: 'https://sys.songna.top:9090/api/open/wx/user/login',
          data: { wxMiniId: res.data.openid },
          method: "POST",
          success(data) {
            // console.log(data.data.data.id)
            _this.setData({
              id: data.data.data.id
            })
          }
        })
      }
    })
    wx.request({
      url: 'https://sys.songna.top:9090/api/private/order/list',
      data: {
        "pageSize": 10,
        "pageIndex": 1 },
      method: "POST",
      success(data) {
        console.log(data)
        // _this.setData({
        //   id: data.data.data.id
        // })
      }
    })

  },

  //这里也是我新加的
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },



  //以下是4.23新添加的
  //意见反馈
  toOrder: function () {
    wx.navigateTo({
      url: "../order/order"
    });
  },
  toAppointment(){
    wx.navigateTo({
      url: '../appointment/appointment',
    })
  },
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
