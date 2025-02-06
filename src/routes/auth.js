const express = require('express');
const authRouter = express.Router();

const User = require("../models/user");
const {validateSignData} = require("../utils/validation");
const bcrycpt = require("bcrypt");
authRouter.post("/signup",async (req,res) =>{
   
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
    
        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        //add token to cookie and send the response back to the server
        res.cookie("token",token,{
            expires: new Date(Date.now()+ 8*360000),          //8 days before expiration
        });
      res.json({message: "User added successfully", data: savedUser});
  } catch(err){
      res.status(400).send("ERROR : " + err.message);
  }
  });
  authRouter.post("/login",async (req, res) =>{
    try{
    //    validateLoginData(req); No need to validate here since we are not inserting data we are logging with exixsting data.
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrycpt.compare(password,user.password);
            if(isPasswordValid){
                //create a jwt token
                const token = await user.getJWT();
                //add token to cookie and send the response back to the server
                res.cookie("token",token,{
                    expires: new Date(Date.now()+ 8*360000),          //8 days before expiration
                });
                res.send(user);
            }
            else{
               throw new Error("Invalid credentials")
            }
        
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});
 authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null,{
        expires: new Date(Date.now()),
    });
    res.send("Logged out successfully");
 })
module.exports= authRouter;