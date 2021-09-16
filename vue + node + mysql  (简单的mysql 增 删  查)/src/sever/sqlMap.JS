// sql语句
var sqlMap = {
    user: {
        // 添加用户
        // add: 'insert into home(userName, passWord,age,gender) values (?, ?,?,?)',
        // 查询用户
        select: 'select * from home where userName like "%"?"%"',
        // 删除用户
        deleteUser:'delete from home where userName=?'
    }
}

module.exports = sqlMap;