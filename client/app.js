/**
 * @fileOverview 微信小程序的入口文件
 */

var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');
var netManager = require('./utils/netManager');
const util = require('./utils/util.js');


var globalData = {
  userInfo: {},
  sysUserID: 0
}


App({
    data:{
        unionId: null,
        openId: null,
        userInfo: null,
        userId:0,
        isNewUser:false,
        authoried: false,
        sysLogining: false,
        authoring: false,
        refuseAuthSetting: false, // 拒绝授权
        cardCnt: 0,
        ticketCnt: 0,
        homeCallback: null,
        kefuPhoneNumber: '18839159126'
    },
    onLaunch: function () {
      this.wxLogin()
      this.authorUserInfo()
    },

    wxLogin: function () {
      let that = this
      wx.login({
        success: function (res) {
          console.log('wx.login---->', res.code)
          if (res.code) {
            netManager.getUnionIdWithCode(res.code,
              function (ids) {
                console.log('ids res ->', ids)
                if (ids.unionid) {
                  that.data.unionId = ids.unionid
                }
                if (ids.openid) {
                  that.data.openId = ids.openid
                }
                console.log('获取到unionid之后的数据。。。。', that.data)
                that.sysLogin()
                if (that.cardApplyCallBack) {
                  console.log('cardApplyCallBack 。。。获取到openid的回调')
                  that.cardApplyCallBack(that.data.openId, 'openid获取成功')
                }
              },
              function (error) {
                console.log('error:', error)
                if (that.cardApplyCallBack) {
                  console.log('cardApplyCallBack 。。。获取openid失败')
                  // that.cardApplyCallBack()
                  netManager.layer(error)
                }
              }
            )
          } else {
            console.log('app.wxLogin->success without code')
          }
        },
        fail: function (error) {
          console.log('app onLaunch-> wx.login -> fail');
        }
      })
    },

    sysLogin: function () {
      let that = this
      let uid = that.data.unionId
      let oid = that.data.openId
      if (!oid) {
        console.log('app.login->uid or oid is null')
      } else {
        netManager.login(oid, uid,
          function (info) {
            console.log('sys.login->info', info)
            if (info.id > 0) {
              that.data.userId = info.id
              console.log('sys.login->id', that.data.userId)

              if (that.data.homeCallback) {
                that.data.homeCallback(info.needGuide)
              }

              //that.checkInfo()

              console.log('登录太仆之后的数据。。。', that.data)
            } else {
              console.log('sys.login->info->userId = 0')
            }
          },
          function (error) {
            console.log('sys.login->info->fail', error)
          }
        )
      }
    },

    authorUserInfo: function (successCallBack, failCallBack) {
      let that = this
      wx.getUserInfo({
        success: function (res) {
          console.log('app.authorUserInfo->success:', res)
          console.log('app.authorUserInfo->success:', that.data.userId)
          that.data.userInfo = res.userInfo
          that.checkInfo()

          if (successCallBack) {
            successCallBack()
          }
        },
        fail: function (error) {
          console.log('refuse wx author')
          that.data.refuseAuthSetting = true
          if (failCallBack) { failCallBack() }
        }
      })
    },

    checkAuthor: function (successCallBack, failCallBack) {
      let refuseAuthor = this.data.refuseAuthSetting
      let userId = this.data.userId
      let userInfo = this.data.userInfo
      if (userId && userInfo && !refuseAuthor) {
        if (successCallBack) { successCallBack() }
      } else {
        if (failCallBack) { failCallBack() }
      }
    },

    changeSetting: function (beforeAthor, successCallBack, failCallBack) {
      let that = this
      console.log('打开授权设置页面。。。。')
      wx.openSetting({
        success: function (data) {
          console.log('opensetting成功。。。。', data)
          if (data) {
            if (data.authSetting["scope.userInfo"] == true) {
              that.data.refuseAuthSetting = false
              if (beforeAthor) {
                beforeAthor()
              }
              that.authorUserInfo(successCallBack, failCallBack)
            } else {
              that.data.refuseAuthSetting = true
              if (failCallBack) { failCallBack() }
            }
          } else {
            if (failCallBack) { failCallBack() }
          }
        },
        fail: function () {
          console.log('opensetting失败。。。。')
          if (failCallBack) { failCallBack() }
        },
        complete: function () {
          console.log('opensetting完成。。。。')
        }
      });
    },

    checkInfo: function () {
      let that = this
      let info = {}
      info.avatar = that.data.userInfo.avatarUrl
      info.city = that.data.userInfo.city
      info.country = that.data.userInfo.country
      info.gender = that.data.userInfo.gender
      info.language = that.data.userInfo.language
      info.nickname = that.data.userInfo.nickName
      info.province = that.data.userInfo.province
      info.userId = that.data.userId

      netManager.checkUserInfo(info,
        function (res) {
          console.log('userInfo check success----->', res)
        },
        function (error) {
          console.log('userInfo check fail----->', error)
        }
      )
    },
});