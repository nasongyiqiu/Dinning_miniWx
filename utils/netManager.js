let isPhone = (phone) => {
  let reg = /^((13[0-9])|(166)|(17[0-1,6-8])|(15[0-9])|(18[0-9])|(19[8-9]))\d{8}$/;
  if (reg.test(phone)) {
    return true
  } else {
    return false
  }
}

let makePhoneCall = (number) => {
  wx.makePhoneCall({
    phoneNumber: number
  })
}


module.exports = {
  isPhone: isPhone,
  makePhoneCall: makePhoneCall
}