const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// POST METHOD:- / REGISTER CONTROLLER:-

const registerUser = async (req, res) =>{
    
    try{
        const { fullName:{firstname , lastname} , email , password} = req.body;

        // CHECK IF USER ALREADY EXISTS:-
        const userAlreadyExists = await userModel.findOne({email});

        if(userAlreadyExists){
            return res.status(400).json({
                message: "User already exists."
            })
        }

        // HASHING THE PASSWORD:-
        const hashedPassword = await bcrypt.hash(password , 10);

        // CREATING NEW USER:-
        const user = await userModel.create({
            fullName:{
                firstname,
                lastname
            },
            email,
            password: hashedPassword
        })

        // CREATE JWT TOKEN:-
        const token = jwt.sign({
            userId:user._id
        }, process.env.JWT_SECRET);

        // SETTING COOKIE:-
        res.cookie('token' , token ,{
            httpOnly:true,
            secure:true,
            sameSite:'lax',
            path:'/',
            expires: new Date(Date.now() + 24*60*60*1000) // 1 day
        })

        // SENDING RESPONSE:-
        return res.status(201).json({
            message: "User registered successfully",
            user:{
                fullName:{firstname , lastname},
                email,
            }
        });
        
    }
    catch(err){
        return res.status(401).json({
            message: "Error in registering user",
            error: err.message
        })
    }
}


// POST METHOD:- / LOGIN CONTROLLER:-

const loginUser = async (req, res) =>{

    
    try{
        const {email , password} = req.body;

        // CHECK IF USER EXISTS:-
        const user = await userModel.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                message: "User does not exist."
            })
        }

        // CHECK IF PASSWORD IS CORRECT:-
        const decodedPassword = await bcrypt.compare(password , user.password);
        
        if(!decodedPassword){
            return res.status(400).json({
                message: "Invalid credentials."
            })
        }

        // CREATE JWT TOKEN:-
        const token = jwt.sign({
            userId : user._id
        }, process.env.JWT_SECRET);

        // SETTING COOKIE:-
        res.cookie("token" , token ,{
            httpOnly:true,
            secure:true,
            sameSite:'lax',
            path:'/',
            expires: new Date(Date.now() + 24*60*60*1000) // 1 day
        })

        // SENDING RESPONSE:-
        return res.status(200).json({
            message:"user logged in successfully",
            user:{
                fullName: user.fullName,
                email: user.email
            }
        })
        
    }
    catch(err){
        return res.status(401).json({
            message:" Error in logging in user",
            error: err.message
        })
    }
}


// GET METHOD:- /PROFILE CONTROLLER:-

const getProfile = async(req, res) =>{

    const user = req.user;

    try{
        return res.status(200).json({
            message: "User profile fetched successfully",
            user
        })
    }
    catch(err){
        return res.status(401).json({
            message:" Error in getting user profile",
            error: err.message
        })
    }
}


// GET METHOD:- /LOGOUT CONTROLLER:-

const logoutUser = async(req , res) =>{
    try{
        res.clearCookie("token");
        return res.status(200).json({
            message: "User logged out successfully"
        });
    }
    catch(err){
        return res.status(401).json({
            message:" Error in logging out user",
            error: err.message
        });
    }
}

// EXPORTING THE CONTROLLERS:-

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}