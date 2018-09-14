var socket = io();

socket.on('connect', () => {
  console.log('connected user');
});

socket.on('disconnect', () => {
  console.log('disconnected user');
})

socket.emit('createMessage',{
  text:"this is a trial message",
  from:"jacob"
});

socket.on('getMessage', (message) => {
  console.log(message);
});

socket.on('adminmessage', (message) => {
  console.log('admin message \n', message);
});
