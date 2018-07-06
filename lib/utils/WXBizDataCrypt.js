'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WXBizDataCrypt = function () {
  function WXBizDataCrypt(appId, sessionKey) {
    (0, _classCallCheck3.default)(this, WXBizDataCrypt);

    this.appId = appId;
    this.sessionKey = sessionKey;
  }

  (0, _createClass3.default)(WXBizDataCrypt, [{
    key: 'decryptData',
    value: function decryptData(encrypted, iv) {
      // base64 decode
      var sessionKey = new Buffer(this.sessionKey, 'base64');
      var encryptedData = new Buffer(encrypted, 'base64');
      var newIv = new Buffer(iv, 'base64');
      var decoded = {};
      try {
        // 解密
        var decipher = _crypto2.default.createDecipheriv('aes-128-cbc', sessionKey, newIv);
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true);
        decoded = decipher.update(encryptedData, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        console.log(decoded);
        decoded = JSON.parse(decoded);
      } catch (err) {
        throw new Error('Illegal Buffer');
      }

      if (decoded && decoded.watermark && decoded.watermark.appid !== this.appId) {
        console.log('ssssss');
        throw new Error('Illegal Buffer');
      }

      return decoded;
    }
  }]);
  return WXBizDataCrypt;
}();

exports.default = WXBizDataCrypt;