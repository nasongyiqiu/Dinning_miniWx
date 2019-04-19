var netResponse =  require('./netResponse')
var config = require('../config')

/*
	用户
*/
let getUnionIdWithCode = (code, successCallBack, failCallBack) => {
	if (!code) {
		failCallBack('code is empty')
	}
	console.log('wx.code->', code)
	wx.request({
		url: config.sysService.unionIdUel + '?code=' + code,
		method: 'POST',
		success: function(res) {
			console.log('get unionid res->' ,res)
            var code = res.data.code
            if (code = "200") {
                var data = res.data.data
                successCallBack(data)
            } else {
            	let desc = netResponse.getErrorDesc(code)
            	failCallBack(desc)
            }
		},
		fail: function(error) {
			failCallBack()
		}
	})
}



// v3-使用openid登录，unionid可省
var login = (openid, unionid, successCallBack , failCallBack) => {
	if (!openid) {
		failCallBack()
	}
    wx.request({
        url: config.sysService.loginUrl,
        data: {
            wxMiniId: openid,
            wxUnionId: unionid,
            type:3
        },
        method:"POST",
        success: function (res) {
            var code = res.data.code
            if (code = "200") {
                var data = res.data.data
                successCallBack(data)
            } else {
            	let desc = netResponse.getErrorDesc(code)
            	failCallBack(desc)
            }
        },
        fail:function(error) {
            console.log(error)
            failCallBack()
        }
    })
} 



/*
	网点
*/
var cityListSearch = (successCallBack, failCallBack) => {
	var url = config.tpService.cityListUrl
	wx.request({
		url : url,
		data : {},
		method:"POST",
		success: function(res) {
			let data = res.data
			if (res.statusCode == 200) {
				if (data.code == "200") {
					successCallBack(data.data)
				} else {
					let desc = netResponse.getErrorDesc(data.code)
            		failCallBack(desc)
				}
			} else {
				console.log('city接口调用失败')
				failCallBack()
			}
		},
		fail: function(error) {
			console.log(error)
			failCallBack(error)
		}
	})
}

var terSearch = (cityId, successCallBack, failCallBack) => {
	//后期需要按照pageIndex和pageSize来拉取数据
	var url = config.tpService.terSearchUrl
	cityId = (!cityId || cityId < 0 ) ? 3301 : cityId
	wx.request({
		url : url,
		data : {
			city : cityId,
			pageSize : 10000
		},
		method:"POST",
		success: function(res) {
			let data = res.data
			if (res.statusCode == 200) {
				if (data.code == "200") {
					successCallBack(data.data)
				} else {
					let desc = netResponse.getErrorDesc(data.code)
            		failCallBack(desc)
				}
			} else {

			}
		},
		fail: function(error) {
			console.log(error)
			failCallBack(error)
		}
	})
}

var productWxPrePayOrder = (order, successCallBack, failCallBack) => {
	let url = config.tpService.newWxPayOrder
	
	if (order) {
		let tmpOrder = {
			userId : order.userId,
			terId : order.terId,
			ticketId : order.ticketId,
			cardId : order.cardId,
			amount : parseFloat(order.amount * 100),
			sabisId : order.sabisId,
			sabisTrimId : order.sabisTrimId,
			type : 1,
			channel: 3
		}

		console.log('支付订单的请求参数。。。', tmpOrder)
		wx.request({
			url: url,
			data: tmpOrder,
			method: "POST",
			success: function(res) {
				var data = res.data
				console.log(res)
				if (res.statusCode == 200) {
					if (data.code == "200") {
						successCallBack(data.data)
					} else {
						let desc = netResponse.getErrorDesc(data.code)
            			failCallBack(desc)
					}
				}
			},
			fail: function(error) {
				console.log(error)
				failCallBack(error)
			}
		})
	}
}

var productFreePayOrder = (order, successCallBack, failCallBack) => {
	let url = config.tpService.newFreeOrder
	if (order && order.amount == 0) {
		console.log(order)
		let tmpOrder = {
			userId: order.userId,
			terId: order.terId,
			ticketId: order.ticketId,
			cardId : order.cardId,
			amount : 0,
			sabisId : order.sabisId,
			sabisTrimId : order.sabisTrimId,
			type : 3,
			channel: 3
		}

		console.log('免费订单的请求参数。。。', tmpOrder)
		wx.request({
			url: url,
			data: tmpOrder,
			method: "POST",
			success: function(res) {
				var data = res.data
				console.log(res)
				if (res.statusCode == 200) {
					if (data.code == "200") {
						successCallBack(data.data)
					} else {
						let desc = netResponse.getErrorDesc(data.code)
            			failCallBack(desc)
					}
				}
			},
			fail: function(error) {
				console.log(error)
				failCallBack(error)
			}
		})
	} else {
		failCallBack("参数错误")
	}
}

var updateOrderState = (orderId, userId, successCallBack, failCallBack) => {
	const url = config.tpService.updateOrderState
	if (orderId > 0 && userId > 0) {
		wx.request({
			url: url + "?orderId=" + orderId + "&userId=" + userId,
			data: {},
			method: "POST",
			success: function(res) {
				var data = res.data
				console.log(res)
				if (res.statusCode == 200) {
					if (data.code == "200") {
						successCallBack(data.data)
					} else {
						let desc = netResponse.getErrorDesc(data.code)
            			failCallBack(desc)
					}
				}
			},
			fail: function(error) {
				console.log(error)
				failCallBack(error)
			}
		})
	} else {
		failCallBack("参数错误")
	}
}

