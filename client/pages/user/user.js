
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

    
    toAboutUs: function() {
        wx.navigateTo({
            url:"../aboutUs/aboutUs"
        });
    },

    
    phoneCall: function() {
        netManager.makePhoneCall(app.data.kefuPhoneNumber)
    }
})