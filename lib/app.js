'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _response = require('./middlewares/response');

var _response2 = _interopRequireDefault(_response);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Koa = require('koa')
// const app = new Koa()
// const debug = require('debug')('koa-weapp-demo')
// const response = require('./middlewares/response')
// const bodyParser = require('koa-bodyparser')
// const config = require('./config')

var app = new _koa2.default();
var debug = (0, _debug2.default)('koa-weapp-demo');

// 使用响应处理中间件
app.use(_response2.default);

// 解析请求体
app.use((0, _koaBodyparser2.default)());

// 引入路由分发
// const router = require('./routes');
app.use(_routes2.default.routes());

// 启动程序，监听端口
app.listen(_config2.default.port, function () {
  console.log('listening on port ' + _config2.default.port);
  debug('listening on port ' + _config2.default.port);
});