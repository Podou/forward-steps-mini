'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _qcloud = require('../../qcloud');

var _qcloud2 = _interopRequireDefault(_qcloud);

var _login = require('./controllers/login');

var _login2 = _interopRequireDefault(_login);

var _user = require('./controllers/user');

var _user2 = _interopRequireDefault(_user);

var _upload = require('./controllers/upload');

var _upload2 = _interopRequireDefault(_upload);

var _tunnel = require('./controllers/tunnel');

var _tunnel2 = _interopRequireDefault(_tunnel);

var _message = require('./controllers/message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _qcloud$auth = _qcloud2.default.auth,
    authorizationMiddleware = _qcloud$auth.authorizationMiddleware,
    validationMiddleware = _qcloud$auth.validationMiddleware;

exports.default = function (router) {
  // 登录接口
  router.get('/login', authorizationMiddleware, _login2.default);
  // 用户信息接口（可以用来验证登录态）
  router.get('/user', validationMiddleware, _user2.default);

  // --- 图片上传 Demo --- //
  // 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
  router.post('/upload', _upload2.default);

  // --- 信道服务接口 Demo --- //
  // GET  用来响应请求信道地址的
  router.get('/tunnel', _tunnel2.default.get);
  // POST 用来处理信道传递过来的消息
  router.post('/tunnel', _tunnel2.default.post);

  // --- 客服消息接口 Demo --- //
  // GET  用来响应小程序后台配置时发送的验证请求
  router.get('/message', _message2.default.get);
  // POST 用来处理微信转发过来的客服消息
  router.post('/message', _message2.default.post);
};