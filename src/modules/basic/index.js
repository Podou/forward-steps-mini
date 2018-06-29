import qcloud from '../../qcloud';

import login from './controllers/login';
import user from './controllers/user';
import upload from './controllers/upload';
import tunnel from './controllers/tunnel';
import message from './controllers/message';


const { auth: { authorizationMiddleware, validationMiddleware } } = qcloud;

export default (router) => {
  // 登录接口
  router.get('/login', authorizationMiddleware, login);
  // 用户信息接口（可以用来验证登录态）
  router.get('/user', validationMiddleware, user);

  // --- 图片上传 Demo --- //
  // 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
  router.post('/upload', upload);

  // --- 信道服务接口 Demo --- //
  // GET  用来响应请求信道地址的
  router.get('/tunnel', tunnel.get);
  // POST 用来处理信道传递过来的消息
  router.post('/tunnel', tunnel.post);

  // --- 客服消息接口 Demo --- //
  // GET  用来响应小程序后台配置时发送的验证请求
  router.get('/message', message.get);
  // POST 用来处理微信转发过来的客服消息
  router.post('/message', message.post);
};
