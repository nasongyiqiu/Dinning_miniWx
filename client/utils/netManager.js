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
		url: config.tpService.unionIdUel + '?code=' + code,
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
        url: config.tpService.loginUrl,
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

var findTerById = (terId, successCallBack, failCallBack) => {
	var url = config.tpService.terFindInfoById
	if (!terId || terId < 1) {
		failCallBack()
	}
	wx.request({
		url: url + "?id=" + terId,
		data: {
		},
		method:"POST",
		success: function(res) {
			var data = res.data
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

var ticketSearch = (userId, pageIndex, pageSize, successCallBack, failCallBack) => {
	let url = config.tpService.ticketSearchUrl
	if (!userId || userId < 1) {
		failCallBack("用户ID错误")
	}
	wx.request({
		url: url,
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			userId: userId
		},
		method: "POST",
		success: function(res) {
			var data = res.data
			console.log(res.data.data)
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

// let allCardList = (userId, pageIndex, pageSize, successCallBack, failCallBack) => {
// 	let url = config.tpService.allCardSearchUrl
// 	if (!userId || userId < 1) {
// 		failCallBack("用户ID错误")
// 	}
// 	wx.request({
// 		url: url,
// 		data: {
// 			userId:userId,
// 			pageIndex:pageIndex,
// 			pageSize:pageSize
// 		},
// 		method: "POST",
// 		success: function(res) {
// 			var data = res.data
// 			console.log(res)
// 			if (res.statusCode == 200) {
// 				if (data.code == "200") {
// 					successCallBack(data.data)
// 				} else {
// 					let desc = netResponse.getErrorDesc(data.code)
//             		failCallBack(desc)
// 				}
// 			}
// 		},
// 		fail: function(error) {
// 			console.log(error)
// 			failCallBack(error)
// 		}
// 	})
// }

let cardSearchValid = (userId, terId, pageIndex, pageSize, successCallBack, failCallBack) => {
	let url = config.tpService.validCardSearchUrl
	if (!userId || userId < 1) {
		failCallBack("用户ID错误")
	}
	if (!terId || terId < 1) {
		failCallBack("网点ID错误")
	}
	wx.request({
		url: url,
		data: {
			userId: userId,
			pageIndex: pageIndex,
			pageSize: pageSize,
			terId: terId
		},
		method: "POST",
		success: function(res) {
			var data = res.data
			console.log(res)
			if (res.statusCode == 200) {
				if (data.code == "200") {
					successCallBack(data.data)
				} else {
					console.log(res)
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

var startMachine = (userId, terId, orderId, successCallBack, failCallBack) =>  {
	const url = config.tpService.operationStartUrl
	if (userId && terId && orderId) {
		wx.request({
			url: url + '?userId=' + userId + '&terId=' + terId + '&orderId=' + orderId,
			data: {},
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
				}
			},
			fail: function (error) {
				console.log(error)
				failCallBack(error)
			}
		})
	}
}

let findValidOrderByTerId = (terId, userId, successCallBack, failCallBack) => {
	const url = config.tpService.findValidByTerId
	if (terId < 1) {
		failCallBack("网点ID错误")
	}
	if (userId < 1) {
		failCallBack("用户ID错误")
	}
	wx.request({
		url: url + "?terId=" + terId + "&userId=" + userId,
		data: {},
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

let findExCardInfoById = (id, userId, successCallBack, failCallBack) => {
	if (id == undefined || id < 1) {
		failCallBack('洗车卡参数错误')
	}
	let url = config.tpService.findExCardInfoByIdUrl + id + '&userId=' + userId
	wx.request({
		url: url,
		data: {},
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

// let cardApplyCheck = (userId, exCardId, successCallBack, failCallBack) => {
// 	if (userId == undefined || userId < 1) {
// 		failCallBack('用户ID错误')
// 	}
// 	if (exCardId == undefined || exCardId < 1) {
// 		failCallBack('洗车卡ID错误')
// 	}
// 	let url = config.tpService.checkExcardApplyRepeatUrl
// 	wx.request({
// 		url: url + "?userId=" + userId + "&exCardId=" + exCardId,
// 		data: {},
// 		method: 'POST',
// 		success : function(res) {
// 			var data = res.data
// 			console.log(res)
// 			if (res.statusCode == 200) {
// 				if (data.code == "200") {
// 					successCallBack(data.data)
// 				} else {
// 					let desc = netResponse.getErrorDesc(data.code)
//         			failCallBack(desc)
// 				}
// 			} else {
// 				failCallBack(data)
// 			}
// 		},
// 		fail: function (error) {
// 			console.log(error)
// 			failCallBack(error)
// 		}
// 	})

// }

// let cardApply = (apply, successCallBack, failCallBack) => {
// 	let url = config.tpService.cardApplyUrl
// 	wx.request({
// 		url: url,
// 		data: apply,
// 		method: 'POST',
// 		success : function(res) {
// 			var data = res.data
// 			console.log(res)
// 			if (res.statusCode == 200) {
// 				if (data.code == "200") {
// 					successCallBack(data.data)
// 				} else {
// 					let desc = netResponse.getErrorDesc(data.code)
//         			failCallBack(desc)
// 				}
// 			} else {
// 				failCallBack(data)
// 			}
// 		},
// 		fail: function (error) {
// 			console.log(error)
// 			failCallBack(error)
// 		}
// 	})
// }

let findOrderInfoById = (orderId, successCallBack, failCallBack) => {
	let url = config.tpService.findOrderInfoById
	wx.request({
		url: url + "?id=" + orderId,
		data: {},
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

// 兑换优惠券
let exchangeTicket = (code, userId, successCallBack, failCallBack) => {
	let url = config.tpService.exchangeTicketUrl
	wx.request({
		url: url + '?code=' + code + '&userId=' + userId,
		data: {},
		method: 'POST',
		success : function(res) {
			var data = res.data
			console.log('兑换优惠券请求结果。。。。。',res)
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

// 购买洗车卡
let buyCard = (buyCardInfo, successCallBack, failCallBack) => {
	const url = config.tpService.buyCardUrl
	if (buyCardInfo) {
		wx.request({
			url: url,
			data: buyCardInfo,
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

var updateCardPossessState = (id, userId, successCallBack, failCallBack) => {
	const url = config.tpService.updateCardPossessUrl
	if (id > 0 && userId > 0) {
		wx.request({
			url: url + "?id=" + id + "&userId=" + userId,
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

// 用户信息记录说明
var checkUserInfo = (info, successCallBack, failCallBack) => {
	const url = config.tpService.checkInfoUrl
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

// v4版本，更改洗车卡后台逻辑
// 获取某网点在售的vip卡片列表
let gerVipCardList = (args, successCallBack, failCallBack) => {
	const url = config.tpService.vipCardListUrl
	wx.request({
		url: url,
		data: args,
		method: 'POST',
		success : function(res) {
			var data = res.data
			console.log(res)
			if (res.statusCode == 200) {
				if (data.code == "200") {
					successCallBack(data.data.result)
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

// 获取洗车卡信息
let getVipCardInfo = (args, successCallBack, failCallBack) => {
	const url = config.tpService.vipCardInfoUrl
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

// 购买洗车卡预下单
let vipCardPreOrder = (args, successCallBack, failCallBack) => {
	const url = config.tpService.vipCardPreOrderUrl
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

// 查询洗车卡预下单支付状态
let vipCardPreOrderState = (args, successCallBack, failCallBack) => {
	const url = config.tpService.vipCardOrderStateUrl
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

// 获取用户洗车卡列表
let getUserCardList = (args, successCallBack, failCallBack) => {
	const url = config.tpService.userCardListUrl
	wx.request({
		url: url,
		data: args,
		method: 'POST',
		success : function(res) {
			var data = res.data
			console.log(res)
			if (res.statusCode == 200) {
				if (data.code == "200") {
					successCallBack(data.data.result)
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

// 获取用户洗车卡列表
let getUserCardInfo = (args, successCallBack, failCallBack) => {
	const url = config.tpService.userCardInfoUrl
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

// 获取用户下单时可用洗车卡列表
let getValidCardList = (args, successCallBack, failCallBack) => {
	const url = config.tpService.validCardListUrl
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

// 洗车预下单
let washPreOrder = (args, successCallBack, failCallBack) => {
	const url = config.tpService.washPreOrderUrl
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
// 申请洗车卡（交院老师）
let cardApply = (args, successCallBack, failCallBack) => {
	const url = config.tpService.cardApplyUrl
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
        			failCallBack(data)
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
	findTerById : findTerById,
	ticketSearch : ticketSearch,
	// wxPay: productWxPrePayOrder,
	freePay: productFreePayOrder,
	updateOrderState: updateOrderState,
	orderSearch: orderSearch,
	startMachine: startMachine,
	// listValidCardBySearch: cardSearchValid,
	// allCardList: allCardList,
	checkValidOrderByTerId: findValidOrderByTerId,
	findExCardInfoById: findExCardInfoById,
	// cardApplyCheck: cardApplyCheck,
	// cardApply: cardApply,
	findOrderInfoById: findOrderInfoById,

	// exchangeTicket: exchangeTicket,
	submitFeedback: submitFeedback,
	buyCard: buyCard,
	updateCardPossessState: updateCardPossessState,
	checkUserInfo: checkUserInfo,

	uploadRefund: uploadRefund,

	// v4
	identifyCar: identifyCar,
	gerVipCardList: gerVipCardList,
	getVipCardInfo: getVipCardInfo,
	vipCardPreOrder: vipCardPreOrder,
	vipCardPreOrderState: vipCardPreOrderState,
	getUserCardList: getUserCardList,
	getUserCardInfo: getUserCardInfo,
	getValidCardList: getValidCardList,
	washPreOrder: washPreOrder,
	washOrderState: washOrderState,
	cardApply: cardApply,

	layer: layer,
	isPhone: isPhone,
	makePhoneCall: makePhoneCall


}