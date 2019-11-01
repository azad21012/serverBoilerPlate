const config = require("config");
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');

/**
 * This can be done as an alternative to wrapping your get()
 *  around a try/catch block. has() will not throw exceptions,
 *  and will return true if and only if the configuration file
 *  has a defined value for the provided key.
 *  Note that null is a defined value.
 * has() will not throw an exception if the parameter passed 
 * is null or undefined but will simply return false.
 */
if(!config.has("PRIVATEKEY")){
    console.error("jwt private key not defined");
    // process.exit(1);
}
let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "test")
    app.use(morgan('dev'));

app.use(config.get("baseUrl"), routes(express.Router()));


const start = () => {
    const port = process.env.PORT || config.get("port");    
    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            console.log("server listening to port " + port); 
            resolve();
        }).on('error',(err)=>reject(err));
    });
};
module.exports = {start, app};
