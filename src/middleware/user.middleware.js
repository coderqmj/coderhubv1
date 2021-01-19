const errorTypes = require('../constants/error-types');
const service = require('../service/user.service')
const verifyUser = async (ctx, next) => {
  // 1.获取用户名密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名密码不能为空
  if(!name || !password || name === '' || password === '') {
    // 处理错误类型的时候不应该每一个写死，应该定义常量
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error',error, ctx);
  }

  // 3.判断用户没有被注册过
  const result = await service.getUserByName(name);
  // 是一个数组，有长度就代表存在
  if(result.length) {
    const error = new Error(errorTypes.NAME_ALREAD_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  // 只有满足所有条件的时候，才会执行下一个创建用户的中间件
  await next();
}

module.exports = {
  verifyUser
}


