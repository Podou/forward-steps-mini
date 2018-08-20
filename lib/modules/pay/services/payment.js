'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notify = exports.placeOrder = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _paymentApi = require('./paymentApi');

var paymentApi = _interopRequireWildcard(_paymentApi);

var _qcloud = require('../../../qcloud');

var _qcloud2 = _interopRequireDefault(_qcloud);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 订单和数据的相关处理
 */

var mysql = _qcloud2.default.mysql;

var STATUS_WAITING_PAY = 'STATUS_WAITING_PAY';
var STATUS_PLACE_FAIL = 'STATUS_PLACE_FAIL';
// const STATUS_END_WITHOUT_PAY = 'STATUS_END_WITHOUT_PAY';
// const STATUS_ENDT_WITH_PAY = 'STATUS_ENDT_WITH_PAY';
// const STATUS_REFUND = 'STATUS_REFUND';
// const STATUS_APPLY_REFUND = 'STATUS_APPLY_REFUND';

var placeOrder = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(openId) {
    var options, orderResult, saveOptions, paymentOptions;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = paymentApi.getPlaceOrderOptions(openId);
            _context.next = 3;
            return paymentApi.placeOrder(options);

          case 3:
            orderResult = _context.sent;
            saveOptions = {
              open_id: options.openid,
              app_id: options.appid,
              mch_id: options.mch_id,
              nonce_str: options.nonce_str,
              body: options.body,
              detail: options.detail,
              attach: options.attach,
              out_trade_no: options.out_trade_no,
              total_fee: options.total_fee,
              spbill_create_ip: options.spbill_create_ip,
              notify_url: options.notify_url,
              trade_type: options.trade_type,
              status: STATUS_WAITING_PAY,
              time_place_order: new Date().getTime()
            };


            if (orderResult.return_code === 'SUCCESS') {
              saveOptions.prepay_id = orderResult.prepay_id;
            } else {
              saveOptions.status = STATUS_PLACE_FAIL;
            }

            paymentOptions = paymentApi.getPaymentPayload(orderResult);
            _context.next = 9;
            return mysql('payment').insert(saveOptions);

          case 9:
            return _context.abrupt('return', paymentOptions);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function placeOrder(_x) {
    return _ref.apply(this, arguments);
  };
}();

var notify = function notify() {};

exports.placeOrder = placeOrder;
exports.notify = notify;