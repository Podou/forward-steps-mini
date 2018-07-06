
import controller from './controller';

const prefix = 'shared';
export default (router) => {
  router.post(`/${prefix}/group`, controller);
  router.post(`/${prefix}/invited`, controller);
};
