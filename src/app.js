const express= require('express');

const app= express();

app.use("/",(req,res) =>{
    res.send("Welcome");
});
app.use("/home",(req,res) =>{
    res.send("home");
});
app.use("/test",(req,res) =>{
    res.send("test");
});
app.listen(7777, () => {
    console.log("Server is running on port 7777");
});