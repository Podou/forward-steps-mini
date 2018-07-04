'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
  router.post('/version', _version2.default);
};