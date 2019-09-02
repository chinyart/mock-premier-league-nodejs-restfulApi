const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try{
        let token = req.headers.authorization.split(" ")[1];
        req.userData = jwt.verify(token, "secretkey");
        next();
    }catch(error){
        return res.status(401).json({
            message: 'Authorization failed.',
            status: 401
        })
    }
};
