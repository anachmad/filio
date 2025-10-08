import express from 'express';
import authRoutes from './features/auth/auth.routes.js';

const app = express();

// middleware untuk baca json dari body request
app.use(express.json());

app.use('/api/auth', authRoutes);

export default app;