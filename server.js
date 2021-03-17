var app = require('express')();
var http = require('http').Server(app);
var io = require ('socket.io') (http, {cors:{origin: '*',}});
var Redis = require('ioredis');
var redis = new Redis();
var users = [];

http.listen(8005, function ()  {
    console.log('listening to port 8005');
});

redis.subscribe('private-channel', function (){
    console.log('subscribed to private channel');
});

redis.on('message', function (channel, message){
    message = JSON.parse(message);
    console.log(message);
    if (channel == 'private-channel') {
        let data = message.data.data;
        let receiver_id = data.receiver_id;
        let event = message.event;

        io.to(`${users[receiver_id]}`).emit(channel + ':' + message.event, data);
    }
});
io.on('connection', function (socket){

    socket.on('user_connected', function (user_id){
        users[user_id] = socket.id;
        io.emit('updateUserStatus', users);
        console.log('user connected ' + user_id);
        // console.log('socket id '  + socket.id);
    });

});
