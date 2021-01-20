const connections = require('../app/database');

class MomentService {
  async create(userId, content) {
    const statement = `insert into moment (content, user_id) values (?,?)`;
    
    const [result] = connections.execute(statement, [content, userId]);

    return result;
  }

  async detail(momentId) {
    console.log()
    console.log("正在查询~···",momentId)
    const statement = `select 
      m.id id, m.content, m.createAt createTime, m.updateAt updateTime,
      json_object('id', u.id, 'name', u.name) user
    from moment m
    left join users u on u.id = m.user_id
    where m.id = ?;`;

    const result = connections.execute(statement, [momentId]);
    console.log("查询成功~")
    return result;
  }

  async list(offset, size) {
    console.log("正在查询~")
    const statement = `select 
      m.id id, m.content, m.createAt createTime, m.updateAt updateTime,
      json_object('id', u.id, 'name', u.name) user
    from moment m
    right join users u on u.id = m.user_id
    limit ?, ?;`;

    const result = connections.execute(statement, [offset, size]);
    console.log("查询成功~")
    return result;
  }
}

module.exports = new MomentService();