// 1. 导包
const mysql = require('mysql');
// 2. 配置
const connection = mysql.createConnection({
    // 主机
    host: 'localhost',
    // 用户名
    user: 'root',
    // 密码
    password: 'root',
    // 数据库名字
    database: 'news'
});

// 3. 开启连接
connection.connect();

// 渲染登录页面
exports.showSignin = (req, res) => {

    res.render("signin.html");

};

// 处理登录的请求
exports.handleSignin = (req, res) => {
    const body = req.body;
    // 2. 先验证邮箱
    /**
     * 1.  安包mysql
     * 2.  配置
     * 3.  查询数据库
     */
    const sqlstr = 'SELECT *FROM `users` WHERE email=?';
    connection.query(sqlstr, body.email, (err, data) => {
        if (err) {
            throw err;
        }
        // console.log(data);
        // 如果邮箱没有 data=[]
        if (data.length === 0) {
            // console.log("邮箱不存在");
            res.send({
                code: 1,
                msg: "邮箱不存在"
            });

        }

        // console.log(data);

        // 3. 验证该邮箱对应数据的密码是否正确
        // 判断数据库的密码和body.password
        if (data[0].password !== body.password) {
            return res.send({
                code: 2,
                msg: "密码错误"
            })
        }

        // 4. 返回200状态码
        res.send({
            code: 200,
            msg: "可以登录啦!!!好开心"
        })

    })
}