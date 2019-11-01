const { User } = require("../../models/user.js");
const _ = require('lodash');
const bcrypt = require("bcrypt");



function registerUser(req, res) {
  const user = new User(req.body);
  user.save((err)=>{
      if(err){ 
          return res.status(500).json({
              message: err
          });
      }
      return res.status(200).send({
          data:_.pick(user,["username,email"]),
          message: "User registered successfully"
      });
  });
}
async function loginUser(req, res) {
    const user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send({message:"username or password is incorrect"});
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if (!validPassword) return res.status(400).send({message:"username or password is incorrect"});
    const token = user.generateToken();
    return res.status(200).header('x-auth-token',token).send({message:"login successfully",token:token});
  }

async function getUsers (req,res){
    const users = await User.find();
    res.send(users);
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
};