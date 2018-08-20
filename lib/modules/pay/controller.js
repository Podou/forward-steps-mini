'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unifiedorder = exports.notify = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _payment = require('./services/payment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://api.mch.weixin.qq.com/pay/unifiedorder
var unifiedorder = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var openId, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            openId = ctx.request.body.openId;
            _context.next = 3;
            return (0, _payment.placeOrder)(openId);

          case 3:
            payload = _context.sent;

            ctx.state.data = payload;

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function unifiedorder(_x) {
    return _ref.apply(this, arguments);
  };
}();

var notify = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
    var body;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;

            console.log(body);
            ctx.body = body;

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function notify(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.notify = notify;
exports.unifiedorder = unifiedorder;