/**
 * My Router
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import Navigo from 'navigo';

const Router = {
  router: null,
  getRouter() {
    if (!this.router) {
      this.router = new Navigo('/', false);
    }
    return this.router;
  },
};

export default Router;
