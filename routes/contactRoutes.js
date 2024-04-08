const express = require("express");
const {
  addContact,
  updateContact,
  deleteContactById
} = require("../controllers/userController");
const {
  userContactBody,
  userContactParams,
  userUpdateContactBody
} = require("../vaildation/contactValidation");
const {
  validateBody,
  validateParams
} = require("../vaildation/vaildationFunction");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.patch(
  "/update/:contactId",
  authMiddleware,
  validateParams(userContactParams),
  validateBody(userUpdateContactBody),
  updateContact
);
router.delete(
  "/delete/:contactId",
  authMiddleware,
  validateParams(userContactParams),
  deleteContactById
);
router.post("/add", authMiddleware, validateBody(userContactBody), addContact);

module.exports = router;
