const service = require('../service/moment.service');

class momentController {
  async create (ctx, next) {
    // 1.获取数据(user_id, content, picture)
    const userId = ctx.user.id;
    const obj = ctx.request.body;

    const {content} = obj;
    console.log(userId, content)
    const result = await service.create(userId, content);

    ctx.body = result;
  }

  async detail (ctx, next) {
    // const momentId = ctx.request.body;
    // 1.获取动态的Id
    const momentId = ctx.params.momentId;

    const result = await service.detail(momentId);

    ctx.body = result[0][0];
  }

  async list (ctx, next) {
    console.log('来了么')
    // 1.获取数据（offset/size）
    const { offset, size } = ctx.query;
    // 2.查询列表
    const result = await service.list(offset, size);

    ctx.body = result[0][0];
  }

}

module.exports= new momentController();