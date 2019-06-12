// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[]
  },
  getList: function () {
    var _this = this;
    app.getOpenid().then(function (res) {
      // console.log(res)
      if (res.code == "200") {
        wx.request({
          url: 'https://sys.songna.top:9090/api/open/wx/order/list',
          data: {
            "openId": res.data.openid,
          },
          method: "POST",
          success(data) {
            
            _this.setData({
              listData: data.data.data.result
            })
            console.log(_this.data.listData)
          }
        })
      }
    })
  },
  orderDetail:function(e){
    // console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+id,
    })
  },
  deleteOrder:function(){
    // wx.request({
    //   url: 'https://sys.songna.top:9090/api/open/wx/order/list',
    //   data: {
    //     "openId": res.data.openid,
    //   },
    //   method: "POST",
    //   success(data) {

    //     _this.setData({
    //       listData: data.data.data.result
    //     })
    //     console.log(_this.data.listData)
    //   }
    // })
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
      title: '我的订单'
    })
    this.getList();
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