'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _qcloud = require('../../../qcloud');

var _qcloud2 = _interopRequireDefault(_qcloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkSignature = _qcloud2.default.message.checkSignature;

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */

var get = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var _ctx$query, signature, timestamp, nonce, echostr;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$query = ctx.query, signature = _ctx$query.signature, timestamp = _ctx$query.timestamp, nonce = _ctx$query.nonce, echostr = _ctx$query.echostr;


            if (checkSignature(signature, timestamp, nonce)) {
              ctx.body = echostr;
            } else {
              ctx.body = 'ERR_WHEN_CHECK_SIGNATURE';
            }

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function get(_x) {
    return _ref.apply(this, arguments);
  };
}();

var post = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
    var _ctx$query2, signature, timestamp, nonce;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 检查签名，确认是微信发出的请求
            _ctx$query2 = ctx.query, signature = _ctx$query2.signature, timestamp = _ctx$query2.timestamp, nonce = _ctx$query2.nonce;

            if (!checkSignature(signature, timestamp, nonce)) {
              ctx.body = 'ERR_WHEN_CHECK_SIGNATURE';
            }

            /**
             * 解析微信发送过来的请求体
             * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
             */
            // const body = ctx.request.body;
            ctx.body = 'success';

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function post(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = {
  post: post,
  get: get
};