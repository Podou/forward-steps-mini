// const Koa = require('koa')
// const app = new Koa()
// const debug = require('debug')('koa-weapp-demo')
// const response = require('./middlewares/response')
// const bodyParser = require('koa-bodyparser')
// const config = require('./config')

import Koa from 'koa';
import Debug from 'debug';
import response from './middlewares/response';
import bodyParser from 'koa-bodyparser';
import config from './config';

import router from './routes';

const app = new Koa();
const debug = Debug('koa-weapp-demo');


// 使用响应处理中间件
app.use(response);

// 解析请求体
app.use(bodyParser());

// 引入路由分发
// const router = require('./routes');
app.use(router.routes());

// 启动程序，监听端口
app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
  debug(`listening on port ${config.port}`);
});
