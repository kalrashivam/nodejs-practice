express = require('express');
path = require('path');
bodyparser = require('body-parser');

var port = '3000';
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.get('/',function(req,res){
  res.send('Hello World')
});

app.listen(port);
console.log('server runnung on '+port);

module.exports = app;
