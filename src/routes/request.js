const express = require('express');

const requestRouter = express.Router();
const ConnectionRequest= require("../models/connectionRequest");
const User= require("../models/user");
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req, res) =>{
    try{
        const fromUserId= req.user._id;
        const toUserId= req.params.toUserId;
        const status= req.params.status;

        const isAllowedStatus =["interested","ignored"];
        if(!isAllowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type:" + status});
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message: "User not found"});
        }


        //IF there is an existing ConnectionRequest
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId},
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).send({message: "Connection request already exists"});
        }



        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();
        res.json({
            message:"Connection request sent successfully", 
            data,
        });
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})


module.exports = requestRouter;