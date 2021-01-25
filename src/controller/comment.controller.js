const commentService = require('../service/comment.service');
const commnetService = require('../service/comment.service');
class commnetController {
  async createComment(ctx, next) {
    console.log('来到评论控制器~')
    // 1.获取参数
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;
    // 2.执行SQL语句
    const result = await commentService.create(content, momentId, id);
    // 3.返回结果
    ctx.body = result;
  }
}

module.exports = new commnetController();