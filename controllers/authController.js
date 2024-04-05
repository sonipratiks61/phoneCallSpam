const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "your_secret_key";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h";

exports.userRegister = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    if (!name || !phoneNumber || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, phone number, and password are required."
        });
    }

    const existingUser = await User.findOne({ where: { phoneNumber } });
    if (existingUser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already exists with this phone number."
        });
    }

    const user = await User.create({
      name,
      phoneNumber,
      email,
      password
    });
    const data = { name, phoneNumber, email };
    return res
      .status(201)
      .json({
        success: true,
        message: "Account has been successfully registered",
        data:data,
        
      });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Failed to register user." });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res
        .status(400)
        .json({ message: "Phone number and password are required." });
    }

    if (typeof phoneNumber !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "Phone number and password must be strings." });
    }

    const user = await User.findOne({ where: { phoneNumber } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    if (!user.validPassword(password)) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Wrong password." });
    }
    const data={name:user.name,email:user.email,phoneNumber:user.phoneNumber}
    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: jwtExpiresIn
    });

    res.status(200).json({ message: " User Login successful",data, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login." });
  }
};
