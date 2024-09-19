const ErrorHandler = require("../middleware/errorHandler")
const Connection = require("../models/connectionReq")
const User = require("../models/user.js")

const sendRequest=async(req,res,next)=>{
    try {
        const loggedIn=req.user

        const fromUserId=loggedIn._id
        const toUserId=req.params.toUserId
        const status=req.params.status

    
             const userExist = await User.findById(toUserId);
             if(!userExist.firstName)
                {
                return next(new ErrorHandler(400, "User not exist"));
                }

                    //checking whether the touser is same as fromuser

            if(userExist.firstName===req.user.firstName){
                return next(new ErrorHandler(400, "Can't send connection request"));
            }

        // Invalid status type corner case
        const allowedStatus=['ignored','interested']
        if(!allowedStatus.includes(status))
        {
            next(new ErrorHandler(400,'Invalid status type'+' '+status))
        }
           


        //checking if there is an existing connection request
        const existingConnectionRequest=await Connection.findOne({$or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]})

        console.log(existingConnectionRequest)
        if(existingConnectionRequest!==null){
               return next(new ErrorHandler(400,'connection already exist'))
        }

        const newConnection=new Connection({fromUserId,toUserId,status})
        const data=await newConnection.save()

        res.json({
            message:'success',
            data
        })
    } 

    catch (error) {
        next(new ErrorHandler(404,error.message))
    }
}







const reviewRequest=async(req,res,next)=>{
try {
    const {id}=req.params
    const loggedInUser=req.user
    const{status,requestId}=req.params
    const toUserId=loggedInUser



    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      next(new ErrorHandler(400, "Invalid status type" + " " + status));
    }

    const connectionRequest=await Connection.findOne({fromUserId:requestId,toUserId:loggedInUser._id,status:'interested'})

    if(!connectionRequest._id){
        return next(new ErrorHandler(404,'User not found'))
    }

    const data=connectionRequest.status=status
    await connectionRequest.save()
    res.status(200).json({
        success:true,
        message:'Conection request',
        data
    })
} 
catch (error) {
    next(new ErrorHandler(400,error.message))
}

}



module.exports={sendRequest,reviewRequest}