const mysql = require("mysql");

class DEBHelper{
    getConn(){
        let conn = mysql.createConnection({
            // 数据库连接
            host:"localhost",
            port:"3306",
            user:"root",
            password:"root",
            database:"ceshi" //数据库名
        })
        conn.connect();
        return conn;
    }
}
module.exports = DEBHelper;