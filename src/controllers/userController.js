const ErrorHandler = require("../middleware/errorHandler")
const dataSend = require("../middleware/sendData")
const User = require("../models/user")
const validator = require("validator");
const validateSignUp = require("../utils.js/validation");
const bcrypt=require('bcryptjs');
const jwtToken = require("../middleware/jwttoken");
const profileValidation = require("../utils.js/profileValidation");



const signUp=async(req,res,next)=>{
    try {
        const { firstName, lastName, emailId, password,gender,age,about } = req.body;
        //validation checking

        validateSignUp(req,next)
        
        //user creating
        const newUser = new User({ firstName, lastName, emailId, password,gender,age,about });
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
            const verifyPassword=await userExist[0].verifyJwt(password)
            if(verifyPassword){
            const sendingData = await User.findById(userExist[0]?._id).select("-password");
                const token=jwtToken(sendingData._id)
                dataSend(res=res,message='login success',data={sendingData,token})
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


const getProfile=async(req,res,next)=>{
    try {
            const{id}=req.params
            if(id){
                const user=req.user
                if(user.emailId){
                    dataSend(res,'user profile',user
                    )
                }
                else{
            return next(new ErrorHandler(404, "Profile not found"));

                }
            }
    } 
    catch (error) {
        next(new ErrorHandler(401, error.message));
        
    }
}

const updateUser=async(req,res,next)=>{
    try {
        const datas=req.body
        const {id}=req.params
                
        const allowed=['firstName','lastName','age','gender','photoUrl','about','skills']
        const isUpdateAllowed=Object.keys(datas).every((ele)=>allowed.includes(ele))


        if (isUpdateAllowed) 
        {
          profileValidation(req,next)
          const user = await User.findByIdAndUpdate(id, datas, {
            new: true,
            runValidators: true,});

          if (user._id) 
            {
            dataSend(res, (message = `${user.firstName} updated successfully`), user);
            }
        } 
        else if(!isUpdateAllowed)
        {
          return next(new ErrorHandler(401, `Invalid Field Update`));
        }
        
    } 
    catch (error) {
        next(new ErrorHandler(401, error.message));
    }
}



const passwordChange=async (req,res,next)=>{
    const {password}=req.body
    const{id}=req.params
    const user=req.user

    if(password){
        const validatePassword=validator.isStrongPassword(password)
        if(validatePassword){
            const hashedPassword=await bcrypt.hash(password,10)
            const user=await User.findByIdAndUpdate(id,{password:hashedPassword},{new:true})
            res.status(200).json({
                message:`${user.firstName} password updated successfully`
            }
            )
        }
        else{
            next(new ErrorHandler(404,'Weak password'))
        }
    }
}


module.exports={signUp,updateUser,login,getProfile,passwordChange}