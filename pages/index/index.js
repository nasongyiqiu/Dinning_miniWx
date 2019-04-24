//index.js
//获取应用实例
var netManager = require('../../utils/netManager')
const app = getApp()

Page({
  data: {
    id:'',
    motto: 'Hello World',
    userInfo: '',
    name:'',
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
    app.getSetting().then(function(res){
      console.log(res.userInfo,'000000')
      if (res.userInfo) {
        _this.setData({
          name: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    })
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res);
    //     var avatarUrl = 'userInfo.avatarUrl';
    //     var nickName = 'userInfo.nickName';
    //     _this.setData({
    //       [avatarUrl]: res.userInfo.avatarUrl,
    //       [nickName]: res.userInfo.nickName,
    //     })
    //   }
    // })

    
    
  },

  //这里也是我新加的
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  }, 

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
