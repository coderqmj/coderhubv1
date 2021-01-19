const jwt = require('jsonwebtoken');

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({id, name});

    const { name } = ctx.request.body;
    ctx.body = `登录成功，欢迎${name}~`;
  }
}

module.exports = new AuthController();