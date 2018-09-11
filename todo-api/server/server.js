var express = require('express');
var bodyparser = require('body-parser');
var {mongoose} = require('./db/db.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const lodash = require('lodash');
var {ObjectId} = require('mongodb');
var app = express();

app.use(bodyparser.json());

app.listen(8000,() => {
  console.log('listening on port 8000');
});

app.post('/sign-up',(req,res) => {
  var body = lodash.pick(req.body, ['password','email']);
  var user = new User({
    email: body.email,
    password: body.password
  })
  user.save().then((doc) => {
     res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.post('/todos',(req,res) => {
 console.log(req.body);
 var todo = new Todo({
   text: req.body.text
 });
 todo.save().then((doc) => {
   res.send(doc);
 }, (e) => {
   res.status(400).send(e);
 })

});

app.get('/todos',(req,res) => {
  Todo.find().then((doc) => {
    res.send((doc));
  },(error) => {
    res.status(400).send(e);
  })
});

// app.post('/Byid',(req,res) => {
//   console.log(JSON.stringify(req.body));
//   id = req.body.id;
//   User.findById(id).then((user) =>{
//     if(user){
//       res.send(user);
//     }else {
//       res.send('Invalid Id');
//     }
//   }).catch(function(e){  console.log(e);})
// });

app.get('/Byid/:id',(req,res) => {
  console.log(JSON.stringify(req.params));
  id = req.params.id;
  User.findById(id).then((user) =>{
    if(user){
      res.send(user);
    }else {
      res.send('Invalid Id');
    }
  }).catch(function(e){  console.log(e);})
});

app.get('/RemoveById/:id',(req,res) => {
  console.log(JSON.stringify(req.params));
  id = req.params.id;
  Todo.findByIdAndRemove(id).then((todo) =>{
    if(todo){
      res.send(todo);
    }else {
      res.send('Invalid Id');
    }
  }).catch(function(e){  console.log(e);})
});

app.post('/update/:id',(req,res) => {
  var id =  req.params.id;
  console.log(id);
  var body = lodash.pick(req.body, ['text','completed','reminder']);
  if(!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndUpdate(id,{
    $set: body
  },{
    new: true
  }).then((doc) => {
    if(doc){
      res.send(doc);
    } else {
      res.send('Invalid Id');
    }
  }).catch((e) => {
    res.status(404).send(e);
  });
});


// newUser = new User({
//   email: 'shivamkalra2056@gmail.com'
// })
//
// newUser.save().then((doc) => {
//   console.log(doc);
// },(error) => {
//   console.log(error);
// });

// newTodo = new Todo({
//   text:'Buy a new Phone'
// });
//
// newTodo.save().then((doc) => {
//   console.log(doc);
// }, (error) =>{
//   console.log('error detected');
// } );
