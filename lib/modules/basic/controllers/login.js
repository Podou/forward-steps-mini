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

var mysql = _qcloud2.default.mysql;


var saveUserInfo = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
    var userInfo, newUser, existUser;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(user && user.userinfo)) {
              _context.next = 9;
              break;
            }

            userInfo = user.userinfo;
            newUser = {
              openId: userInfo.openId,
              nickName: userInfo.nickName,
              gender: userInfo.gender,
              language: userInfo.language,
              city: userInfo.city,
              province: userInfo.province,
              country: userInfo.country,
              avatarUrl: userInfo.avatarUrl,
              timestamp: userInfo.watermark.timestamp,
              appid: userInfo.watermark.appid,
              createTimeStamp: new Date().getTime()
            };
            _context.next = 5;
            return mysql('user').select('*').where({
              openId: newUser.openId
            });

          case 5:
            existUser = _context.sent;

            if (!(existUser && existUser.length === 0)) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return mysql('user').insert(newUser);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function saveUserInfo(_x) {
    return _ref.apply(this, arguments);
  };
}();

// 登录授权接口

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('======>');
            // 通过 Koa 中间件进行登录之后
            // 登录信息会被存储到 ctx.state.$wxInfo
            // 具体查看：

            if (!ctx.state.$wxInfo.loginState) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return saveUserInfo(ctx.state.$wxInfo.userinfo);

          case 4:
            ctx.state.data = ctx.state.$wxInfo.userinfo;
            console.log('======>', ctx.state.$wxInfo.userinfo);
            ctx.state.data.time = Math.floor(Date.now() / 1000);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();