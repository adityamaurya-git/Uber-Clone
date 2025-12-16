const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema({
    fullName:{
        firstname:{
            type:String,
            required:true,
            minLength:2
        },
        lastname:{
            type:String,
            minLength:2
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        select:false, 
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active' , 'inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:3
        },
        plate:{
            type:String,
            required:true,
            minLength:3
        },
        capacity:{
            type:Number,
            required:true,
            min:1
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car' , 'bike' , 'auto']
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
})

const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;