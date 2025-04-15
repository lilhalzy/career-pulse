require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (with production-ready settings)
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.get('/api/dbtest', async (req, res) => {
  try {
    const newUser = new User({ 
      email: 'test@example.com', 
      password: '123', 
      role: 'job_seeker' 
    });
    await newUser.save();
    res.json({ 
      message: 'User saved to DB!',
      userId: newUser._id 
    });
  } catch (err) {
    res.status(500).json({ 
      error: 'Database operation failed',
      details: err.message 
    });
  }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});