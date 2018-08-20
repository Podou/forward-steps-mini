'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNotify = exports.getPaymentPayload = exports.getPlaceOrderOptions = exports.placeOrder = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _utils = require('../utils');

var payUtils = _interopRequireWildcard(_utils);

var _httpsUtils = require('../../../utils/httpsUtils');

var httpsUtils = _interopRequireWildcard(_httpsUtils);

var _config = require('../../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPaymentPayload = function getPaymentPayload(options) {
  var paymentOptions = {
    timeStamp: String(new Date().getTime()),
    nonceStr: payUtils.getNonceStr(),
    package: 'prepay_id=' + options.prepay_id,
    signType: 'MD5'
  };
  var sign = payUtils.getPaymentSign(paymentOptions, _config2.default.appId, _config2.default.mchKey);
  paymentOptions.paySign = sign;
  return paymentOptions;
};

var getPlaceOrderOptions = function getPlaceOrderOptions(openId) {
  var options = {
    appid: _config2.default.appId,
    mch_id: _config2.default.mchId,
    nonce_str: payUtils.getNonceStr(),
    body: '天才口算-道具',
    detail: '天才口算小道具',
    attach: '天才口算',
    out_trade_no: payUtils.getOrderId(),
    total_fee: 1,
    spbill_create_ip: '192.168.105.99',
    notify_url: 'https://mini.duastone.com/weapp/pay/notify',
    trade_type: 'JSAPI',
    openid: openId
  };
  var sign = payUtils.getSign(options, _config2.default.mchKey);
  options.sign = sign;
  return options;
};

var placeOrder = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
    var requestUrl, payload, res, parser;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requestUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
            payload = payUtils.getOrderPayload(options);
            _context.prev = 2;
            _context.next = 5;
            return httpsUtils.post(requestUrl, payload);

          case 5:
            res = _context.sent;
            parser = new _xml2js2.default.Parser({ explicitArray: false });
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              parser.parseString(res, function (err, result) {
                if (err) {
                  reject(err);
                } else if (result && result.xml) {
                  // resolve(getPaymentPayload(result.xml));
                  resolve(result.xml);
                }
              });
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](2);

            console.log('ssssss');
            console.error(_context.t0);

          case 14:
            return _context.abrupt('return', payload);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 10]]);
  }));

  return function placeOrder(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleNotify = function handleNotify() {};

exports.placeOrder = placeOrder;
exports.getPlaceOrderOptions = getPlaceOrderOptions;
exports.getPaymentPayload = getPaymentPayload;
exports.handleNotify = handleNotify;