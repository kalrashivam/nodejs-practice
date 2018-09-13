const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs')
// MongoClient.connect('mongodb://localhost:27017',(err,client) => {
//    if(err){
//    return console.log('unable to connect to mongo server');
//    }
//    console.log('Connected to mongoDb server');
//
//    const db = client.db('TodoApi');
//    db.collection('todos').insertOne({
//      text: 'have to do',
//      status: true},(err, result) => {
//      if(err){
//        return console.log('unable to insert to-do')
//        }
//      console.log(JSON.stringify(result.ops , undefined, 2));
//    });
//
//    db.collection('todos').find({status:false}).toArray().then((docs) => {
//      console.log(JSON.stringify(docs, undefined, 2));
//    }, (error) => {
//      console.log(error);
//    });
//
//    client.close();
// });UserSchema.pre('save', function (next) {
//   var user = this;
//   console.log(user.password);
//
//   if(user.isModified('password')){
//   bcrypt.gensalt(10, (err,salt) => {
//      console.log('chutiye');
//     bcrypt.hash(user.password , salt ,(err,hash) => {
//             console.log(user.password);
//             user.password = hash;
//             next();
//         })
//     })
//   }else{
//     console.log('trying');
//     next();
//   }
// });


  bcrypt.genSalt(10, (err,salt) => {
     console.log('chutiye');
    bcrypt.hash('kdnfkjjfkjkjlkjf' , salt ,(err,hash) => {
            console.log(hash);
        })
    })
