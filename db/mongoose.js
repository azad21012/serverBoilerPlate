const mongoose = require('mongoose');
const config = require("config");
mongoose.Promise = global.Promise;

const mongoURI  = process.env.MONGO_URI || config.get("mongoUrl");

const connect = () =>{
    return new Promise((resolve)=>{
        mongoose.connect(mongoURI,
            {useNewUrlParser: true, useCreateIndex: true,useFindAndModify: false,useUnifiedTopology: true })
        .then(()=>{
            resolve('We Are connected to DataBase');
        });
        // .catch((e)=>reject(e));
    });
};
const close = () =>{
    mongoose.connection.close();
};
module.exports ={connect,close};