const express=require('express')
const app=express()
const connectDB = require("./config/database.js");
const errorController = require('./middleware/errorController.js');
const userRouter=require('./routes/userAuth.js')

app.use(express.json())



app.use('/auth/user',userRouter)



app.use('*',errorController)


connectDB().then(()=>{
console.log('DB connected')
app.listen(3000, () => {
  console.log("server is listening to 3000");
});
}).catch((err)=>console.log(err.message))
