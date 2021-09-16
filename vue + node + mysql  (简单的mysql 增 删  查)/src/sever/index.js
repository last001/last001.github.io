// node后端服务器
const http = require('http');
const badyParser = require('body-parser');
const express = require('express');
const userApi = require('./api/userApi');

var bodyParser = require('body-parser');
var multer  = require('multer');

let app = express();
let server = http.createServer(app);

app.use(badyParser.json({
  limit: '10000kb'
}));
app.use(badyParser.urlencoded({
  limit: '10000kb',
  extended: false
}));

app.use('/updataURL', express.static(__dirname + 'updataURL'));
// 创建 application/x-www-form-urlencoded 编码解析
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(multer({
//   dest: '/tmp/'
// }).array('image'));

//采用设置所有均可访问的方法解决跨域问题
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200); //让options尝试请求快速结束
  else
    next();
})

// 后端api路由
app.use('/api/user', userApi);

// 启动监听
server.listen(8888, () => {
  console.log(' success!! port:8888')
})
