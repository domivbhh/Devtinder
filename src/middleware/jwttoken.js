const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config({path:`${process.cwd()}/src/.env`})



const jwtToken=(id)=>{
    const token=jwt.sign({id:id},process.env.JWT,{expiresIn:'2d'})
        return token
}

module.exports=jwtToken