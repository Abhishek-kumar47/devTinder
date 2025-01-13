const express= require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignData,validateLoginData} = require("./utils/validation");
const bcrycpt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
app.get("/profile" , async (req, res) => {
   try{
     const cookies = req.cookies;
    const {token} =cookies;
    if(!token){
        throw new Error("INVALID TOKEN");
 
    }
    //Validate my token
    const decodeMesssage = await jwt.verify(token, "DEV@Tinder1802");
    const {_id}=decodeMesssage;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
    // console.log("Logged in user is "+ _id);

    res.send(user);
   } catch(err){
    res.status(401).send("Unauthorized Access");
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
                const token = await jwt.sign({_id:user._id},"DEV@Tinder1802");
                console.log(token);
                //add token to cookie and send the response back to the server
                res.cookie("token",token);
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
app.get("/user",async (req,res) =>{
    //GET user by email
    // const users = await User.find({emailId : req.body.emailId});
    // try{
    //     if(users.length === 0){
    //         res.status(404).send("User not found");
    //     }else{
    //         res.send(users);
    //     }
       
    // }
    // catch(err){
    //     res.status(400).send("somthing went wrong");
    // }
    //Get user by ID
    const userId = req.body.userId;  //best practice    
    const users = await User.findById({_id: userId});
    try{
        res.send(users);
           
        }
        catch(err){
            res.status(400).send("somthing went wrong");
        }
});


//DELETE the user from the database
app.delete("/user",async (req,res) =>{
    const userId = req.body.userId;  
  
    try{
        const user = await User.findByIdAndDelete(userId);
        //const user = await User.findByIdAndDelete({_id: userId}); same thing
        res.send("user deleted successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user: " + err.message);
    }
    
});

//UPDATE the user in the database
app.patch("/user/:userId",async (req,res) =>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES =["photoUrl","about","skills","age","gender"];
        const isalloweupdate= Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );
        if(!isalloweupdate){
            throw new Error("User not allowed to update");
        }
        if(data?.skills.length > 10){
            throw new Error("Skills cannot have more than 10 items");
        }
        const user = await User.findByIdAndUpdate(userId,data,{
            runValidators: true,
        });
        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("UPDATE FAILED:"+ err.message);
    }
});


//Feed API - Get /feed - get all the users from the database
app.get("/feed",async (req,res) =>{
    const user = await User.find({});  //Empty filtering will give you all the users data
    try{
        res.status(200).send(user);
    }
    catch(err){
        res.status(400).send("something went wrong");
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