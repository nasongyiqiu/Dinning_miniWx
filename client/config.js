/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://123456.qcloud.la';

var sysHost = "https://sys.songna.top:9090";

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    },

    sysService: {
        sysHost,

      //用户登陆
      loginUrl: `${sysHost}/api/open/wx/user/login`,
      checkInfoUrl: `${sysHost}/user/info/check`,
      unionIdUel: `${sysHost}/api/open/wx/auth`,

      //菜系展示
      foodKindSerachUrl: `${sysHost}/api/open/wx/food/kindlist`,

      //菜品展示
      foodDetailSearchUrl: `${sysHost}/api/open/wx/food/detail/list`,
    }
};

module.exports = config;