import express from 'express';
import authRoutes from './features/auth/auth.routes.js';
import childRoutes from './features/child/child.routes.js';

const app = express();

// middleware untuk baca json dari body request
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/children', childRoutes);

export default app;