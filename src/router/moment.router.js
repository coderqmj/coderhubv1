const Router = require('koa-router');
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');
const {
  create,
  detail,
  list,
  update,
  deleteMoment
} = require('../controller/moment.controller');

const momentRouter = new Router({prefix: '/moment'});

momentRouter.post('/', verifyAuth, create);
// 根据id查看某一条动态
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);

// 根据动态id修改动态 1.是否登录 2.是否有权限操作
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, deleteMoment);


module.exports = momentRouter;