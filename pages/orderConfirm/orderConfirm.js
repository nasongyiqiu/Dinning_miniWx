// pages/orderConfirm/orderConfirm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    miniWxId: '',
    id:'',
    order:{}
  },
  btn_submit_order:function(){
    wx.request({
      url: 'https://sys.songna.top:9090/api/open/wx/order/confirm',
      data: {
        'id': this.data.id,
      },
      method: 'post',
      success: function (data) {
        console.log(data);
        if (data.data.code == 200) {
          wx.showToast({
            title: '添加成功',
          })
          wx.navigateTo({
            url: '../order/order',
          })
        }
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({id:options.id})
    var _this = this;
    //获取用户openid
    app.getOpenid().then(function (res) {
      // console.log(res.data.openid)
      _this.setData({ miniWxId: res.data.openid });
       wx.request({
         url: 'https://sys.songna.top:9090/api/open/wx/order/list/detail',
      data:{
        'id':_this.data.id,
        'openId': _this.data.miniWxId
      },
      method:'post',
      success:function(data){
        console.log(data);
        if(data.data.code == 200){
          _this.setData({order:data.data.data})
        }
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
    wx.setNavigationBarTitle({
      title: '确认订单'
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