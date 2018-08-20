'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderId = exports.getOrderPayload = exports.getPaymentSign = exports.getSign = exports.getNonceStr = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _crypto = require('../../utils/crypto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNonceStr = function getNonceStr() {
  return (0, _v2.default)().replace(/-/g, '').toUpperCase();
};

var getSign = function getSign() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var mchKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var params = [];
  var keys = (0, _keys2.default)(options).sort();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      params.push(key + '=' + options[key]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var stringA = params.join('&');
  var stringSignTemp = mchKey ? stringA + '&key=' + mchKey : mchKey;
  return (0, _crypto.md5)(stringSignTemp).toUpperCase();
};

var getPaymentSign = function getPaymentSign(options, appId) {
  var mchKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var signOptions = (0, _assign2.default)({ appId: appId }, options);
  return getSign(signOptions, mchKey);
};

var getOrderId = function getOrderId() {
  var random = Math.floor(Math.random() * 100000);
  return '' + (0, _moment2.default)().format('YYYYMMDDHHmmssSSS') + random;
};

/**
  <xml>
    <appid>wx2421b1c4370ec43b</appid>
    <attach>支付测试</attach>
    <body>JSAPI支付测试</body>
    <mch_id>10000100</mch_id>
    <detail><![CDATA[{ "goods_detail":[
      { "goods_id":"iphone6s_16G", "wxpay_goods_id":"1001", "goods_name":"iPhone6s 16G",
      "quantity":1, "price":528800, "goods_category":"123456", "body":"苹果手机" },
      { "goods_id":"iphone6s_32G", "wxpay_goods_id":"1002", "goods_name":"iPhone6s 32G",
      "quantity":1, "price":608800, "goods_category":"123789", "body":"苹果手机" } ] }]]></detail>
    <nonce_str>1add1a30ac87aa2db72f57a2375d8fec</nonce_str>
    <notify_url>http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php</notify_url>
    <openid>oUpF8uMuAJO_M2pxb1Q9zNjWeS6o</openid>
    <out_trade_no>1415659990</out_trade_no>
    <spbill_create_ip>14.23.150.211</spbill_create_ip>
    <total_fee>1</total_fee>
    <trade_type>JSAPI</trade_type>
    <sign>0CB01533B8C1EF103065174F50BCA001</sign>
  </xml>
*/
var getOrderPayload = function getOrderPayload() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var content = '<appid>' + options.appid + '</appid>';
  if (options.attach) {
    content += '<attach>' + options.attach + '</attach>';
  }
  content += '<body>' + options.body + '</body>';
  content += '<mch_id>' + options.mch_id + '</mch_id>';
  if (options.detail) {
    content += '<detail>' + options.detail + '</detail>';
  }
  content += '<nonce_str>' + options.nonce_str + '</nonce_str>';
  content += '<notify_url>' + options.notify_url + '</notify_url>';
  content += '<openid>' + options.openid + '</openid>';
  content += '<out_trade_no>' + options.out_trade_no + '</out_trade_no>';
  content += '<spbill_create_ip>' + options.spbill_create_ip + '</spbill_create_ip>';
  content += '<total_fee>' + options.total_fee + '</total_fee>';
  content += '<trade_type>' + options.trade_type + '</trade_type>';
  content += '<sign>' + options.sign + '</sign>';
  return '<xml>' + content + '</xml>';
};

exports.getNonceStr = getNonceStr;
exports.getSign = getSign;
exports.getPaymentSign = getPaymentSign;
exports.getOrderPayload = getOrderPayload;
exports.getOrderId = getOrderId;