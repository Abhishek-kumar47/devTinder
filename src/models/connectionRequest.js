const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromuserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        enums:{
            value:["interested","ignored","accepted","rejected"],
            message:`{VALUE} is incorrect status type`       
         },
    },
},
{timestamps: true}
);
const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);