const Router = require('koa-router');
const { 
  createComment
} = require('../controller/comment.controller');
const {
  verifyAuth
}  = require('../middleware/auth.middleware');

const commentRouter = new Router({prefix: '/comment'});

commentRouter.post('/', verifyAuth, createComment)

module.exports = commentRouter;