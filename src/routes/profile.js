const express = require("express");
const authenticate = require("../middleware/authenticate");
const { getProfile, updateUser, passwordChange } = require("../controllers/userController");


const router = express.Router();




router.get("/:id", authenticate, getProfile);
router.put("/password/:id",authenticate, passwordChange);
router.put("/:id",authenticate, updateUser)


module.exports=router