'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sha256 = exports.md5 = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md5 = function md5(text) {
  return _crypto2.default.createHash('md5').update(text, 'utf8').digest('hex');
};

var sha256 = function sha256(text) {
  return _crypto2.default.createHash('sha256').update(text, 'utf8').digest('hex');
};

exports.md5 = md5;
exports.sha256 = sha256;