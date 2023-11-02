const express=require("express");
const app=express();
const http = require('http');
const server = http.createServer(app);
app.use(express.static("src/public"));
// app.use(express.static("node_modules/socket.io/client-dist/"));
const { Server } = require("socket.io");
const io = new Server(server);



app.get("/",(req,res)=>{
    //res.send("Exp");
    res.sendFile(__dirname + '/index.html');
});



  io.on('connection', (socket) => {
    console.log('a user connected');
    
    //socket.broadcast.emit('hi');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });;
      
  });

server.listen(3000,()=>{
    console.log(`App running at http://127.0.0.1:3000`);
});