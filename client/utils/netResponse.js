var netResponse = [
	{
		code:"200",
		desc:"成功"
	},
	{
		code:"0",
		desc:"未知错误"
	},
	{
		code:"1000",
		desc:"数据库操作失败"
	},
	{
		code:"1001",
		desc:"数据库繁忙"
	},
	{
		code:"1010",
		desc:"参数错误"
	},
	{
		code:"1011",
		desc:"缺少参数"
	},
	{
		code:"1020",
		desc:"签名失败"
	},
	{
		code:"1021",
		desc:"签名错误"
	},
	{
		code:"1022",
		desc:"支付宝订单签名失败"
	},
	{
		code:"1023",
		desc:"支付宝订单签名错误"
	},
	{
		code:"1024",
		desc:"微信订单签名失败"
	},
	{
		code:"1025",
		desc:"微信订单签名错误"
	},
	{
		code:"1026",
		desc:"支付宝用户授权失败"
	},
	{
		code:"1027",
		desc:"微信用户授权失败"
	},
	{
		code:"1028",
		desc:"获取微信openId失败"
	},
	{
		code:"1030",
		desc:"重复操作"
	},
	{
		code:"2000",
		desc:"用户名或者密码错误"
	},
	{
		code:"2001",
		desc:"用户不存在"
	},
	{
		code:"2002",
		desc:"无操作权限"
	},
	{
		code:"2003",
		desc:"注册渠道已关闭"
	},
	{
		code:"2004",
		desc:"手机号不合法"
	},
	{
		code:"3000",
		desc:"远程网点返回信息失败"
	},
	{
		code:"3001",
		desc:"远程网点复位失败"
	},
	{
		code:"3002",
		desc:"对应网点不存在"
	},
	{
		code:"3003",
		desc:"网点故障"
	},
	{
		code:"3004",
		desc:"设备未上线"
	},
	{
		code:"3005",
		desc:"网点状态异常"
	},
	{
		code:"3006",
		desc:"网点订单加签失败"
	},
	{
		code:"3007",
		desc:"网点订单加签错误"
	},
	{
		code:"3008",
		desc:"远程网点返回信息解析失败"
	},
	{
		code:"4000",
		desc:"已经拥有该洗车卡"
	},
	{
		code:"4001",
		desc:"重复申请洗车卡"
	},
	{
		code:"4002",
		desc:"洗车卡已下架"
	},
	{
		code:"4003",
		desc:"对应洗车卡不存在"
	},
	{
		code:"4004",
		desc:"洗车卡无效"
	},
	{
		code:"5000",
		desc:"优惠券无效"
	},
	{
		code:"6000",
		desc:"订单不存在"
	},
	{
		code:"6001",
		desc:"无权操作该订单"
	},
	{
		code:"6002",
		desc:"订单与设备不匹配"
	},
	{
		code:"6003",
		desc:"订单未支付"
	},
	{
		code:"6004",
		desc:"订单已失效"
	},
	{
		code:"6005",
		desc:"未知的支付方式"
	},
	{
		code:"6006",
		desc:"未知的订单渠道"
	},
	{
		code:"7000",
		desc:"请等待前车驶离"
	},
	{
		code:"7001",
		desc:"车辆超长"
	},
	{
		code:"7002",
		desc:"车辆位置错误"
	},
	{
		code:"7003",
		desc:"车辆未驶入"
	},
	{
		code:"8000",
		desc:"未知的反馈建议类型"
	},
	
	
];

let getErrorDesc = (code) => {
	let desc = "未知异常"
	for (var i = netResponse.length - 1; i >= 0; i--) {
		let exception = netResponse[i]
		if (exception.code == code) {
			desc = exception.desc
			break
		}
	}
	return desc
}

module.exports = {
	netResponse:netResponse,
	getErrorDesc:getErrorDesc
};