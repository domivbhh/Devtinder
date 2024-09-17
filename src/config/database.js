const mongoose=require('mongoose')
const dotenv=require('dotenv')


dotenv.config({path:`${process.cwd()}/src/.env`})


const connectDB=async ()=>{
    await mongoose.connect(process.env.MONGO)
}

module.exports=connectDB