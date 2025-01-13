const express = require('express');

const profileRouter = express.Router();
const {validateEditprofileData} = require('../utils/validation');
const {userAuth} = require("../middlewares/auth");
profileRouter.get("/profile/view" ,userAuth, async (req, res) => {
    try{
     
     const user = req.user;
 
     // console.log("Logged in user is "+ _id);
 
     res.send(user);
    } catch(err){
     res.status(400).send("Unauthorized Access");
    }
 });

profileRouter.patch("/profile/edit",userAuth, async (req, res) => {
    try{
       if(!validateEditprofileData(req)){
        throw new Error("Invalid edit request");
       }
       const loggedInUser =req.user;
       Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
       await loggedInUser.save();

       res.json({
        message:`${loggedInUser.firstName}, your profile has been updated successfully`,
        data: loggedInUser
       })
    }
    catch(err){
     res.status(400).send("ERROR :" + err.message);
    }

});



module.exports = profileRouter;