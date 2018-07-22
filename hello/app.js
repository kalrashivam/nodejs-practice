http = require('http');
fs = require('fs');
os = require('os');

var port = 8080;

var user = os.userInfo();

fs.appendFile('greetings.txt', 'Hello' + user.username +'!',function(err){
  if(err){
    console.log(err);
  }
});
