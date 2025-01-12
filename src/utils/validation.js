const validator = require("validator");

const validateSignData =(req) => {
    const {firstName, lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid.");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email address.");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password.");
    }
};
const validateLoginData =(req) =>{
    const {emailId,password} = req.body;
    if(!validator.isEmail(emailId)){
        throw new Error("Invalid email address.");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password.");
    }
}
module.exports = {validateSignData,validateLoginData};