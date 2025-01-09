const mongoose = require('mongoose');


const connectDB = async() =>{
   await mongoose.connect("mongodb+srv://Abhishek:DjafTdrkRi3Oehow@hellonode.0kn5t.mongodb.net/devTinder");
};
module.exports = connectDB;

