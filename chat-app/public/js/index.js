var socket = io();

socket.on('connect', () => {
  console.log('connected user');
});

socket.on('disconnect', () => {
  console.log('disconnected user');
})
