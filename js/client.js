const socket=io('http://localhost:3000');

const form=document.getElementById('message');
const input=document.querySelector('.input');
const container=document.querySelector('.container');

const name=prompt("Enter your name to join chat");

const append=(message,position)=>{

    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement);
    container.scrollTop = container.scrollHeight;
};

socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'midd');
});

form.addEventListener('submit',event=>{
    event.preventDefault();
    const msg=input.value;
    append(`You : ${msg}`,'right');
    socket.emit('send',msg);
    input.value='';
})

socket.on('sent',data=>{
    append(`${data.name} : ${data.message}`,'left');
});

socket.on('left',name=>{
    append(`${name} left the chat`,'midd');
})