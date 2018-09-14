const path = require('path');
var express = require('express');
const http = require('http');
var hbs = require('handlebars');
var socketIO = require('socket.io');
const {generateMessage, generateLocation} = require('./utils/message.js');

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


    socket.emit('adminmessage', generateMessage('admin','welcome to the user'));

    socket.broadcast.emit('adminmessage', generateMessage('admin','new user added'));



  socket.on('createMessage',(message) => {
    io.emit('getMessage',generateMessage(message.from,message.text));
    // socket.broadcast.emit('getMessage',{
    //   text:message.text,
    //   user:message.user,
    //   createdAt: message.createdAt
    // });
});


socket.on('sharelocation',(location) => {
  io.emit('getLocation',generateLocation(location.from,location.longitude,location.latitude));
});




  // socket.emit('getMessage',{
  //   text:"this is a trial message",
  //   user:"jacob",
  //   createdAt: new Date().getTime()
  // });

  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });


});



server.listen(port, () => {
  console.log('listening at port no. ', port);
});
