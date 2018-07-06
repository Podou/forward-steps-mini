'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _WXBizDataCrypt = require('../../utils/WXBizDataCrypt');

var _WXBizDataCrypt2 = _interopRequireDefault(_WXBizDataCrypt);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var _ctx$request, _ctx$request$body, openId, data, header, sessionKey, pc, groupInfo;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request = ctx.request, _ctx$request$body = _ctx$request.body, openId = _ctx$request$body.openId, data = _ctx$request$body.data, header = _ctx$request.header;
            sessionKey = header['x-wx-skey'];

            console.log(openId, data.encryptedData, sessionKey);
            pc = new _WXBizDataCrypt2.default(_config2.default.appId, sessionKey);
            groupInfo = pc.decryptData(data.encryptedData, data.iv);

            ctx.state.data = groupInfo;

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();