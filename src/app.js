const express= require('express');
const connectDB = require("./config/database");

const app= express();
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