let express = require('express');
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use( express.static('./') );

app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',(socket)=>{
  console.log('a user connected');
});

http.listen(3000,()=>{
  console.log('listening on *:3000');
});
