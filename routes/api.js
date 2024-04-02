const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
