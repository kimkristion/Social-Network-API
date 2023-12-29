const express = require('express');
const dbConnection = require('./config/connection');
const userRoute = require('./routes/user-routes');
const thoughtRoute = require('./routes/thought-routes');

const PORT = process.env.PORT || 3001;
const app = express();

dbConnection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

dbConnection.once('open', () => {
  console.log(`Connected to MongoDB`);

  // Set up routes after successful database connection
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Define routes
  app.use('/api/users', userRoute);
  app.use('/api/thoughts', thoughtRoute);

  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on port http://localhost:${PORT}!`);
  });
});
