const express = require('express')
const authRoutes = require('./features/auth/auth.routes')

const app = express();

// middleware untuk baca json dari body request
app.use(express.json());

app.use('/api/auth', authRoutes);

module.exports = app;