// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //获取用户openid
    app.getOpenid().then(function (res) {
      // console.log(res.data.openid)
      _this.setData({ miniWxId: res.data.openid });
      //加入购物车
      wx.request({
        url: 'https://sys.songna.top:9090/api/open/wx/shop/car/list',
        data: { "miniWxId": res.data.openid },
        method: 'post',
        success: function (data) {
          console.log(data.data.data.result);
          _this.setData({carts:data.data.data.result})
        }
      })
    })
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
    //这里是我4.25号添加的
    wx.setNavigationBarTitle({
      title: '购物车'
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