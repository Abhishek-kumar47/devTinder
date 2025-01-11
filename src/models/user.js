const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address"+ value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password"+ value);
            }
        },
    },
    age: {
        type: Number,
        min:18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid gender. Must be male, female or others.");
            }
        },
    },
    photoUrl :{
    type:String,
    default: "https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg",
    validate(value){
        if(!validator.isURL(value)){
            throw new Error("Invalid URL"+value);
        }
    }
    },
    about:{
        type: String,
        default:"This is the default about the user",
    },
    skills:{
        type: [String],
    }
},
{
    timestamps:true,
});

const User = mongoose.model("User",userSchema);
module.exports = User;

//or we can write it like this: module.exports = mongoose.model("User",userSchema); instead of writing two lines
