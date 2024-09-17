const express=require('express')
const { signUp, updateUser, login, getProfile } = require('../controllers/userController')
const authenticate = require('../middleware/authenticate')


const router=express.Router()


router.post('/signup',signUp)
router.post('/login',login)
router.get('/profile/:id',authenticate,getProfile)
router.put('/update/:id',updateUser)



module.exports=router