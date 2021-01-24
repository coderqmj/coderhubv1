const connections = require('../app/database');
class AuthService {
  // 1.验证是否有修改评论查询
  async checkMoment(momentId, userId) {
    const statementMoent = `
      select user_id from moment where id = ? and user_id = ?;
    `
    const [result] = await connections.execute(statementMoent, [momentId, userId]);
    return result.length ? true : false;
  }
}

module.exports = new AuthService();