const ErrorHandler = require("../middleware/errorHandler")
const dataSend = require("../middleware/sendData")
const User = require("../models/user")
const validator = require("validator");


const signUp=async(req,res,next)=>{
    try {
        const{firstName,lastName,gender,password,emailId,age}=req.body
         if(!firstName || !lastName || !emailId || !password ||!age ||!gender){
                return next(new ErrorHandler(400,'Fill the require Details'))
        }
        if(!validator.isEmail(emailId)){
                return next(new ErrorHandler(400, "Invalid Email_id"));
        }

        const newUser=new User({firstName,lastName,emailId,gender,age,password})
        await newUser.save()
        if(newUser._id){
            const sendingData=await User.findById(newUser._id).select('-password')
            dataSend(res=res,message='user created succesfully',data=sendingData)
        }        
    } 
    catch (error) {
        next(new ErrorHandler(401,error.message));
    }
}


const getAllUser=async(req,res,next)=>{
    try {
            
    } 
    catch (error) {
        
    }
}

const updateUser=async(req,res,next)=>{
    try {
        const datas=req.body
        const {id}=req.params
        const allowed=['firstName','lastName','age','gender']
        const isUpdateAllowed=Object.keys(datas).some((ele)=>allowed.includes(ele))
        if (isUpdateAllowed) {
          const user = await User.findByIdAndUpdate(id, datas, {
            new: true,
            runValidators: true,
          });
          if (user._id) {
            dataSend(res, (message = "user updated successfully"), user);
          }
        } else {
          return next(new ErrorHandler(401, `Invalid Field Update`));
        }
        
    } 
    catch (error) {
        next(new ErrorHandler(401, error.message));
    }
}



module.exports={signUp,updateUser}