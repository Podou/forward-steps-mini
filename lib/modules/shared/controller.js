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

var _qcloud = require('../../qcloud');

var _qcloud2 = _interopRequireDefault(_qcloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysql = _qcloud2.default.mysql;

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var _ctx$request$body, openId, data, sessionKeys, sessionKey, pc, groupInfo, openGId, appid, sharedGroupInfo, sharedGroups;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, openId = _ctx$request$body.openId, data = _ctx$request$body.data;
            _context.next = 3;
            return mysql('cSessionInfo').select('session_key').where('open_id', openId);

          case 3:
            sessionKeys = _context.sent;

            if (!(sessionKeys && sessionKeys.length > 0)) {
              _context.next = 21;
              break;
            }

            sessionKey = sessionKeys[0].session_key;
            pc = new _WXBizDataCrypt2.default(_config2.default.appId, sessionKey);
            // { openGId: 'GH6D20Mv3F6YRinFChZXnf3TOOOQ',
            //   watermark: { timestamp: 1530889060, appid: 'wx8f50b613d2ea6dca' } }

            groupInfo = pc.decryptData(data.encryptedData, data.iv);
            openGId = groupInfo.openGId, appid = groupInfo.watermark.appid;
            sharedGroupInfo = {
              openId: openId,
              openGId: openGId,
              appid: appid,
              createTimeStamp: new Date().getTime()
            };
            _context.next = 12;
            return mysql('sharedGroup').select('*').where('openId', openId).andWhere('openGId', openGId);

          case 12:
            sharedGroups = _context.sent;

            if (!(sharedGroups && sharedGroups.length > 0)) {
              _context.next = 18;
              break;
            }

            _context.next = 16;
            return mysql('sharedGroup').update('timestamp', new Date().getTime()).where('openId', openId).andWhere('openGId', openGId);

          case 16:
            _context.next = 20;
            break;

          case 18:
            _context.next = 20;
            return mysql('sharedGroup').insert(sharedGroupInfo);

          case 20:
            ctx.state.data = groupInfo;

          case 21:
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