const ErrorHandler = require("../middleware/errorHandler")
const dataSend = require("../middleware/sendData")
const User = require("../models/user")
const validator = require("validator");
const validateSignUp = require("../utils.js/validation");
const bcrypt=require('bcryptjs')



const signUp=async(req,res,next)=>{
    try {
        const { firstName, lastName, emailId, password } = req.body;
        //validation checking

        validateSignUp(req,next)
        
        //user creating
        const newUser = new User({ firstName, lastName, emailId, password });
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


const login=async(req,res,next)=>{
    try {
        const{emailId,password}=req.body
        if(!emailId || !password){
            return next(new ErrorHandler(404,'please enter email and password'))
        }
        if (!validator.isEmail(emailId)) {
            next(new ErrorHandler(404, "Invalid Email-id"));
        }
        const userExist=await User.find({emailId}).select('+password')
        if(!userExist[0]?._id){
            return next(new ErrorHandler(404,'Invalid credentials'))
        }
        else{
            const verifyPassword=await bcrypt.compare(password,userExist[0]?.password)
            if(verifyPassword){
            const sendingData = await User.findById(userExist[0]?._id).select("-password");
                dataSend(res=res,message='login success',sendingData)
            }
            else{
            return next(new ErrorHandler(404, "Wrong password"));
            }
        }    
    } 
    catch (error) {
        next(new ErrorHandler(401, error.message));
        
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



module.exports={signUp,updateUser,login}