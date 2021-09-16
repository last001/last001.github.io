const express = require('express');
const router = express.Router();
const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');
const url = require("url");
const multer = require('multer')
const upload = multer({dest: __dirname + '../updataURL'})

// 登陆 返回  GET请求
router.get('/login', (req, res) => {
  let sqlstr = "select * from home where userName = ?";
  let params = url.parse(req.url, true).query;
  let conn = new DBHelper().getConn();
  console.log("params ==>", params);
  conn.query(sqlstr, [params.userName], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      console.log("result ==>", result.length);
      // 用户已存在
      if (result.length == 0) {
        return res.json({
          msg: "用户不存在",
          code: 204
        });
      } else {
        // 登陆成功
        if (result[0].userName == params.userName && result[0].passWord == params.passWord) {
          return res.json({
            msg: "登陆成功",
            code: 200,
            userInfo: result[0]
          });
        } else {
          // 密码不正确
          return res.json({
            msg: "用户名或者账号不正确",
            code: 204
          });
        }
      }
    }
  })
  conn.end();
})

// 注册用户 不存在 添加  存在 return
router.post('/addUser', (req, res) => {
  // console.log("sql ==>",sql)
  // let sqlStr = sql.user.add;
  let sqlstr = "select * from home where userName = ?";
  let params = req.body;
  console.log("params ==>", params);
  let conn = new DBHelper().getConn();
  conn.query(sqlstr, [params.userName], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      console.log("result ==>", result.length);
      if (result.length > 0) {
        // 存在
        res.json({
          msg: "注册用户已存在",
          code: 204
        })
      } else {
        // 注册成功
        let sqlstr1 = "insert into home(userName, passWord,age,gender) values (?, ?,?,?)";
        let params = req.body;
        let conn = new DBHelper().getConn();
        conn.query(sqlstr1, [params.userName, params.passWord, params.age, params.gender], (err, result) => {
          if (err) {
            return res.json(err);
          } else {
            res.json({
              msg: "注册成功",
              code: 200
            });
          }
        });
      }
    }
  });
  conn.end();
});

// 查询用户
router.post('/selectUser', (req, res) => {
  let sqlStr = sql.user.select;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.userName], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      let data = {
        code: 200,
        msg: "查询成功",
        tableList: result,
      }
      if (result.length > 0) {
        res.json(data);
      } else {
        data.code = 201
        data.msg = "不存在该用户名"
        data.tableList = [];
        res.json(data);
      }
    }
  });
  conn.end();
});

// 删除用户
router.post("/deleteUser", (req, res) => {
  let sqlStr = sql.user.deleteUser;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.userName], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (params.userName == "") {
        res.json({
          code: 201,
          msg: "请输入要删除的用户名",
        });
        return;
      }
      if (result.length == 0) {
        res.json(result);
      } else {
        res.json(result);
      }
    }
  })
  conn.end();
})

// 修改密码
router.post('/changePassWord', (req, res) => {
  let sqlstr = `update home set passWord=? where userName = ?`;
  let params = req.body;
  let conn = new DBHelper().getConn();
  // console.log("params ==>",params);
  conn.query(sqlstr, [params.passWord, params.userName], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      console.log("result ==>", result);
      if (result.affectedRows > 0) {
        return res.json({
          msg: "修改成功",
          code: 200
        })
      } else {
        return res.json({
          msg: "修改失败",
          code: 204
        })
      }
    }
  })
  conn.end();
})

// 上传img
router.post('/updataURL',upload.single('file'), (req, res) => {
  var file = req.file
  // res.send(file);
  console.log("file ==>",file);
})

module.exports = router;
