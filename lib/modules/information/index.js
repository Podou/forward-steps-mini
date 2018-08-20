'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _qcloud = require('../../qcloud');

var _qcloud2 = _interopRequireDefault(_qcloud);

var _controller = require('./controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validationMiddleware = _qcloud2.default.auth.validationMiddleware;

exports.default = function (router) {
  // 用户信息接口（可以用来验证登录态）
  router.get('/informations', validationMiddleware, _controller.getInformations);
  router.post('/information', validationMiddleware, _controller.createInformation);
};