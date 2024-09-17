const express=require('express')
const { signUp, updateUser } = require('../controllers/userController')


const router=express.Router()


router.post('/signup',signUp)
router.put('/update/:id',updateUser)



module.exports=router