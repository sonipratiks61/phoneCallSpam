const express = require("express");
const userController = require("../controllers/userController");
const searchController = require("../controllers/searchController");
const {userRegister,userLogin} = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/searchByName",searchController.searchByName)
router.get("/searchByPhoneNumber",searchController.searchByPhoneNumber)

router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
