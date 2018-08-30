var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


var Todo = mongoose.model('Todo',{
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  Reminder: {
    type: Boolean,
    default: false
  }
});

var User = mongoose.model('Users',{
  email: {
    type: String,
    minlength: 1,
    trim: true,
    required: true
  },
  password: {
    type: String
  },
  first_name: {
    type: String,
    minlength: 2,
    trim: true
  },
  last_name: {
    type: String,
    minlength: 2,
    trim: true
  }
});

newUser = new User({
  email: 'shivamkalra2056@gmail.com'
})

newUser.save().then((doc) => {
  console.log(doc);
},(error) => {
  console.log(error);
});

// newTodo = new Todo({
//   text:'Buy a new Phone'
// });
//
// newTodo.save().then((doc) => {
//   console.log(doc);
// }, (error) =>{
//   console.log('error detected');
// } );
