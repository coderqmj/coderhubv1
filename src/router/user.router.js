const Router = require('koa-router');
const userRouter = new Router({prefix: '/users'});
const {
  create
} = require('../controller/user.controller');
const {
  verifyUser
} = require('../middleware/user.middleware')

// 如果前端没有把用户名和密码传入,或者用户名已经有了，那么后端需要做验证，逻辑放在中间件中
userRouter.post('/', verifyUser, create)

module.exports = userRouter;