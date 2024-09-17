const ErrorHandler = require("../middleware/errorHandler")
const validator=require('validator')

const validateSignUp=(req,next)=>{
    const{firstName,lastName,emailId,password}=req.body


    if (!firstName || !lastName) {
      next(new ErrorHandler(404, "please provide firstname and lastname"));
    } else if (firstName && firstName.length<4) {
      next(new ErrorHandler(404, "please provide firstname more than 3 characters"));
    } else if (!validator.isEmail(emailId)) {
      next(new ErrorHandler(404, "Invalid Email-id"));
    } else if (!validator.isStrongPassword(password)) {
      next(new ErrorHandler(404, "Weak password"));
    }
}

module.exports=validateSignUp