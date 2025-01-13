const express = require('express');

const profileRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
profileRouter.get("/profile" ,userAuth, async (req, res) => {
    try{
     
     const user = req.user;
 
     // console.log("Logged in user is "+ _id);
 
     res.send(user);
    } catch(err){
     res.status(400).send("Unauthorized Access");
    }
 });

module.exports = profileRouter;