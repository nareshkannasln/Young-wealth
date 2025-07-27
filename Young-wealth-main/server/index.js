require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db/connect');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const adminRoutes = require('./routes/admin');
const expenseRoutes = require('./routes/expenses');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded videos/images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/expenses', expenseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Basic route
app.get('/', (req, res) => {
  res.send('Young Wealth Server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Young Wealth server running on port ${PORT}`);
});