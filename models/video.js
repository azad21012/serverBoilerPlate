const mongoose = require('mongoose');
const videoSchema = mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    url:{
        required:true,
        type:String
    },
    fileName:{
        type:String
    },
    username_id:{
        required:true,type:String
    },
    desc:{
        required:false,type:String
    },
},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


let Video = mongoose.model("Video", videoSchema);
module.exports = { Video };
