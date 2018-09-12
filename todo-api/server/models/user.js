var mongoose = require('mongoose');
var Validator = require('validator')
const jwt = require('jsonwebtoken');
var lodash = require('lodash');

var UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return lodash.pick(userObject, ['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'mysecretkey').toString();
  user.tokens.push({access,token});
  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token){
  var user =  this;
  try{
  decoded = jwt.verify(token, 'mysecretkey');
  return user.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access':'auth'
  });
  }catch(e){
    return Promise.reject();
  }


}

var User = mongoose.model('Users',UserSchema);



module.exports = {
  User
};
