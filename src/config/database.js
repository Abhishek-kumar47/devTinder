const mongoose = require('mongoose');


const connectDB = async() =>{
   await mongoose.connect("mongodb+srv://Abhishek:DjafTdrkRi3Oehow@hellonode.0kn5t.mongodb.net/devTinder");
};

connectDB()
    .then(() => {
        console.log("MongoDB Connected...")
    })
    .catch(err => {
        console.error("MongoDB Connection Error:", err)
    });