const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',(err,client) => {
   if(err){
   return console.log('unable to connect to mongo server');
   }
   console.log('Connected to mongoDb server');

   const db = client.db('TodoApi');
   db.collection('todos').insertOne({
     text: 'have to do',
     status: true},(err, result) => {
     if(err){
       return console.log('unable to insert to-do')
       }
     console.log(JSON.stringify(result.ops , undefined, 2));
   });

   db.collection('todos').find({status:false}).toArray().then((docs) => {
     console.log(JSON.stringify(docs, undefined, 2));
   }, (error) => {
     console.log(error);
   });

   client.close();
});
