const service = require('../service/user.service');
const errorTypes = require('../constants/error-types');
const md5password = require('../utils/password-handle');

const verifyLogin = async (ctx, next) => {
  // 1.获取用户名密码
  const { name, password } = ctx.request.body;
  // 2.判断用户名密码是否为空
  if (!name || !password || name === '' || password === '') {
    // 处理错误类型的时候不应该每一个写死，应该定义常量
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 3.判断用户是否存在
  const result = await service.getUserByName(name);
  const user = result[0];
  // 是一个数组，有长度就代表存在
  if (!user) {
    const error = new Error(errorTypes.USER_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  // 4.判断密码是否匹配
  // 因为两个使用的时相同的加密算法，所以获取到数据库查询到的password用同样的加密算法进行比较
  const { PASSWORD } = result[0];
  const inputPassword = md5password(password);
  if (PASSWORD !== inputPassword) {
    const error = new Error(errorTypes.ERROR_PASSWORD);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

module.exports = {
  verifyLogin
}