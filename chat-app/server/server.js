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
});



server.listen(port, () => {
  console.log('listening at port no. ', port);
});
