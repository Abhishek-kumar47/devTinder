const express= require('express');
const connectDB = require("./config/database");
const User = require("./models/user");


const app= express();

app.post("/signup",async (req,res) =>{
    //creating a new instance of the user model
    const user = new User({
        firstName:"Abhishek",
        lastName:"kumar",
        emailId:"abhi@gmail.com",
        password:"123456",
    });
  try { 
     await user.save();
    res.send("User added successfully");
} catch(err){
    res.status(400).res("error saving the user" + err.message);
}
});

connectDB()
    .then(() => {
        console.log("MongoDB Connected...");
        
app.listen(7777, () => {
    console.log("Server is running on port 7777");
});
    })
    .catch(err => {
        console.error("MongoDB Connection Error:", err)
    });