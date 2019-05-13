// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodKind:[],
    currentData:'',
    foods:[],
    miniWxId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
     //获取菜系
    wx.request({
      url: 'https://sys.songna.top:9090/api/open/wx/food/kind/list',
      method:'post',
      data:{},
      success:function(data){
        console.log(data.data.data.result);
        _this.setData({foodKind:data.data.data.result});
      }
    })
    
   
    
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    // console.log(e.target)
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
    var fkid = e.target.dataset.current+1;
    wx.request({
      url: 'https://sys.songna.top:9090/api/open/wx/food/detail/list',
      method: 'post',
      data: { "kindId": fkid},
      success: function (data) {
        console.log(data.data.data.result);
        that.setData({ foods: data.data.data.result });
      }
    })

  },
  //获取当前滑块的index
  bindchange: function (e) {
    // console.log(e)
    const that = this;
    var current = e.detail.current;
    that.setData({
      currentData:current
    })
  },
  addcart:function(e){
    const _this = this;
    console.log(e)
    //获取用户openid
    app.getOpenid().then(function (res) {
      // console.log(res.data.openid)
      _this.setData({ miniWxId: res.data.openid });
      //加入购物车
      wx.request({
        url: 'https://sys.songna.top:9090/api/open/wx/shop/car/add',
        data: { "miniWxId": res.data.openid, "id": e.target.dataset.foodid, "num": 1 },
        method: 'post',
        success: function (data) {
          console.log(data);
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
      title: '点餐'
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