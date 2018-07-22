import * as controller from './controller';

const prefix = '/pay';

export default (router) => {
  router.post(`${prefix}/unifiedorder`, controller.unifiedorder);
  router.post(`${prefix}/notify`, controller.notify);
};
