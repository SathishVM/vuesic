import NProgress from 'nprogress';

export default (router) => {
  router.beforeEach((_to, _from, next) => {
    NProgress.start();
    next();
  });

  router.afterEach(NProgress.done);
};
