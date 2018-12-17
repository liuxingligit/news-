// 1. 导包
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
// 2. 配置
const app = express();
// <1>处理自己的静态资源
app.use('/public', express.static("./public"));
app.use('/node_modules', express.static("./node_modules"));
// <2>统一处理第三方资源
app.use("/node_modules", express.static("./node_modules"));
// <3>配置模板引擎
app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({
    extended: false
}));
// <4>处理body-parser包
app.use(bodyParser.json());

// 3. 挂载路由
app.use(router);

// 4. 监听端口
app.listen(56789, () => {
    console.log('--zz--');
})

