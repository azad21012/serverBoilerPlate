const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denidied!');
    try {
        const decoded = jwt.verify(token, "5-hjjwtPrivateKey`1w5");
        req.user = decoded;
        next();

    } 
    catch (error) {
        res.status(400).send('Invalid Token');
    }
};