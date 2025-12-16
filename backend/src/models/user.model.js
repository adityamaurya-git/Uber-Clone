const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullName:{
        firstname:{
            type:String,
            required:true,
            minlength:2,
            maxlength:30
        },
        lastname:{
            type:String,
            minlength:3,
            maxlength:30
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:5,
    },
    password:{
        type:String,
        required:true,
        select:false, 
    },
    socketId:{
        type:String,
    }
})


const user = mongoose.model('user' , userSchema);
module.exports = user;