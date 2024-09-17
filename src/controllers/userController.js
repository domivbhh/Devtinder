const ErrorHandler = require("../middleware/errorHandler")
const dataSend = require("../middleware/sendData")
const User = require("../models/user")

const signUp=async(req,res,next)=>{
    try {
        const{firstName,lastName,gender,password,emailId,age}=req.body

            if(!firstName || !lastName || !emailId || !password ||!age ||!gender){
                return next(new ErrorHandler(400,'Fill the require Details'))
            }

        const newUser=new User({firstName,lastName,emailId,gender,age,password})
        await newUser.save()
        if(newUser._id){
            dataSend(res=res,message='user created succesfully',data=newUser)
        }        
    } 
    catch (error) {
        next(new ErrorHandler(401,error.message));
    }
}



module.exports={signUp}