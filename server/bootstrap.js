const db = require('../db/mongoose');
const server = require("./server");
require('./logging');

const bootstrap =  async() => {
    // try{
    //     await db.connect().then(result=>console.log(result));
    //     await server.start(result=>console.log(result));
    // }catch(e){
    //     console.log(e);
    //     db.close();
    // }
    await db.connect().then(result=>console.log(result));
    await server.start(result=>console.log(result));
};

module.exports = bootstrap;