const express=require('express');
const path=require('path');
const io=require('socket.io')(3000);

const app=express();

app.use(express.static(path.join(__dirname,'public'))); 

var users={};

io.on('connection',socket=>{
   
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('sent',{message:message,name:users[socket.id]});
    });

    socket.on('disconnect',info=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete(users[socket.id]);
    })

});
