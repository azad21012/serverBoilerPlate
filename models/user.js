const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const SALT_I = 10;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 30
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1024
    },
    role: {
      type: String,
      required: true,
      default: "user"
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

UserSchema.pre("save",  function(next) {
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(SALT_I,function(err,salt){
          if(err) return next(err);

          bcrypt.hash(user.password,salt,function(err,hash){
              if(err) return next(err);
              user.password = hash;
              next();
          });
      });
  }else {
    next();
  }
});

UserSchema.methods.generateToken = function(){
  var user = this;
  return jwt.sign({id:user._id,email:user.email,role:user.role},'5-hjjwtPrivateKey`1w5');
};

let User = mongoose.model("User", UserSchema);

module.exports = { User };
