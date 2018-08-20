import qcloud from '../../qcloud';
import { getInformations, createInformation } from './controller';

const { auth: { validationMiddleware } } = qcloud;

export default (router) => {
  // 用户信息接口（可以用来验证登录态）
  router.get('/informations', validationMiddleware, getInformations);
  router.post('/information', validationMiddleware, createInformation);
};
