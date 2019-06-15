// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    totalPrice:0,
    miniWxId:'',
    ids:[]
  },
  //多选框选择按钮
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e);
    var price = [];
    var num = [];
    var nums = [];
    var ids = [];
    var total = 0;
    for (var i in e.detail.value) {
      var aaa = e.detail.value[i].split(',');
      // console.log(aaa)
      price = price.concat(aaa[0]);
      num = aaa[1];
      nums = nums.concat(aaa[1]);
      console.log(num,'num');
      for(var i =0;i<num;i++){
        // console.log(i)
        ids.push(Number(aaa[2]))
        // ids = ids.concat(aaa[2]);
        // console.log(ids,'[[[')
      }
      // ids = ids.concat(ids);
    }
    console.log(ids)
    for(var i in price){     
      total += price[i]*nums[i]     
    }
    
    this.setData({totalPrice:total/100});
    this.setData({ids:ids});
  },
  count_price() {
    // 获取商品列表数据
    let list = this.data.carts;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      if (list[i].selected) {
        // 所有价格加起来 count_money
        total += list[i].num * list[i].price;
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      carts: list,
      totalPrice: total.toFixed(2)
    });
  },
  btn_submit_order(){
    console.log(this.data.ids);
    var _this = this;
    wx.request({
      url: 'https://sys.songna.top:9090/api/open/wx/order/add',
      data:{
        'foodIds':_this.data.ids,
        'openId': _this.data.miniWxId
      },
      method:'post',
      success:function(data){
        console.log(data.data.data.id);
        if(data.data.code == 200){
           wx.navigateTo({
             url: '../orderConfirm/orderConfirm?id=' + data.data.data.id,
          })
        }
      }
    })
    
  },
 btn_minus(e){
    // console.log(e);
    var _this = this;
    const index = e.currentTarget.dataset.index;
   var id = e.currentTarget.dataset.id;
    var num = this.data.carts[index].num;
    if (num <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    num = num - 1;
    console.log(num)
   wx.request({
     url: 'https://sys.songna.top:9090/api/open/wx/shop/car/update/num',
     data: { "id": id,num:num },
     method: 'post',
     success: function (data) {
      //  console.log(data);
       if(data.data.code == 200){
         var carts = _this.data.carts;
         carts[index].num = num;
         _this.setData({ carts: carts })
       }
       
     }
   })

  },
  btn_add(e) {
    // console.log(e);
    var _this = this;
    const index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var num = this.data.carts[index].num;
    // if (num <= 1) {
    //   return false;
    // }
    // else  num大于1  点击减按钮  数量--
    num = num + 1;
    // console.log(num)
    wx.request({
      url: 'https://sys.songna.top:9090/api/open/wx/shop/car/update/num',
      data: { "id": id, num: num },
      method: 'post',
      success: function (data) {
        console.log(data);
        if (data.data.code == 200) {
          var carts = _this.data.carts;
          carts[index].num = num;
          _this.setData({ carts: carts })
        }

      }
    })

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
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 1000
    })
    this.count_price();
    //加入购物车
    var _this = this;
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
          if (data.data.data.result!=null){
            _this.setData({ carts: data.data.data.result });
          }else{
            _this.setData({carts:[]});
          }
         
        }
      })
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