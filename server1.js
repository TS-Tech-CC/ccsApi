var http = require('http');
var express = require('express');
var sio = require('socket.io');
var app = express();
app.use(express.static(__dirname + '/'));
var server = http.createServer(app);
server.listen(3001, '127.0.0.1');
var io = sio.listen(server);
var users = [];
io.sockets.on('connection', function(socket) {
    console.log('a socket is connect, id: ' + socket.id);
    io.sockets.emit('conn', socket.id);
});
setInterval(function() {
    console.log('推送消息');
    io.sockets.emit('conn', '推送消息');
}, 1000);