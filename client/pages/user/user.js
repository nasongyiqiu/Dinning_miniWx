
var netManager = require('../../utils/netManager')
var util = require('../../utils/util.js')
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: 0,
        userInfo: null,
        pageName: 'user',
        avatar:null,
        name:null,
        refuseAuthSetting: false,
        orderArray: null,
        hasMoreData: true,
        pageSize: 10,
        pageIndex: 0
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
        console.log("page(user).onReady with userInfo:", app.data)
        let that = this
        that.setData({
            userId: app.data.userId
        })
        //that.getOrderList()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this
        const userInfo = app.data.userInfo
        if (userInfo) {
            that.setData({
                userInfo: userInfo,
                avatar: userInfo.avatarUrl,
                name: userInfo.nickName 
            })
        }
        wx.setNavigationBarTitle({
            title: '我的'
        })
    },

    /*getOrderList: function() {
        let that = this
        let args = {
            userId: app.data.userId,
            pageSize: that.data.pageSize,
            pageIndex: that.data.pageIndex + 1
        }
        if(args.userId > 0) {
            netManager.orderSearch(args,
                function(res) {
                    console.log('返回值。。。。。',res, res=={})
                    let list = that.data.orderArray ? that.data.orderArray : []
                    if (res && res.length > 0) {
                        that.setData({
                            orderArray: list.concat(res),
                            hasMoreData: true,
                            pageIndex: that.data.pageIndex + 1
                        })
                        console.log('订单列表。。。。', that.data)
                    } else {
                        that.setData({
                            orderArray: list,
                            hasMoreData: false,
                            pageIndex: that.data.pageIndex + 1
                        })
                        console.log('订单列表。。。。', that.data)
                    }
                },
                function(error) {
                    console.log(error)
                }
            )
        } else {
            netManager.layer('没有userId！')
        }
    },

    getMoreOrder: function() {
        this.getOrderList()
    },

    showTicketList: function() {
        wx.navigateTo({
            url:"../wallet/wallet"
        });
    },

    showOrderList: function () {
        wx.navigateTo({
            url:"../orderList/orderList"
        });
    },

    showSabisList: function () {
        wx.navigateTo({
            url:"../sabis/sabis"
        });
    },*/

    showAgreement: function () {
        wx.navigateTo({
            url:"../webview/agreement/agreement"
        });
    },

    getUserInfo: function() {
        let that = this

        app.authorUserInfo(
            function() {
                let userInfo = app.data.userInfo
                that.setData({
                    userInfo: userInfo,
                    avatar: userInfo.avatarUrl,
                    name: userInfo.nickName
                })
            },
            function(){

            }
        )
    },

    /*toFeedback: function() {
        wx.navigateTo({
          // url:"../cardApply/cardApply?exCardId=105"
            url: "../feedback/feedback?orderId=0"
        });
    },*/
    toAboutUs: function() {
        wx.navigateTo({
            url:"../aboutUs/aboutUs"
        });
    },

    /*orderChoose: function(event) {
        let orderId = event.currentTarget.id
        let orderArray = this.data.orderArray
        let orderChoose = null
        if (orderArray &&  orderId > 0) {
            for (var i = orderArray.length - 1; i >= 0; i--) {
                if (orderArray[i].id == orderId) {
                    orderChoose = orderArray[i]
                    break
                }
            }
        }
        console.log(orderId, orderArray, orderChoose)
        if (orderChoose) {
            wx.navigateTo({
                url:"../orderDetail/orderDetail?orderId=" + orderId
            });
        }
    },*/
    phoneCall: function() {
        netManager.makePhoneCall(app.data.kefuPhoneNumber)
    }
})