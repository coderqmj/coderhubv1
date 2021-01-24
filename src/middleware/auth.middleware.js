const service = require('../service/user.service');
const authService = require('../service/auth.service');
const errorTypes = require('../constants/error-types');
const md5password = require('../utils/password-handle');
const jwt = require('jsonwebtoken');
const {
  PUBLIC_KEY
} = require('../app/config')

// 验证登录密码
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

  ctx.user = user;
  await next();
}

// 验证token
const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware~");

  // 1.获取token
  const authorization = ctx.headers.authorization;  // 存储在头部字段中
  const token = authorization.replace('Bearer ', ''); // 将头部字段中的Bearer 去除，只取token相关

  // 2.验证token 需要拿到公钥 传入token，公钥，加密算法，返回结果里面有生成token的id，name信息
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }

}

const verifyPermission = async (ctx, next) => {
  console.log("验证是否具有操作权限middleware~");
  // 1.获取参数
  const { momentId } = ctx.params;
  const { id } = ctx.user;

  // 2.查询是否具有权限
  try {
    const isPermission = await authService.checkMoment(momentId, id);
    if(!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errorTypes.NO_OPERATION);
    return ctx.app.emit('error', error, ctx);
  }
  // if(!isPermission) {
   
  // }
  // await next();
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}