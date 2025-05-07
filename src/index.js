require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes");
const requestLogger = require('./middleware/request.logger');

const app = express();

// Middleware
app.use(express.json());

app.use(requestLogger);

// Routes
app.use("/api", router);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));