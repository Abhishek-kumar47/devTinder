const express= require('express');
const connectDB = require("./config/database");
const User = require("./models/user");


const app= express();
app.use(express.json());
app.post("/signup",async (req,res) =>{
    console.log(req.body);
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
    // const users = await User.find({emailId : req.body.emailId});
    // try{
    //     if(users.length === 0){
    //         res.status(404).send("User not found");
    //     }else{
    //         res.send(users);
    //     }
       
    // }
    // catch{
    //     res.status(400).send("somthing went wrong");
    // }
    const userId = req.body.userId;  //best practice    
    const users = await User.findById({_id: userId});
    try{
        res.send(users);
           
        }
        catch{
            res.status(400).send("somthing went wrong");
        }
});
app.get("/feed",async (req,res) =>{
    const user = await User.find({});  //Empty filtering will give you all the users data
    try{
        res.status(200).send(user);
    }
    catch{
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