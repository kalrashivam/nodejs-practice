var mongoose = require('mongoose');
var Validator = require('validator')

var User = mongoose.model('Users',{
  email: {
    type: String,
    minlength: 1,
    trim:true,
    required:true,
    unique:true,
    validate: {
      validator: (value) => {
         return Validator.isEmail(value);
      },
      message:'{VALUE} is not valid email'
    }
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  tokens: [{
    access: {
      type:String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = {
  User
};
