const adminAuth = (req,res,next)=>{
    console.log("Handling the /admin middleware");
    const token ="x=dvsyz";
    const isAuthenticated = token === "xyz";
    if(!isAuthenticated){
        res.status(401).send("Unauthorized Access");
    }
    else{
        next();
    }
};
const userAuth = (req,res) =>{
    console.log("Handling the /user middleware");
    const token ="y=dvsyz";
    const isAuthenticated = token === "xyz";
    if(!isAuthenticated){
        res.status(401).send("Unauthorized Access");
    }
    else{
        next();
    }
}
module.exports ={
    adminAuth,userAuth
}