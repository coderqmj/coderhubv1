const Router = require('koa-router');
const {
  verifyAuth
} = require('../middleware/auth.middleware');
const {
  create,
  detail,
  list
} = require('../controller/moment.controller');

const momentRouter = new Router({prefix: '/moment'});

momentRouter.post('/', verifyAuth, create);
// 根据id查看某一条动态
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);


module.exports = momentRouter;