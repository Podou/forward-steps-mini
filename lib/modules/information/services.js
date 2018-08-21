'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteInformation = exports.updateInformation = exports.getInformation = exports.getInformations = exports.createInformation = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _information = require('./models/information');

var _information2 = _interopRequireDefault(_information);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createInformation = exports.createInformation = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var information;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (options.openId) {
              _context.next = 2;
              break;
            }

            throw new Error('Unknow openid');

          case 2:
            if (options.nickName) {
              _context.next = 4;
              break;
            }

            throw new Error('Unknow nick name');

          case 4:
            if (options.message) {
              _context.next = 6;
              break;
            }

            throw new Error('Unknow message');

          case 6:
            _context.prev = 6;
            information = {
              openId: options.openId,
              nickName: options.nickName,
              message: options.message,
              createTime: new Date().getTime(),
              updateTime: new Date().getTime()
            };
            _context.next = 10;
            return _information2.default.create(information);

          case 10:
            return _context.abrupt('return', _context.sent);

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](6);
            throw _context.t0;

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[6, 13]]);
  }));

  return function createInformation() {
    return _ref.apply(this, arguments);
  };
}();

var getInformations = exports.getInformations = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(openId) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (openId) {
              _context2.next = 2;
              break;
            }

            throw new Error('Unknow openid');

          case 2:
            _context2.next = 4;
            return _information2.default.find({ openId: openId }).skip(start || 0).limit(limit || 10).sort({ createTime: 'desc' });

          case 4:
            return _context2.abrupt('return', _context2.sent);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getInformations(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getInformation = exports.getInformation = function getInformation() {};

var updateInformation = exports.updateInformation = function updateInformation() {};
var deleteInformation = exports.deleteInformation = function deleteInformation() {};