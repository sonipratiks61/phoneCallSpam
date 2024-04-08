const express = require("express");
const {
  addContact,
  getProfile,
  updateContact,
  deleteContactById
} = require("../controllers/userController");
const searchController = require("../controllers/searchController");
const { userRegister, userLogin } = require("../controllers/authController");
const { reportSpam, getSpamReport } = require("../controllers/spamController");
const userSchemaBody = require("../vaildation/authVaildation");
const userLoginBody = require("../vaildation/authLogin");
const {
  userContactBody,
  userContactParams,
  userUpdateContactBody
} = require("../vaildation/contactValidation");
const {
  userSpamContactBody,
  userSpamContactParams
} = require("../vaildation/spamContactVaildation");
const {
  validateBody,
  validateParams
} = require("../vaildation/vaildationFunction");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes

router.post(
  "/add",
  authMiddleware,
  validateBody(userSpamContactBody),
  reportSpam
);
router.get(
  "/fetchSpam/:phoneNumber",
  authMiddleware,
  validateParams(userSpamContactParams),
  getSpamReport
);

module.exports = router;
