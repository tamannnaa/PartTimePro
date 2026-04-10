const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./controllers/db.js');
const authRoutes = require('./routes/authRoutes.js');
const jobRoutes = require('./routes/jobRoutes.js');

dotenv.config();
const app=express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5000','http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
connectDB();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    query: req.query,
    headers: req.headers
  });
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/api', jobRoutes);

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: err.message 
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
