const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
   if(err){
   return console.log('unable to connect to mongo server');
   }
   console.console.log('Connected to mongoDb server');

   db.collections('Todos').insertOne({
     text: 'Something that i have to do',
     status: false},(err, result) => {
     if(err){
       return console.log('unable to insert to-do')
       }
     console.log(JSON.stringify(result.ops , undefined, 2))
   });

   db.close();
});
