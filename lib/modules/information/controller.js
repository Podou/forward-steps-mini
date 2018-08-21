'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInformations = exports.createInformation = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _services = require('./services');

var services = _interopRequireWildcard(_services);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createInformation = exports.createInformation = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var body, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;
            _context.prev = 1;
            _context.next = 4;
            return services.createInformation(body);

          case 4:
            response = _context.sent;

            ctx.state.data = response;
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](1);

            ctx.state.data = _context.t0.message;

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function createInformation(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getInformations = exports.getInformations = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
    var _ctx$query, openId, start, count, response;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ctx$query = ctx.query, openId = _ctx$query.openId, start = _ctx$query.start, count = _ctx$query.count;
            _context2.prev = 1;
            _context2.next = 4;
            return services.getInformations(openId, parseInt(start, 10), parseInt(count, 10));

          case 4:
            response = _context2.sent;

            ctx.state.data = response;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](1);

            ctx.state.data = _context2.t0.message;

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 8]]);
  }));

  return function getInformations(_x2) {
    return _ref2.apply(this, arguments);
  };
}();