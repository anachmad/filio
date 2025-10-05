const express = require('express')
// const userRoutes = require('./routes/user.routes');
const authRoutes = require('./features/auth/auth.routes')

const app = express();

// middleware untuk baca json dari body request
app.use(express.json());

// app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;