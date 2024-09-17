const express=require('express')
const { signUp, updateUser, login } = require('../controllers/userController')


const router=express.Router()


router.post('/signup',signUp)
router.post('/login',login)
router.put('/update/:id',updateUser)



module.exports=router