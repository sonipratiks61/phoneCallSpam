const express = require("express");
const {addContact,getProfile, updateContact, deleteContactById} = require("../controllers/userController");
const searchController = require("../controllers/searchController");
const {userRegister,userLogin} = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/searchByName",searchController.searchByName)
router.get("/searchByPhoneNumber",searchController.searchByPhoneNumber)
router.get("/profile", authMiddleware, getProfile);
router.patch('/contact/:contactId',authMiddleware,updateContact);
router.delete('/contact/:contactId',authMiddleware,deleteContactById)
router.post("/contact",authMiddleware,addContact)



module.exports = router;
