const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const authUserMiddleware = async (req , res , next) =>{
    // GETTING TOKEN FROM COOKIES:-

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized access."
        })
    }

    try{

        // VERIFYING TOKEN:-

        const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
        
        // FINDING USER FROM DECODED TOKEN:-

        const userId = decodedToken.userId;
        const user = await userModel.findById(userId);

        if(!user){
            return res.status(401).json({
                message: "User not Found."
            })
        }

        req.user = user;
        next();

    }
    catch(err){
        return res.status(400).json({
            message: "Invalid Token.",
            error: err.message
        })
    }
}

module.exports = {
    authUserMiddleware,
}