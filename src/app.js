const express= require('express');
const connectDB = require("./config/database");
const User = require("./models/user");


const app= express();
app.use(express.json());
app.post("/signup",async (req,res) =>{
    //creating a new instance of the user model
    const user = new User(req.body);
  try { 
     await user.save();
    res.send("User added successfully");
} catch(err){
    res.status(400).res("error saving the user" + err.message);
}
});

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
        res.status(400).send("somthing went wrong");
    }
});

//UPDATE the user in the database
app.patch("/user",async (req,res) =>{
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate(userId,data);
        res.send("user updated successfully");
    }
    catch(err){
        res.status(400).send("somthing went wrong");
    }
});


//Fees API - Get /feed - get all the users from the database
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