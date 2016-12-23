let express = require('express');
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let ids=[];
let init_message=[
  { id: '관리자', data: '이유없는 배고픔은' },
  { id: '관리자', data: '밥을 먹으면 해결됩니다.' }
];

app.use( express.static('./') );


io.on('connection',(client) => {
  console.log(`클라이언트 접속: ${client.id}`);
  client.on('get_id',(id)=>{
    if(!ids.includes(id)){
      ids.push(id);
      console.log(ids);
      client.emit('init',init_message);
    }else{
      client.emit('fail2id','ㅠㅠ');
    }
  });

  client.on('change_id',(data) =>{
    if(!ids.includes(data.will)){
      ids.push(data.will);
      ids.splice(ids.indexOf(data.current),1);
      console.log(ids);
      client.emit('change_result',{id:data.will,result:true});
    }else{
      client.emit('change_result',{id:data.will,result:false});
    }
  });


  client.on('form_client',(data) => {
    console.log(data);
    init_message.push(data);
    io.emit('from_server', data);
  });


  client.on('disconnect', (client) => {
    console.log(`틀라이언트 접속 해제: ${client.id}`);
  });
});


http.listen(3000,()=>{
  console.log('listening on *:3000');
});
