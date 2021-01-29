const Router = require('koa-router');
const { 
  createComment,
  reply,
  modify,
  remove
} = require('../controller/comment.controller');
const {
  verifyAuth,
  verifyPermission
}  = require('../middleware/auth.middleware');

const commentRouter = new Router({prefix: '/comment'});

// 添加评论
commentRouter.post('/', verifyAuth, createComment);  
// 回复评论，需要知道动态Id，评论Id，用户Id
commentRouter.post('/:commentId/reply', verifyAuth, reply);
// 修改评论
commentRouter.patch('/:commentId/modify', verifyAuth, modify);
// 删除评论
commentRouter.patch('/:commentId/remove', verifyAuth, remove);

module.exports = commentRouter;