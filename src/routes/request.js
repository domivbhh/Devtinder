const express = require("express");
const {sendRequest, reviewRequest} = require("../controllers/connectionController");
const authenticate = require("../middleware/authenticate");
const router = express.Router();


router.post("/send/:status/:toUserId", authenticate,sendRequest);
router.post("/review/:status/:requestId", authenticate,reviewRequest);


module.exports=router
