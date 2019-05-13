// pages/appointment/appointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我的预约'
    });
    var _this = this;
      app.getOpenid().then(function (res) {
        // console.log(res)
        if (res.code == "200") {
          wx.request({
            url: 'https://sys.songna.top:9090/api/open/wx/user/appointment/list',
            data: {
              "openId": res.data.openid,
              "pageIndex": 1
            },
            method: "POST",
            success(data) {
              console.log(data)
              _this.setData({
                listData: data.data.data.result
              })
            }
          })
        }
      })
     
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})