var express = require('express');
var bodyparser = require('body-parser');
var {mongoose} = require('./db/db.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const lodash = require('lodash');
var {ObjectId} = require('mongodb');
var {authenticate} = require('./middleware/authenticate.js');
var app = express();

app.use(bodyparser.json());

app.listen(7000,() => {
  console.log('listening on port 7000');
});

app.post('/users',(req,res) => {
  var body = lodash.pick(req.body, ['password','email']);
  var user = new User({
    email: body.email,
    password: body.password
  });
  user.save().then(() => {
     return user.generateAuthToken();
     //res.send(doc);
  }).then((token) => {
    res.header('X-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.post('/users/login', (req,res) => {
  var body = lodash.pick(req.body, ['password', 'email']);

  User.findByCredentials(body.email,body.password).then((user) => {
     return user.generateAuthToken().then((token) => {
         res.header('X-auth', token).send(user);
     });
  }).catch((e) => {
    res.header(400).send('check email or password');
  });
})

// Logout
app.delete('/users/me/token', authenticate ,(req,res) => {
  req.user.removeToken(req.token).then((res) => {
    res.send('Logout succesfull');
  }, (err) => {
    res.status(400).send('Logout unsuccesfull');
  });
})

app.get('/users/me', authenticate,(req,res) => {
  res.send(req.user);
});

app.post('/todos', authenticate ,(req,res) => {
 console.log(req.body);
 var todo = new Todo({
   text: req.body.text,
   _creater: req.user._id
 });
 todo.save().then((doc) => {
   res.send(doc);
 }, (e) => {
   res.status(400).send(e);
 })
});


app.get('/todos', authenticate ,(req,res) => {
  Todo.find({
    _creater:req.user._id
  }).then((doc) => {
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

app.get('/Byid/:id', authenticate ,(req,res) => {
  console.log(JSON.stringify(req.params));
  id = req.params.id;
  User.findOne({
    _id: id,
    _creater: req.user._id
  }).then((user) =>{
    if(user){
      res.send(user);
    }else {
      res.send('Invalid Id');
    }
  }).catch(function(e){  console.log(e);})
});

app.get('/RemoveById/:id', authenticate ,(req,res) => {
  console.log(JSON.stringify(req.params));
  id = req.params.id;
  Todo.findOneAndRemove({
    _id: id,
    _creater: req.user._id
  }).then((todo) =>{
    if(todo){
      res.send(todo);
    }else {
      res.send('Invalid Id');
    }
  }).catch(function(e){  console.log(e);})
});

app.post('/update/:id', authenticate ,(req,res) => {
  var id =  req.params.id;
  console.log(id);
  var body = lodash.pick(req.body, ['text','completed','reminder']);
  if(!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOneAndUpdate({
    _id:id,
    _creater: req.user._id
  },{
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
