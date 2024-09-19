const express=require('express')
const app=express()
const connectDB = require("./config/database.js");
const errorController = require('./middleware/errorController.js');
const cookieparser=require('cookie-parser')
const userAuthRouter=require('./routes/userAuth.js')
const profileRouter=require('./routes/profile.js')
const requestRouter=require('./routes/request.js')
const userRouter=require('./routes/user.js')



app.use(express.json())
app.use(cookieparser())


app.use('/auth',userAuthRouter)
app.use('/profile',profileRouter)
app.use('/request',requestRouter)
app.use('/user',userRouter)



app.use('*',errorController)


connectDB().then(()=>{
console.log('DB connected')
app.listen(3000, () => {
  console.log("server is listening to 3000");
});
}).catch((err)=>console.log(err.message))
