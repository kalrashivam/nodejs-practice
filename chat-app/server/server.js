const path = require('path');
var express = require('express');
const http = require('http');
var hbs = require('handlebars');
var socketIO = require('socket.io');

app = express();
const publicPath = path.join(__dirname, '../public');
// for heroku
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
app.set('viewengine', 'hbs');

app.get('/', (req,res) => {
  res.render(index.html);
});

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user joined');
  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });

  socket.on('createMessage',(message) => {
    message.createdAt = new Date().getTime();
    console.log('user 1', message);
    io.emit('getMessage',{
      text:message.text,
      user:message.user,
      createdAt: message.createdAt
    });
  });

  socket.emit('getMessage',{
    text:"this is a trial message",
    user:"jacob",
    createdAt: new Date().getTime()
  });

});



server.listen(port, () => {
  console.log('listening at port no. ', port);
});
