const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require("./models");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const spamRoutes = require("./routes/spamRoutes");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database schema synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database schema:", error);
  }
})();
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/spam", spamRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
