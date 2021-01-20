const jwt = require('jsonwebtoken');
const {
  PRIVATE_KEY
} = require('../app/config');
class AuthController {
  /**
   * @description 非对称性加密生成token
   * @param {*} ctx 
   * @param {*} next 
   */
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    });

    ctx.body = {
      id,
      name,
      token
    };
  }

  /**
   * @description 验证token成功之后的控制器
   * @param {*} ctx 
   * @param {*} next 
   */
  async success(ctx, next) {
    ctx.body = "授权成功"
  }
}

module.exports = new AuthController();