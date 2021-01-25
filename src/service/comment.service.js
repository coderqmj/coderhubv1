const connection = require('../app/database');
class commentService {
  async create(content, momentId, userId) {
    console.log(content, momentId, userId)
    const statement = `insert into comment (content, moment_id, user_id) values (?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId]);
    return result;
  }
}

module.exports = new commentService();