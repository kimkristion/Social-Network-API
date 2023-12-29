const express = require('express');
const dbConnection = require('./config/connection'); // Import MongoDB connection module
const userRoute = require('./routes/user-routes'); // Import user routes module
const thoughtRoute = require('./routes/thought-routes'); // Import thought routes module

const PORT = process.env.PORT || 3001; // Set the port for the API server
const app = express(); // Create an Express application

// MongoDB connection error handling
dbConnection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// MongoDB connection successful
dbConnection.once('open', () => {
  console.log(`Connected to MongoDB`);

  // Set up middleware to parse JSON and URL-encoded data
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Define routes
  app.use('/api/users', userRoute); // Use user routes for '/api/users'
  app.use('/api/thoughts', thoughtRoute); // Use thought routes for '/api/thoughts'

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}!`);
  });
});
