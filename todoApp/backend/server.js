// server.js

const express = require('express');
const mysql = require('mysql2');
const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
// app.use('/tasks', taskRoutes);
// app.use('/reports', reportRoutes);

// Database connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'agent',
//   password: 'agentpass',
//   database: 'Obelien AI'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   }
//   console.log('Connected to database.');
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
