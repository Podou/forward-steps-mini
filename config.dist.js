const CONF = {
  port: '5757',
  rootPathname: 'test',

  // 微信小程序 App ID
  appId: 'wx8f50b613d2ea6dca',

  // 微信小程序 App Secret
  appSecret: '',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: false,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: '*****',
    db: '*****',
    pass: '*****',
    char: 'utf8mb4',
  },

  cos: {
    /**
       * 地区简称
       * @查看 https://cloud.tencent.com/document/product/436/6224
       */
    region: 'ap-guangzhou',
    // Bucket 名称
    fileBucket: 'qcloudtest',
    // 文件夹
    uploadFolder: '/Users/Fernando/Projects/mini/Switch-GO/server',
  },
  serverHost: '22',
  tunnelServerUrl: '22',
  tunnelSignatureKey: '22',
  qcloudAppId: '22',
  qcloudSecretId: '22',
  qcloudSecretKey: '22',

  // 微信登录态有效期
  wxLoginExpires: 7200,
  wxMessageToken: 'abcdefgh',
};

module.exports = CONF;
