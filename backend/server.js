const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const resumeRoutes = require('./routes/resumeRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Allows us to parse JSON bodies
app.use(cors()); // Enables cross-origin requests

// Define API routes
app.use('/api/resumes', resumeRoutes);

// Export the app instance for testing
module.exports = app;

// Start the server only if the file is run directly (not for testing)
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
