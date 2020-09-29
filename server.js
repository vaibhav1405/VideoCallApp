const express = require("express");
const app = express();
const server = require('http').Server(app);
const ejs = require('ejs');
const {v4:uuidv4} = require('uuid');
const io = require('socket.io')(server);
app.set('view engine','ejs');
app.use(express.static('public'))

const {ExpressPeerServer} = require('peer');
const peerServer = ExpressPeerServer(server,{
        debug:true
    });
    app.use('/peerjs',peerServer)
app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`);
})
app.get('/:room',(req,res)=>{
    res.render('room',{roomId:req.params.room})
})
io.on('connection',socket =>{
    socket.on('join-room',(roomId,userId)=>{
    
        socket.join(roomId);
        // console.log(roomId);
        console.log("server",userId);

        socket.to(roomId).broadcast.emit('user-connected',userId);
        socket.on('message',message=>{
            io.to(roomId).emit('createMessage',message);
        })
         socket.on('disconnect', () => {
             socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
    })
})

server.listen(3030);
