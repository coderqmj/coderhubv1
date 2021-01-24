const momentService = require('../service/moment.service');
const authService = require('../service/auth.service');

class momentController {
  async create (ctx, next) {
    // 1.获取数据(user_id, content, picture)
    const userId = ctx.user.id;
    const obj = ctx.request.body;

    const {content} = obj;
    console.log(userId, content)
    const result = await momentService.create(userId, content);

    ctx.body = result;
  }

  async detail (ctx, next) {
    // const momentId = ctx.request.body;
    // 1.获取动态的Id
    const momentId = ctx.params.momentId;

    const result = await momentService.detail(momentId);

    ctx.body = result[0][0];
  }

  async list (ctx, next) {
    console.log('来了么')
    // 1.获取数据（offset/size）
    const { offset, size } = ctx.query;
    // 2.查询列表
    const result = await momentService.list(offset, size);

    ctx.body = result[0][0];
  }

  async update(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 2.修改内容
    const result = await momentService.updateMoment(content, momentId);
    ctx.body = result;
  }

  // 删除动态
  async deleteMoment(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params;

    // 2.修改内容
    const result = await momentService.deleteMoment(momentId);
    ctx.body = result;
  }
}

module.exports= new momentController();