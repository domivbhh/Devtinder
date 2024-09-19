const validator=require('validator')
const ErrorHandler = require('../middleware/errorHandler')

const profileValidation=(req,next)=>{
    const{firstName,lastName,age,gender,skills,photoUrl,about}=req.body

    if(firstName && firstName.length<4){
        return next(new ErrorHandler(400,'firstname is invalid'))
    }
    else if(age && age<15 && validator.isNumeric(age) ){
       return next(new ErrorHandler(400, "age is invalid"));
    }
    else if(photoUrl && validator.isURL(photoUrl)){
       return next(new ErrorHandler(400, "photo is invalid"));
    }
    else if(about && about.length<2){
       return next(new ErrorHandler(400, "About should more than 5 characters"));
    }
    else if(skills && skills.length>10){
        return next(new ErrorHandler(400, "skills can't be more than 10"));
    }
}

module.exports=profileValidation