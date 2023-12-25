const mysql = require('mysql')


// 创建连接
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'blog'
})

// 开始连接
con.connect()

// 执行sql
const sql = "UPDATE users SET realname='李四5' WHERE id=5;"
con.query(sql, (err, res) => {
  if (err) {
    console.log(err);
    return
  }
  console.log(res);
})

// 关闭连接
con.end()