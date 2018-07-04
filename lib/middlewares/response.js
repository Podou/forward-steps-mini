"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Debug from 'debug';

// const debug = Debug('koa-weapp-demo');

/**
 * 响应处理模块
 */
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:

            // 处理响应结果
            // 如果直接写入在 body 中，则不作处理
            // 如果写在 ctx.body 为空，则使用 state 作为响应
            ctx.body = ctx.body ? ctx.body : {
              code: ctx.state.code !== undefined ? ctx.state.code : 0,
              data: ctx.state.data !== undefined ? ctx.state.data : {}
            };
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);

            // catch 住全局的错误信息
            // debug('Catch Error: %o', e);

            // 设置状态码为 200 - 服务端错误
            ctx.status = 200;

            // 输出详细的错误信息
            ctx.body = {
              code: -1,
              error: _context.t0 && _context.t0.message ? _context.t0.message : _context.t0.toString()
            };

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 6]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();