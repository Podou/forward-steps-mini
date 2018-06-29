
import version from './version';

export default (router) => {
  router.post('/version', version);
};