var orderSearch  = (args, successCallBack, failCallBack) => {
	const url = config.tpService.orderSearchUrl

	wx.request({
		url: url,
		data: args,
		method: "POST",
		success : function(res) {
			var data = res.data
			console.log(res)
			if (res.statusCode == 200) {
				if (data.code == "200") {
					successCallBack(data.data)
				} else {
					let desc = netResponse.getErrorDesc(data.code)
        			failCallBack(desc)
				}
			}
		},
		fail: function (error) {
			console.log(error)
			failCallBack(error)
		}
	})
}

// 用户提交意见反馈
let submitFeedback = (feedback, successCallBack, failCallBack) => {
	const url = config.tpService.submitFeedback
	if (feedback) {
		wx.request({
			url: url,
			data: feedback,
			method: 'POST',
			success : function(res) {
				var data = res.data
				console.log(res)
				if (res.statusCode == 200) {
					if (data.code == "200") {
						successCallBack(data.data)
					} else {
						let desc = netResponse.getErrorDesc(data.code)
            			failCallBack(desc)
					}
				} else {
					failCallBack(data)
				}
			},
			fail: function (error) {
				console.log(error)
				failCallBack(error)
			}
		})
	} else {
		failCallBack('参数无效')
	}
}

// 用户信息记录说明
var checkUserInfo = (info, successCallBack, failCallBack) => {
	const url = config.sysService.checkInfoUrl
	wx.request({
		url: url,
		data: info,
		method: "POST",
		success: function(res) {
			var data = res.data
			console.log('check 用户信息。。。。。',res)
			if (res.statusCode == 200) {
				if (data.code == "200") {
					successCallBack(data.data)
				} else {
					let desc = netResponse.getErrorDesc(data.code)
        			failCallBack(desc)
				}
			}
		},
		fail: function(error) {
			console.log(error)
			failCallBack(error)
		}
	})
}

// 申请退款
var uploadRefund = (refund, successCallBack, failCallBack) => {
	const url = config.tpService.newOrderRefund
	if (refund && refund.orderId) {
		wx.request({
			url: url,
			data: refund,
			method: 'POST',
			success : function(res) {
				var data = res.data
				console.log(res)
				if (res.statusCode == 200) {
					if (data.code == "200") {
						successCallBack(data.data)
					} else {
						let desc = netResponse.getErrorDesc(data.code)
            			failCallBack(desc)
					}
				} else {
					failCallBack(data)
				}
			},
			fail: function (error) {
				console.log(error)
				failCallBack(error)
			}
		})
	} else {
		failCallBack('参数无效')
	}
}

// 识别车牌
let identifyCar = (filePath, successCallBack, failCallBack) => {
	const url = config.tpService.identifyCarUrl
	wx.uploadFile({
        url: url,
        filePath: filePath,
        name: 'file',
        success (res){
            console.log(res)
            if (res.statusCode == 200) {
            	let data = JSON.parse(res.data)
              // let data = res.data
              if (data.code == "200") {
                let result = data.data
                successCallBack(result)
                      // console.log(result)
              } else {
                let desc = netResponse.getErrorDesc(data.code)
                failCallBack(desc)
              }
            } else {
              failCallBack(data)
            }
        },
        fail: function(error) {
          console.log(error)
          failCallBack(error)
        }
    })
}








// 查询洗车订单状态
let washOrderState = (args, successCallBack, failCallBack) => {
	const url = config.tpService.washOrderStateUrl
	wx.request({
		url: url,
		data: args,
		method: 'POST',
		success : function(res) {
			var data = res.data
			console.log(res)
			if (res.statusCode == 200) {
				if (data.code == "200") {
					successCallBack(data.data)
				} else {
					let desc = netResponse.getErrorDesc(data.code)
        			failCallBack(desc)
				}
			} else {
				failCallBack(data)
			}
		},
		fail: function (error) {
			console.log(error)
			failCallBack(error)
		}
	})
}

let isPhone = (phone) => {
	let reg = /^((13[0-9])|(166)|(17[0-1,6-8])|(15[0-9])|(18[0-9])|(19[8-9]))\d{8}$/;
    if(reg.test(phone)) {
    	return true
    } else {
    	return false
    }
}

let layer = (message)=> {
	wx.showToast({
        title: message,
        icon: 'none',
        duration: 2000
    })
}

let makePhoneCall = (number)=> {
    wx.makePhoneCall({
        phoneNumber: number
    })
}

module.exports = {
	getUnionIdWithCode : getUnionIdWithCode,
	login : login,
	terSearch : terSearch,
	
	cityListSearch : cityListSearch,
	freePay: productFreePayOrder,
	updateOrderState: updateOrderState,
	orderSearch: orderSearch,

	// exchangeTicket: exchangeTicket,
	submitFeedback: submitFeedback,
	checkUserInfo: checkUserInfo,

	uploadRefund: uploadRefund,

	// v4
	identifyCar: identifyCar,
	washOrderState: washOrderState,

	layer: layer,
	isPhone: isPhone,
	makePhoneCall: makePhoneCall


}