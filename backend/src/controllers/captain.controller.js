const captainModel = require('../models/captain.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// POST METHOD:- / REGISTER CONTROLLER:-

const registerCaptain = async (req, res) => {
    try {
        const { fullName: { firstname, lastname }, email, password, vehicle: { color, plate, capacity, vehicleType } } = req.body;

        // CHECK IF CAPTAIN ALREADY EXISTS:-
        const captainAlreadyExists = await captainModel.findOne({ email });

        if (captainAlreadyExists) {
            return res.status(400).json({
                message: "Captain already exists."
            })
        }


        // HASHING THE PASSWORD:-
        const hashedPassword = await bcrypt.hash(password, 10);


        // CREATING NEW CAPTAIN:-
        const captain = await captainModel.create({
            fullName: {
                firstname,
                lastname,
            },
            email,
            password: hashedPassword,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            },
        })


        // SET TOKEN:-

        const token = jwt.sign({
            userId: captain._id,
        }, process.env.JWT_SECRET);


        // SETTING COOKIE:-

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
        })


        // SENDING RESPONSE:-

        return res.status(201).json({
            message: "captain registered successfully",
            captain: {
                fullName: { firstname, lastname },
                email,
                vehicle: { color, plate, capacity, vehicleType },
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            message: "Error in registering captain",
            error: err.message
        })
    }
}


// POST METHOD:- / LOGIN CONTROLLER:-

const loginCaptain = async (req, res) => {
    try {
        const { email, password } = req.body;

        // CHECK IF CAPTAIN EXISTS:-
        const captain = await captainModel.findOne({ email }).select("+password");

        if (!captain) {
            return res.status(400).json({
                message: "Captain does not exist",
            })
        }

        // CHECKING PASSWORD:-
        const decodedPassword = await bcrypt.compare(password, captain.password);

        if (!decodedPassword) {
            return res.status(401).json({
                message: "Invalid credentials",
            })
        }

        // CREATE TOKEN:-
        const token = jwt.sign({
            captainId: captain._id,
        }, process.env.JWT_SECRET);

        // SETTING TOKEN IN COOKIE:-

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
        })

        // SENDING RESPONSE:-
        return res.status(200).json({
            message: "Captain logged in successfully",
            fullName: captain.fullName,
            email: captain.email,
            vehicle: captain.vehicle,
            status: captain.status,
        })
    }
    catch (err) {
        return res.status(400).json({
            message: "Error in logging in captain",
            error: err.message
        })
    }
}


// GET METHOD:- / PROFILE CONTROLLER:-

const getProfile = async (req, res) => {
    try {
        const captain = req.captain;

        return res.status(200).json({
            message: "Captain profile fetched successfully",
            captain,
        })
    }
    catch (err) {
        return res.status(400).json({
            message: "Error in getting profile",
            error: err.message
        })
    }
}


// GET METHOD:- / LOGOUT CONTROLLER:-

const logoutCaptain = async(req, res) =>{
    try{
        res.clearCookie('token');
        return res.status(200).json({
            message: "Captain logged out successfully"
        })
    }
    catch(err){
        return res.status(400).json({
            message: "Error in logging out captain",
            error: err.message
        })
    }
}

// EXPORTING THE CONTROLLER:-

module.exports = {
    registerCaptain,
    loginCaptain,
    getProfile,
    logoutCaptain
}