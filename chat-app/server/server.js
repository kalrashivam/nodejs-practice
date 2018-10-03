const path = require('path');
var express = require('express');
const http = require('http');
var hbs = require('handlebars');
var socketIO = require('socket.io');
const {generateMessage, generateLocation} = require('./utils/message.js');
const {isRealString} = require("./utils/validation.js");

app = express();
const publicPath = path.join(__dirname, '../public');
// for heroku
const port = process.env.PORT || 5000;
app.use(express.static(publicPath));
app.set('viewengine', 'hbs');

app.get('/', (req,res) => {
  res.render(index.html);
});

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user joined');




  socket.on('createMessage',(message, callback) => {
    io.emit('getMessage',generateMessage(message.from,message.text));
    // socket.broadcast.emit('getMessage',{
    //   text:message.text,
    //   user:message.user,
    //   createdAt: message.createdAt
    // });
    callback();
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


  socket.on('join',(params,callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)){
        callback('Name and Room Are Required');
      }

      socket.join(params.room)


    socket.emit('adminmessage', generateMessage('admin', 'welcome to the user'));

    socket.broadcast.to(params.room).emit('adminmessage', generateMessage('admin', params.name +'  added'));


      callback();
  })

});



server.listen(port, () => {
  console.log('listening at port no. ', port);
});
