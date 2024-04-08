const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "your_secret_key";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h";
const {
  sendBadRequest,
  sendCreateObject,
  sendSuccess,
  sendNotFound,
  sendInternalError
} = require("../util/customResponse");
exports.userRegister = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    const findUser = await User.findOne({ where: { phoneNumber } });
    if (findUser) {
      return sendBadRequest(
        res,
        `user already exits with this email id: ${findUser.phoneNumber}`
      );
    }

    const user = await User.create({
      name,
      phoneNumber,
      email,
      password
    });
    const data = { name, phoneNumber, email };
    return sendCreateObject(
      res,
      "Account has been successfully registered",
      data
    );
  } catch (error) {
    const errMsg = error.message;

    return sendBadRequest(res, errMsg);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) {
      return sendBadRequest(res, "Please check your credentials");
    }

    if (!user.validPassword(password)) {
      return sendBadRequest(res, "Please check your password");
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: jwtExpiresIn
    });

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token
    };
    return sendSuccess(res, "authentication successful", data);
  } catch (error) {
    const errMsg = error.message;
    return sendBadRequest(res, errMsg);
  }
};
