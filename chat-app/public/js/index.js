var socket = io();

socket.on('connect', () => {
  console.log('connected user');
});

socket.on('disconnect', () => {
  console.log('disconnected user');
})

socket.emit('createMessage',{
  text:"this is a trial message",
  user:"jacob"
});

socket.on('getMessage', (message) => {
  console.log(message);
});
