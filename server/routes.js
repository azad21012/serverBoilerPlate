require('express-async-errors');
const errorHandler = require('../middlewares/error');
const AuthController = require("../controllers/AuthController/index");
const UploadController = require("../controllers/uploadController/index");
const auth = require('../middlewares/authMiddleware');

module.exports = function (app) {

    /*Route: GET root*/
    app.get('/', (req, res) => {
        res.send('Welcome to BoilerPlate');
    });

    app.post('/auth/register', AuthController.registerUser);
    app.post('/auth/login', AuthController.loginUser);
    app.get('/auth/users', AuthController.getUsers);
    app.post('/upload-video',auth, UploadController.uploadVideo);

    app.use(errorHandler);


    
    return app; 

}; 