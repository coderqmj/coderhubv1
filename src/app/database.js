const mysql = require('mysql2');
const config = require('./config');

const connections = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'coderhub',
  user: 'coderqmj',
  password: 'Qmj19980401..'
})

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if(err) {
      console.log('连接失败');
    }else {
      console.log('连接成功~');
    }
  })
})

module.exports = connections.promise();