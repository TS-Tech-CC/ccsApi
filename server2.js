var http = require('http');
var sio = require('socket.io');
var server = http.createServer();
server.listen(3002, '127.0.0.1');
var io = sio.listen(server);
console.log('简单消息推送服务器运行...');
setInterval(function() {
    io.sockets.emit('conn', '推送内容');
}, 1000);