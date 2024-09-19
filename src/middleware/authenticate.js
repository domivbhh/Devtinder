const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ErrorHandler = require("./errorHandler");
const User = require("../models/user");


dotenv.config({ path: `${process.cwd()}/src/.env` });



const authenticate =async (req,res,next) => {
  const { token } = req.headers;
  if (token) {
    const verifyToken =await jwt.verify(token,process.env.JWT);
    if(verifyToken.id)
        {
          const user=await User.findById(verifyToken.id)
          req.user=user
          next()
        }
    else{
            next(new ErrorHandler(404, "Token expired.please Login again"));        
        }
  }
  else{
            next(new ErrorHandler(404, "please Login again"));        
  }
};

module.exports=authenticate
