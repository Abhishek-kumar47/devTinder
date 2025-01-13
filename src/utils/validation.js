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

const validateEditprofileData = (req) =>{
    const allowedEditFields =[
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
);
return isEditAllowed;
}


module.exports = {validateSignData,validateEditprofileData};