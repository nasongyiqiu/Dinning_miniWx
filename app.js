//app.js

App({
  globalData:{
    openid:'',
    userInfo:'',
    
  },
  getOpenid:function(){
     var that = this;
     return new Promise(function(resolve,reject){
       // 登录
       wx.login({

         success: res => {
          //  console.log(res);
           if(res.code){
             // 发送 res.code 到后台换取 openId, sessionKey, unionId
             wx.request({
               url: 'https://sys.songna.top:9090/api/open/wx/auth?code=' + res.code,

               method: 'post',
               success: function (res) {
                
                resolve(res.data);
               }
             })
           }else{
             console.log('获取用户登录状态失败');
             reject('error');
           }
           
         }
       })
     })
   },
  
  
  
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    
    
    // 获取用户信息
    return new Promise(function (resolve, reject) {
      wx.getSetting({
        success: res => {
          // console.log(res)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                // console.log(res.rawData)
                that.globalData.userInfo = res.rawData
                resolve(res)
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (that.userInfoReadyCallback) {
                  that.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    })
  },
  globalData: {
    userInfo: null
  }
})