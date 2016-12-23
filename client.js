let socket = io();
let now = [];
let myid = prompt("아이디를 입력해주세요.");
socket.emit("get_id",myid);

socket.on("fail2id",()=>{
  myid = prompt("아이디를 입력해주세요.");
  socket.emit("get_id",myid);
});

let init_message=[];

function display_init(arr) {
  arr.forEach((ele) =>{
    $('#message').append(`<div class="col-md-12" id="message">${ele.id}: ${ele.data}</div>`);
  });
}

function display_append(ele) {
    $('#message').append(`<div class="col-md-12" id="message">${ele}</div>`);
}

function display_clear() {
    $('#message').text("");
}

$("#change_button").click(()=>{
  //alert($("#change_input").val());
  socket.emit('change_id',{
    current: myid,
    will:$("#change_input").val()
  });
});

socket.on('change_result',(result)=>{
  if(result.result){
    alert("성공:"+result.id);
    myid = result.id;
  }else{
    alert("실페:"+result.id);
  }
});


socket.on('init', (data) =>{
  display_init(data);
  init_message = data;
});

socket.on('from_server',(data)=>{
  console.log(data);
  if(data.id !== myid){
    display_append(data.id +": " + data.data);
    init_message.push(data);
  }
});

$("#my_form").on({
  submit: e =>{
    e.preventDefault();
    display_append(myid + ": " + $("#inputbar").val());
    let obj = {
      id:myid,
      data:$("#inputbar").val()
    };
    init_message.push(obj);
    socket.emit("form_client",obj);
  }
});


// socket.on('welcome message', (data) => {
//   console.log(data.message + '<br>');
// });
//
//
// socket.on('check alive',data => {
//   console.log(data.message);
// });
