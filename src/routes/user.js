const express = require('express');
const userRouter= express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest= require("../models/connectionRequest");

userRouter.get("/user/request/received", userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({

            toUserId : loggedInUser._id,
            status: "interested",
        }).populate("fromUserId",["firstName", "lastName","age", "gender","skills","photoUrl"]);

        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        })
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = userRouter;