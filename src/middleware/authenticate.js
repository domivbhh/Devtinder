const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ErrorHandler = require("./errorHandler");


dotenv.config({ path: `${process.cwd()}/src/.env` });



const authenticate = (req,res,next) => {
  const { token } = req.headers;
  if (token) {
    const verifyToken = jwt.verify(token,process.env.JWT);
    if(verifyToken)
        {
            next()
    }
    else{
            next(new ErrorHandler(404, "please Login again"));        
    }
  }
  else{
            next(new ErrorHandler(404, "please Login again"));        
  }
};

module.exports=authenticate
