const express= require('express');

const app= express();

app.get(
    "/user",
    (req, res, next) => {
      console.log("Handling the route user!!");
      next();
    },
    (req, res, next) => {
      console.log("Handling the route user 2!!");
      // res.send("2nd Response!!");
      next();
    },
  
    (req, res, next) => {
      console.log("Handling the route user 3!!");
      // res.send("3rd Response!!");
      next();
    },
    (req, res, next) => {
      console.log("Handling the route user 4!!");
      // res.send("4th Response!!");
      next();
    },
    (req, res, next) => {
      console.log("Handling the route user 5!!");
      res.send("5th Response!!");
    }
  );
//what if we add another route /user with app.use what will happen to the get,post,delete calls?
// app.use("/user",(req,res) => {
//     res.send("order matters guys!! thats why all http method will show this call if we use this in the end then get,post, delete wil work just fine");
// });
//THIS WILL ONLY HANDLE GET CALL TO /USER 
// app.get("/user",(req,res) => {
//     res.send({firstName: 'John', lastName: 'Cena'});
// });
// app.get("/student/:stID/:Password/:name",(req,res) => { //http://localhost:7777/student/707/Testing/Abhishek
//     console.log(req.params); //stID: '707', Password: 'Testing', name: 'Abhishek'
//     res.send({firstName: 'abhishek', lastName: 'kumar'});
// });
// app.get("/student",(req,res) => { //http://localhost:7777/student?stID=101&password=testing&name=Abhishek
//     console.log(req.query); // stID: '101', password: 'testing', name: 'Abhishek'
//     res.send({firstName: 'abhishek', lastName: 'kumar'});
// });

// app.post("/user",(req,res) => {
//     //SAVING DATA TO DB
//     res.send("User created successfully");
// });
// app.delete("/user",(req,res) => {
//     res.send("User deleted successfully");
// });
// //THIS WILL MATCH ALL THE HTTP METHOD API CALLS TO /HELLO
// app.use("/hello",(req,res) =>{
//     res.send("hello");
// });
// app.use("/hello2",(req,res) =>{
//     res.send("hello hello");
// });
// app.use("/home",(req,res) =>{
//     res.send("home");
// });
// app.use("/test",(req,res) =>{
//     res.send("test");
// });
// app.use("/",(req,res) =>{
//     res.send("Welcome");
// });
app.listen(7777, () => {
    console.log("Server is running on port 7777");
});