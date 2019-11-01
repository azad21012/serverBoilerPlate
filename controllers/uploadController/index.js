// const mongoose = require('mongoose');
const _ = require('lodash');
const multer = require('multer');
const path = require('path');
const MAX_FILE_SIZE = 1024*1024*20;
const { Video } = require("../../models/video.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
      },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname) );
      }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'video/mp4'){
        cb(null,true);
    }else{
        req.fileValidationError = 'goes wrong on the mimetype';
        return cb(null, false);
    }
};

const upload = multer({storage:storage,
    limits:{
    fileSize: MAX_FILE_SIZE
    },
    fileFilter:fileFilter,
}).single('videoFile');

async function uploadVideo(req,res){
    // if you want to  catch error at uploading you should define upload and use 
    // function such as below
    upload(req,res,error=>{
        if (req.fileValidationError || error){
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: `Upload Failed`
                }
            });
        }
        const video = new Video({
            // _id: new mongoose.Types.ObjectId(),
            name: req.file.originalname,
            url: req.file.path,
            fileName: req.file.filename,
            username_id:req.user.id,
        });
        video.save((err)=>{
            if(err){ 
                return res.status(500).json({
                    message: err
                });
            }
            return res.status(200).send({
                data:_.pick(video,["_id"]),
                message: "User registered successfully"
            });
        });

    });
}
module.exports = {
    uploadVideo,
};
