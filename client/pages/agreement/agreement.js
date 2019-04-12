let app = getApp()
const netManager = require('../../utils/netManager')
const constant = require('../../utils/Constant')
const util = require('../../utils/util.js')
 
Page({
    onShow: function () {
	    wx.setNavigationBarTitle({
	        title: '用户协议'
	    })
	},

    phoneCall: function() {
        netManager.makePhoneCall(app.data.kefuPhoneNumber)
    }

})