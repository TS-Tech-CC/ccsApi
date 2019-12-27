// express 是一个框架
const express = require('express');
// 消息解析体 用于post请求
const bodyParser = require('body-parser');


const app = express();
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);

app.set('port', 8001);


// 设置静态文件托管目录
app.use(express.static('node_modules'));


// json 请求消息体
app.use(bodyParser.json());
// 支持表单请求消息体 x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



//上报管控识别仪状态
app.get('/restful', (req, res, next) => {
     res.send('Hello world');
});

//监听客户端链接,回调函数会传递本次链接的socket
io.on('connection', socket => {
    console.log("已连接");
    // 监听客户端发送的信息
    socket.on("sentToServer", message => {

        // 给客户端返回信息
        io.emit("sendToClient", {message});
    });
    // 监听连接断开事件
    socket.on("disconnect", () => {
        console.log("连接已断开...");
    });
});


server.listen(8002);

app.listen(app.get('port'), () => {
    console.log(`express web app no ${app.get('port')}`);
});


