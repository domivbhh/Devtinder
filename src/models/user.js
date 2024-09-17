const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3
    },
    lastName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female','others'],
        required:true
    }
},{
    timestamps:true
})

const User=mongoose.model('users',userSchema)

module.exports=User