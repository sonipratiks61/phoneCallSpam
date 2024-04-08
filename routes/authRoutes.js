const express = require("express");
const {addContact,getProfile, updateContact, deleteContactById} = require("../controllers/userController");
const {searchByName,searchByPhoneNumber }= require("../controllers/searchController");
const {userRegister,userLogin} = require("../controllers/authController");
const userSchemaBody=require('../vaildation/authVaildation');
const {validateBody,validateParams}=require('../vaildation/vaildationFunction')
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register",  validateBody(userSchemaBody),userRegister);
router.post("/login", userLogin);
router.get("/searchByName",authMiddleware,searchByName)
router.get("/searchByPhoneNumber",authMiddleware,searchByPhoneNumber)

module.exports = router;