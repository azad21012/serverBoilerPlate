const config = require("config");
const winston = require('winston');
/**
 * Requiring `winston-mongodb` will expose
 * `winston.transports.MongoDB`
 */
require('winston-mongodb');
// another way to logging uncaugh-exceptions
// process.on('uncaughtException',ex=>{
//     console.log('we got an exception');
//     winston.error(ex.message,ex);
// });
// handle exception in separate log file
// terminate after logging
winston.add(new winston.transports.File({
    filename: 'handleException.log',
    handleExceptions: true
}));
/**
 * 2 ways to handle rejections:
 *  1: process.on ... and winston.error
 *  2: throw exception and give the handling to uncaught-handler
 */ 
process.on('unhandledRejection',ex=>{
    // console.error(ex);
    throw new Error(ex);
    // winston.error(ex.message,ex);
});
const mongoLogURI  = process.env.MONGO_URI || config.get("mongoUrl");

winston.add(new winston.transports.File({filename:'logFile.log'}));
winston.add(new winston.transports.MongoDB({db:mongoLogURI,
    options:{useUnifiedTopology: true,useNewUrlParser: true},}));

/**
 * @description this error is uncaughtException outside the express
 */
// throw new Error('something failed');

/**
 * @description this error is unhandledRejection outside the express
 */
// const p = Promise.reject(new Error('promise rejection'));
// p.then(()=>console.log('Done'));


// const logger = winston.createLogger({
//     transports: [
//       new winston.transports.Console(),
//       new winston.transports.File({ filename: 'combined.log' })
//     ]
// });

// logger.add(new winston.transports.Console({
//     format: winston.format.simple()
// }));
// logger.log({
//     level: 'error',
//     message: 'Hello distributed log files!'
// });