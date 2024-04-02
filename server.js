const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config()

// Import routes
const apiRoutes = require('./routes/api');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(helmet()); 
app.use(express.json());

app.use('/', apiRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
