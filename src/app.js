const express= require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignData,validateLoginData} = require("./utils/validation");
const bcrycpt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

const app= express();

app.use(cookieParser());
app.use(express.json());
app.post("/signup",async (req,res) =>{
   
  try { 
    //Validation of data
    validateSignData(req);

    const {firstName, lastName, emailId,password} = req.body;
    //Encrypt the password
    const passwordHash =await bcrycpt.hash(password,10);

     //creating a new instance of the user model
     const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
     });
  
     await user.save();
    res.send("User added successfully");
} catch(err){
    res.status(400).send("ERROR : " + err.message);
}
});
app.get("/profile" ,userAuth, async (req, res) => {
   try{
    
    const user = req.user;

    // console.log("Logged in user is "+ _id);

    res.send(user);
   } catch(err){
    res.status(400).send("Unauthorized Access");
   }
});

app.post("/login",async (req, res) =>{
    try{
    //    validateLoginData(req); No need to validate here since we are not inserting data we are logging with exixsting data.
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Iinvalid credentials");
        }
        const isPasswordValid = await bcrycpt.compare(password,user.password);
            if(isPasswordValid){
                //create a jwt token
                const token = await jwt.sign({_id:user._id},"DEV@Tinder1802",{expiresIn:"7d"});
                //console.log(token);
                //add token to cookie and send the response back to the server
                res.cookie("token",token,{
                    expires: new Date(Date.now()+ 8*360000),          //8 days before expiration
                });
                res.send("Login successfully");
            }
            else{
               throw new Error("Invalid credentials")
            }
        
    }
    catch(err){
        res.status(400).send("ERROR " + err.message);
    }
})
app.post("/sendConnectionRequest",userAuth,async(req, res) =>{
    try{
        const user= req.user;
        res.send(user.firstName+" sent the request");
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})


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