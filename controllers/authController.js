const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "your_secret_key";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h";

const authController = {
  // Register a new user
  register: async (req, res) => {
    try {
      const { name, phoneNumber, email, password } = req.body;

      if (!name || !phoneNumber || !password) {
        return res
          .status(400)
          .json({ message: "Name, phone number, and password are required." });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ where: { phoneNumber } });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists with this phone number." });
      }

      // Create new user
      const user = await User.create({
        name,
        phoneNumber,
        email,
        password, // Password will be hashed in the model's hook
      });

      // Exclude password from the response
      const userResponse = { ...user.toJSON() };
      delete userResponse.password;

      res.status(201).json(userResponse);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Failed to register user." });
    }
  },

  // Authenticate user and return JWT
  login: async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;

      if (!phoneNumber || !password) {
        return res
          .status(400)
          .json({ message: "Phone number and password are required." });
      }

      if (typeof phoneNumber !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: "Phone number and password must be strings." });
      }

      const user = await User.findOne({ where: { phoneNumber } });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed. User not found." });
      }

      // Check if password matches
      if (!user.validPassword(password)) {
        return res
          .status(401)
          .json({ message: "Authentication failed. Wrong password." });
      }

      // Generate JWT
      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: jwtExpiresIn,
      });

      res.json({ message: "Authentication successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Failed to login." });
    }
  },
};

module.exports = authController;
