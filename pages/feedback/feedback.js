let netManager = require('../../utils/netManager')
const util = require('../../utils/util.js')
let app = getApp()

Page({

    data: {
        orderId: 0,
        userId: 0,
        feedback: null,
        enableSubmit: false,
        type: null,
        typeList: ['服务问题','饭菜质量','卫生问题','其他情况'],
        phone: null,
        msg: '',
        imgArrayStr: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        let orderId = JSON.parse(options.orderId)
        console.log(orderId)
        if (orderId > 0) {
            this.setData({
                orderId: orderId,
            })
        }

        this.setData({
            feedback: {
                orderId: that.data.orderId
            }
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
            title: '意见反馈'
        })
    },

    checkEnableSubmit: function() {
        let that = this
        if (that.data.type && that.data.phone && that.data.msg) {
            that.setData({
                enableSubmit: true
            })
        } else {
            that.setData({
                enableSubmit: false
            })
        }
    },

    chooseType: function() {
        let that = this
        wx.showActionSheet({
            itemList: that.data.typeList,
            success: function(res) {
                console.log(res.tapIndex)
                that.setData({
                    type: res.tapIndex + 1,
                    typeDesc: that.data.typeList[res.tapIndex]
                })
                console.log(that.data)
                that.checkEnableSubmit()
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })
    },

    checkPhone: function (event) {
        let iptPhone = event.detail.value
        iptPhone = iptPhone.trim()

        this.setData({
            phone: iptPhone
        })

        this.checkEnableSubmit()
    },

    updateMsg: function(e) {
        console.log(e.detail.value)
        let msg = e.detail.value
        msg = (msg != undefined && msg != null) ? msg.trim() : null;
        this.setData({
            msg: msg
        })
        this.checkEnableSubmit()
    },

    submit:function() {

        let feedback = {}
        feedback.orderId = this.data.orderId
        feedback.userId = app.globalData.userId
        feedback.type = this.data.type
        feedback.phone = this.data.phone
        feedback.msg = this.data.msg
        // feedback.imgArrayStr = 'http://tp-www.oss-cn-shanghai.aliyuncs.com/tp_www/xiaozhen.jpg'
        feedback.imgArrayStr = ''
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/

        if (feedback.type < 1) {  
            wx.showToast({  
                title: '请选择建议类型！',  
                icon: 'none',  
                duration: 1000  
            })  
        } else if (!myreg.test(feedback.phone)) {  
            wx.showToast({  
                title: '请填写正确的手机号',  
                icon: 'none',  
                duration: 1000  
            })  
        } else if (!feedback.msg) {
            wx.showToast({  
                title: '请填写意见',  
                icon: 'none',  
                duration: 1000  
            })
        } else {
            wx.showLoading({
                title:'提交反馈',
                mask:true,
            })

            netManager.submitFeedback(feedback,
                function(res){
                    console.log('success',res)
                    wx.hideLoading()
                    wx.showToast({
                        title:'提交成功',
                        icon:'success',
                        duration:2000,
                        complete: function(){
                            wx.navigateBack()
                        }
                    })
                },
                function(error){
                    console.log('fail',error)
                    wx.hideLoading()
                    wx.showToast({
                        title: error,
                        image: './icon_fail.png',
                        // icon:'none',
                        duration:1000
                    }) 
                }
            )
        }

    },
    phoneCall: function() {
      netManager.makePhoneCall('18839159126')
    }
})