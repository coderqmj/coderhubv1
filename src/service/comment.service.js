const connection = require('../app/database');
class commentService {
  // 发表评论
  async create(content, momentId, userId) {
    const statement = `insert into comment (content, moment_id, user_id) values (?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId]);
    return result;
  }

  // 回复评论
  async reply(momentId, content, userId, commentId) {
    const statement = `insert into comment (content, moment_id, user_id, comment_id) values (?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [content, momentId, userId, commentId]);
    return result;
  }

  async modify(content, commentId) {
    console.log(content, commentId)
    const statement = `update comment set content = ? where id = ?;`
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }
}

module.exports = new commentService();