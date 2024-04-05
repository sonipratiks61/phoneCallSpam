const express = require("express");
const userController = require("../controllers/userController");
const searchController = require("../controllers/searchController");
const authController = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/searchByName",searchController.searchByName)
router.get("/searchByPhoneNumber",searchController.searchByPhoneNumber)

router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
