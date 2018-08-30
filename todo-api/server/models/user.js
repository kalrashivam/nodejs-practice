var mongoose = require('mongoose');

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

module.exports = {
  User
};
