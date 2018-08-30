var express = require('express');
var bodyparser = require('body-parser');
var {mongoose} = require('./db/db.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyparser.json());

app.listen(3000,() => {
  console.log('listening on port 3000');
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
