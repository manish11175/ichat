const socket=io('http://localhost:8000');
const form =document.getElementById('send-container');
const message=document.getElementById('messageInp')
const messageConatiner=document.querySelector(".container")
var audio=new Audio('ring.mp3');

const append=(message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageConatiner.append(messageElement);
    if(position=='left'){

        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =  messageInp.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageInp.value=''
})
const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

socket.on('user-joined', name =>{
    append(` ${name} joined the chat`, 'right')
})

socket.on('receive', data=>{
    append(` ${data.name}: ${data.message} `, 'left')
})

socket.on('left', data=>{
    append(` ${data.name} left the chat `, 'left')
})