const express= require('express');
const {adminAuth, userAuth} = require("./middlewares/auth");

const app= express();


/*why do we have to authenticate for each request handler?? this is ware middlware comes into action
app.get("/admin/getAlldata",(req,res)=>{
    const token ="xyz";
    const isAuthenticated = token === "xyz";
    if(isAuthenticated){
        res.send("Got all the data");
    }
});
app.get("/admin/deleteAlldata",(req,res)=>{
    const token ="xyz";
    const isAuthenticated = token === "xyz";
    if(isAuthenticated){
        res.send("Deleted all the data");
    }  
});
*/


/* we will create a new folder for middlewares
    app.use("/admin",(req,res,next)=>{
    console.log("Handling the /admin middleware");
    const token ="xyz";
    const isAuthenticated = token === "xyz";
    if(!isAuthenticated){
        res.status(401).send("Unauthorized Access");
    }
    else{
        next();
    }
})
    */
app.use("/", (err, req, res, next) => {
    if (err) {
      // Log your error
      res.status(500).send("something went wrong");
    }
  });
  
  app.get("/getUserData", (req, res) => {
    //try {
    // Logic of DB call and get user data
  
    throw new Error("dvbzhjf");
    res.send("User Data Sent");
    //   } catch (err) {
    //     res.status(500).send("Some Error contact support team");
    //   }
  });
  app.use("/", (err, req, res, next) => {
    if (err) {
      // Log your error
      res.status(500).send("something went wrong");
    }
  });
app.use("/admin",adminAuth);
app.post("/user/login",(req,res)=>{
    res.send("Logged in seccessfully");
})
app.get("/user/data",userAuth,(req,res)=>{

});
app.get("/admin/getAlldata",(req,res)=>{
        res.send("Got all the data");
});
app.get("/admin/deleteAlldata",(req,res)=>{
        res.send("Deleted all the data");  
});


// app.get(
//     "/user",
//     (req, res, next) => {
//       console.log("Handling the route user!!");
//       next();
//     },
//     (req, res, next) => {
//       console.log("Handling the route user 2!!");
//       // res.send("2nd Response!!");
//       next();
//     },
  
//     (req, res, next) => {
//       console.log("Handling the route user 3!!");
//       // res.send("3rd Response!!");
//       next();
//     },
//     (req, res, next) => {
//       console.log("Handling the route user 4!!");
//       // res.send("4th Response!!");
//       next();
//     },
//     (req, res, next) => {
//       console.log("Handling the route user 5!!");
//       res.send("5th Response!!");
//     }
//   );



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