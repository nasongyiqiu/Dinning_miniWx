var netManager = require('../../utils/netManager')
var util = require('../../utils/util.js')
let app = getApp()

Page({

    /**
    * 页面的初始数据
    */
    data: {
        // userId: 0;
        needGuide: null,

        terList:[],
        pageIndex:0,
        pageSize:18,
        dataValid:false,

        cityId:3301,
        cityName: '杭州市',
        showDropDownMenu: false,
        hasMoreData:true,
        cityList: [],
        cityNames: {"71":"台湾省","81":"香港特别行政区","82":"澳门特别行政区","1101":"北京市","1201":"天津市","1301":"石家庄市","1302":"唐山市","1303":"秦皇岛市","1304":"邯郸市","1305":"邢台市","1306":"保定市","1307":"张家口市","1308":"承德市","1309":"沧州市","1310":"廊坊市","1311":"衡水市","1401":"太原市","1402":"大同市","1403":"阳泉市","1404":"长治市","1405":"晋城市","1406":"朔州市","1407":"晋中市","1408":"运城市","1409":"忻州市","1410":"临汾市","1411":"吕梁市","1501":"呼和浩特市","1502":"包头市","1503":"乌海市","1504":"赤峰市","1505":"通辽市","1506":"鄂尔多斯市","1507":"呼伦贝尔市","1508":"巴彦淖尔市","1509":"乌兰察布市","1522":"兴安盟","1525":"锡林郭勒盟","1529":"阿拉善盟","2101":"沈阳市","2102":"大连市","2103":"鞍山市","2104":"抚顺市","2105":"本溪市","2106":"丹东市","2107":"锦州市","2108":"营口市","2109":"阜新市","2110":"辽阳市","2111":"盘锦市","2112":"铁岭市","2113":"朝阳市","2114":"葫芦岛市","2201":"长春市","2202":"吉林市","2203":"四平市","2204":"辽源市","2205":"通化市","2206":"白山市","2207":"松原市","2208":"白城市","2224":"延边朝鲜族自治州","2301":"哈尔滨市","2302":"齐齐哈尔市","2303":"鸡西市","2304":"鹤岗市","2305":"双鸭山市","2306":"大庆市","2307":"伊春市","2308":"佳木斯市","2309":"七台河市","2310":"牡丹江市","2311":"黑河市","2312":"绥化市","2327":"大兴安岭地区","3101":"上海市","3201":"南京市","3202":"无锡市","3203":"徐州市","3204":"常州市","3205":"苏州市","3206":"南通市","3207":"连云港市","3208":"淮安市","3209":"盐城市","3210":"扬州市","3211":"镇江市","3212":"泰州市","3213":"宿迁市","3301":"杭州市","3302":"宁波市","3303":"温州市","3304":"嘉兴市","3305":"湖州市","3306":"绍兴市","3307":"金华市","3308":"衢州市","3309":"舟山市","3310":"台州市","3311":"丽水市","3401":"合肥市","3402":"芜湖市","3403":"蚌埠市","3404":"淮南市","3405":"马鞍山市","3406":"淮北市","3407":"铜陵市","3408":"安庆市","3410":"黄山市","3411":"滁州市","3412":"阜阳市","3413":"宿州市","3414":"巢湖市","3415":"六安市","3416":"亳州市","3417":"池州市","3418":"宣城市","3501":"福州市","3502":"厦门市","3503":"莆田市","3504":"三明市","3505":"泉州市","3506":"漳州市","3507":"南平市","3508":"龙岩市","3509":"宁德市　","3601":"南昌市","3602":"景德镇市","3603":"萍乡市","3604":"九江市","3605":"新余市","3606":"鹰潭市","3607":"赣州市","3608":"吉安市","3609":"宜春市","3610":"抚州市","3611":"上饶市","3701":"济南市","3702":"青岛市","3703":"淄博市","3704":"枣庄市","3705":"东营市","3706":"烟台市","3707":"潍坊市","3708":"济宁市","3709":"泰安市","3710":"威海市","3711":"日照市","3712":"莱芜市","3713":"临沂市","3714":"德州市","3715":"聊城市","3716":"滨州市","3717":"菏泽市","4101":"郑州市","4102":"开封市","4103":"洛阳市","4104":"平顶山市","4105":"安阳市","4106":"鹤壁市","4107":"新乡市","4108":"焦作市","4109":"濮阳市","4110":"许昌市","4111":"漯河市","4112":"三门峡市","4113":"南阳市","4114":"商丘市","4115":"信阳市","4116":"周口市","4117":"驻马店市","4201":"武汉市","4202":"黄石市","4203":"十堰市","4205":"宜昌市","4206":"襄樊市","4207":"鄂州市","4208":"荆门市","4209":"孝感市","4210":"荆州市","4211":"黄冈市","4212":"咸宁市","4213":"随州市","4228":"恩施州","4290":"湖北省直辖行政单位","4301":"长沙市","4302":"株洲市","4303":"湘潭市","4304":"衡阳市","4305":"邵阳市","4306":"岳阳市","4307":"常德市","4308":"张家界市","4309":"益阳市","4310":"郴州市","4311":"永州市","4312":"怀化市","4313":"娄底市","4331":"湘西土家族苗族自治州","4401":"广州市","4402":"韶关市","4403":"深圳市","4404":"珠海市","4405":"汕头市","4406":"佛山市","4407":"江门市","4408":"湛江市","4409":"茂名市","4412":"肇庆市","4413":"惠州市","4414":"梅州市","4415":"汕尾市","4416":"河源市","4417":"阳江市","4418":"清远市","4419":"东莞市","4420":"中山市","4451":"潮州市","4452":"揭阳市","4453":"云浮市","4501":"南宁市","4502":"柳州市","4503":"桂林市","4504":"梧州市","4505":"北海市","4506":"防城港市","4507":"钦州市","4508":"贵港市","4509":"玉林市","4510":"百色市","4511":"贺州市","4512":"河池市","4513":"来宾市","4514":"崇左市","4601":"海口市","4602":"三亚市","4690":"海南省属虚拟市","5001":"重庆市","5101":"成都市","5103":"自贡市","5104":"攀枝花市","5105":"泸州市","5106":"德阳市","5107":"绵阳市","5108":"广元市","5109":"遂宁市","5110":"内江市","5111":"乐山市","5113":"南充市","5114":"眉山市","5115":"宜宾市","5116":"广安市","5117":"达州市","5118":"雅安市","5119":"巴中市","5120":"资阳市","5132":"阿坝州","5133":"甘孜藏族自治州","5134":"凉山州","5201":"贵阳市","5202":"六盘水市","5203":"遵义市","5204":"安顺市","5222":"铜仁地区","5223":"黔西南州","5224":"毕节地区","5226":"黔东南苗族侗族自治州","5227":"黔南布依族苗族自治州","5301":"昆明市","5303":"曲靖市","5304":"玉溪市","5305":"保山市","5306":"昭通市","5307":"丽江市","5308":"思茅市","5309":"临沧市","5323":"楚雄州","5325":"红河州","5326":"文山州","5328":"西双版纳州","5329":"大理州","5331":"德宏州","5333":"怒江州","5334":"迪庆州","5401":"拉萨市","5421":"昌都地区","5422":"山南地区","5423":"日喀则地区","5424":"那曲地区","5425":"阿里地区","5426":"林芝地区","6101":"西安市","6102":"铜川市","6103":"宝鸡市","6104":"咸阳市","6105":"渭南市","6106":"延安市","6107":"汉中市","6108":"榆林市","6109":"安康市","6110":"商洛市","6201":"兰州市","6202":"嘉峪关市","6203":"金昌市","6204":"白银市","6205":"天水市","6206":"武威市","6207":"张掖市","6208":"平凉市","6209":"酒泉市","6210":"庆阳市","6211":"定西市","6212":"陇南市","6229":"临夏州","6230":"甘南州","6301":"西宁市","6321":"海东地区","6322":"海北州","6323":"黄南州","6325":"海南州","6326":"果洛州","6327":"玉树州","6328":"海西州","6401":"银川市","6402":"石嘴山市","6403":"吴忠市","6404":"固原市","6405":"中卫市","6501":"乌鲁木齐市","6502":"克拉玛依市","6521":"吐鲁番地区","6522":"哈密地区","6523":"昌吉州","6527":"博尔塔拉蒙古自治州","6528":"巴音郭楞蒙古自治州","6529":"阿克苏地区","6530":"克州","6531":"喀什地区","6532":"和田地区","6540":"伊犁州","6542":"塔城地区","6543":"阿勒泰地区","6590":"新疆省直辖行政单位"},
    },


      /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        let that = this
        getApp().data.homeCallback = function(guide){
            that.setData({
                needGuide: guide
            })
        }
    },

    /**
    * 生命周期函数--监听页面初次渲染完成
    */
    onReady: function () {
        var that = this
        netManager.cityListSearch(function(successCallBack){
                console.log(successCallBack)
                let list = successCallBack
                let cityList = []
                list.forEach(function(val) {
                    let city = {}
                    city.cityId = val
                    city.cityName = that.data.cityNames[val]
                    cityList.push(city)
                })
                that.setData({
                    cityList : cityList,
                })
                
                console.log('onreday,,,,数据。。。。。',that.data)
            }, 
            function(failCallBack){
                console.log(failCallBack)
                that.setData({
                    cityList : [
                        {cityId: 1101, cityName: '北京'},
                        {cityId: 3301, cityName: '杭州'},
                        {cityId: 3303, cityName: '温州'},
                        {cityId: 3308, cityName: '衢州'},
                        {cityId: 4419, cityName: '东莞'},
                    ],
                })
                console.log(that.data.cityList)
            }
        )

        var terList = this.data.terList
        if (!terList || terList.length == 0) {
            netManager.terSearch(this.data.cityId, function(successCallBack){
                    console.log(successCallBack)
                    let list = successCallBack

                    if (list && list.length > 0) {
                        that.setData({
                            terList : list,
                            dataValid : true,
                            hasMoreData : list.length < 18 ? false : true
                        })
                    }
                    console.log('onreday,,,,数据。。。。。',that.data)
                }, 
                function(failCallBack){
                    console.log(failCallBack)
                }
            )
        }
    },

    onShow: function () {
        wx.setNavigationBarTitle({
            title: '太仆洗车'
        })
        console.log('onshow.....')
        this.getTerList()
    },

    /**
    * 用户点击右上角分享
    */
    onShareAppMessage: function () {
      return {
        title: '太仆洗车',
        path: '/pages/home/home',
        imageUrl: 'http://tp-app.oss-cn-hangzhou.aliyuncs.com/ios/bg_share.jpg'
      }
    },

    getTerList: function() {
        let that = this
        netManager.terSearch(this.data.cityId, function(successCallBack){
                console.log(successCallBack)
                let list = successCallBack

                if (list) {
                    that.setData({
                        terList : list,
                        dataValid : true,
                        hasMoreData : list.length < 18 ? false : true
                    })
                }
                console.log('onreday,,,,数据。。。。。',that.data)
            }, 
            function(failCallBack){
                console.log(failCallBack)
            }
        )
    },

    getParam: function(url, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = url.match(reg);
        if (r != null) return unescape(r[2]); 
        return null;
    },

    scanCode: function(){
        let that = this
        wx.scanCode({
            success: (res) => {
                // console.log('扫码的结果。。。。',res)
                let url = res.result
                
                // if(url.indexOf('taipuauto.com/ter?terId=') != -1){
                if((url.indexOf('www.taipuauto.com/ter?terId=') != -1) || (url.indexOf('tpwashlocal.taipuauto.cn/ter?terId=') != -1) || (url.indexOf('www.taipuauto.cn/ter?terId=') != -1) ){
                    let paramStr = url.split('?')[1]
                    let id = that.getParam(paramStr, 'terId')
                    console.log(id)
                    wx.navigateTo({
                        url: "../ter/ter?terId=" + id
                    });
                } else {
                    wx.navigateTo({
                        url: "../index/index"
                    });
                }
            },

            fail: (error) => {
                wx.showToast({
                    title: '扫码失败',
                    image: './icon_fail.png',
                    // icon: 'none',
                    duration: 2000
                })
            }
        })
    },

    // 选择城市
    showCityList: function() {
        let that = this
        if (that.data.showDropDownMenu == false ){
            that.setData ({
                showDropDownMenu: true
            })
        } else {
            that.setData ({
                showDropDownMenu: false
            })
        }
        
    },
    chooseCity: function(event) {
        let that = this
        let cityId = event.currentTarget.id
        let cityName = that.data.cityNames[cityId]
        that.setData({
            cityId: cityId,
            cityName: cityName
        })
        that.getTerList()
        that.setData ({
            showDropDownMenu: false
        })
    },

    chooseTer :function (event) {
        let that = this
        let terId = event.currentTarget.id
        let curTer
        
        if (terId > 0) {
            for (var i = that.data.terList.length - 1; i >= 0; i--) {
                if (that.data.terList[i].terID == terId) {
                    curTer = that.data.terList[i]
                    break
                }
            }
        }
        if (curTer && curTer.online) {
            wx.navigateTo({
                url:"../ter/ter?terId=" + terId
            });
        }
    },

    toWallet: function () {
        wx.navigateTo({
            url:"../cardList/cardList"
        });
    },

    toUser: function () {
        wx.navigateTo({
            url:"../user/user"
        });
    },

    phoneCall: function() {
        netManager.makePhoneCall(app.data.kefuPhoneNumber)
    }


})