const commentService = require('../service/comment.service');
class commnetController {
  // 添加评论
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

  // 回复评论
  async reply(ctx, next) {
    const { content, momentId } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await commentService.reply(momentId, content, id, commentId);
    ctx.body = result;
  }

    // 修改评论
    async modify(ctx, next) {
      const { content } = ctx.request.body;
      const { commentId } = ctx.params;
      const result = await commentService.modify(content, commentId);
      console.log('aa')
      ctx.body = result;
    }

    // 删除评论
    async remove(ctx, next) {
      const { content, momentId } = ctx.request.body;
      const { commentId } = ctx.params;
      const { id } = ctx.user;
      const result = await commentService.reply(momentId, content, id, commentId);
      ctx.body = result;
    }
}

module.exports = new commnetController();