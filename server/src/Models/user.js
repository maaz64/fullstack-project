const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    refreshToken : {
        type:String
    }

},
    {
        timestamps:true
    }
)
const User = mongoose.model('User',UserSchema);
module.exports = User;