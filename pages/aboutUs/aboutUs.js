 var netManager = require('../../utils/netManager')
// var util = require('../../utils/util.js')
// let app = getApp()

Page({

	/**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '关于我们'
        })
    },
    toAgreement: function() {
    	wx.navigateTo({
            url:"../agreement/agreement"
        });
    },

    phoneCall: function() {
      netManager.makePhoneCall('18839159126')
    }
})