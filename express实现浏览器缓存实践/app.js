var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
var serveStatic = require('serve-static')
// 管理静态文件
app.use(serveStatic(path.join(__dirname, 'public'), {
  setHeaders: setCustomCacheControl
}));

function setCustomCacheControl (res, path) {
  switch(serveStatic.mime.lookup(path)) {
    case 'text/html': res.setHeader('Cache-Control', 'public, no-cache'); break;
    case 'application/javascript': res.setHeader('Cache-Control', 'private, max-age=31536000'); break;
    case 'image/jpeg': res.setHeader('Cache-control', 'max-age=864000'); break;
    case 'text/css': res.setHeader('Cache-control', 'max-age:31536000'); break;
  }
}
// 设置模板引擎页面
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('index', { title: '我是标题'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
