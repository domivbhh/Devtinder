// pending incoming connection request for logged in user

const Connection  = require('../models/connectionReq.js')
const ErrorHandler = require("../middleware/errorHandler")

const pendingRequest=async(req,res,next)=>{
    try 
    {
         const loggedIn=req.user

         const connectionRequest=await Connection.find({toUserId:loggedIn._id,status:'interested'}).populate('fromUserId','firstName lastName age photoUrl').populate('toUserId','firstName')
         if(connectionRequest.length<1){
            return next(new ErrorHandler(404,'No pending connection for'+' '+loggedIn.firstName))
         }
         else{
            res.status(200).json({
                success:true,
                data:connectionRequest
            })
         }        
    } 

    catch (error) 
    {
    next(new ErrorHandler(404,error.message))    
    }
}

const sentPendingRequest=async(req,res,next)=>{
    try {
         const loggedIn = req.user;

         const connectionRequest = await Connection.find({
           fromUserId: loggedIn._id,
           status: "interested",
         })
           .populate("fromUserId", "firstName lastName age photoUrl")
           .populate("toUserId", "firstName");
         if (connectionRequest.length < 1) {
           return next(
             new ErrorHandler(
               404,
               "No pending connection for" + " " + loggedIn.firstName
             )
           );
         } else {
           res.status(200).json({
             success: true,
             data: connectionRequest,
           });
         }
        
    } 
    catch (error) {
    next(new ErrorHandler(404, error.message));    
    }
}

const myConnections=async(req,res,next)=>{
    try {
        const loggedIn = req.user;

        const connectionRequest = await Connection.find({
          $or: [
            { fromUserId: loggedIn._id, status: "accepted" },
            { toUserId: loggedIn._id, status: "accepted" },
          ],
        })
          .populate(
            "fromUserId",
            "firstName lastName age photoUrl about skills"
          )
          .populate(
            "toUserId",
            "firstName lastName age photoUrl about skills"
          );


        const data=connectionRequest.map((ele)=>{
            if(loggedIn._id.toString()===ele.fromUserId.toString()){
                return ele.toUserId
            }
            else{
                return ele.fromUserId
            }
        })

        if (connectionRequest.length < 1) {
          return next(
            new ErrorHandler(
              404,
              "No connections for" + " " + loggedIn.firstName
            )
          );
        } else {
          res.status(200).json({
            success: true,
            data
          });
        }

    } 
    catch (error) {
    next(new ErrorHandler(404, error.message));    
        
    }
}


const feed=async(req,res,next)=>{
    try {
            const loggedIn=req.user

            // feed should not see his own profile ,rejected profile,already connected profile

            const userFeed=await Connection.find()
        
    } catch (error) {
        
    }
}




module.exports={pendingRequest,sentPendingRequest,myConnections,feed}