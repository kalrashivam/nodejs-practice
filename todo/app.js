http =  require('http');
fs = require('fs');


var host = '0.0.0.0'
var port = '8000'

var file =fs.readFile('./index.html',function(err,html){
   if(err){
   	console.log(err);
   }
		 
		 var server = http.createServer(function(req,res){
		  res.statusCode = 200;
		  res.setHeader('Content-Type','text/html');
		  res.write(html)
		  res.end();
		});

		server.listen(port,host,function(){
			console.log('running on port no. '+port);
		});

  
});
