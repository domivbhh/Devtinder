const express=require('express')
const authenticate = require('../middleware/authenticate')
const { pendingRequest, sentPendingRequest, myConnections, feed } = require('../controllers/userReq')

const router=express.Router()

//pending requests
router.get('/requests',authenticate,pendingRequest)
router.get('/sentrequests',authenticate,sentPendingRequest)
router.get('/myconnections',authenticate,myConnections)
router.get('/feed',authenticate,feed)




module.exports=router