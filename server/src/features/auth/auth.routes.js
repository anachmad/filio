import express from 'express';
import * as authController from './auth.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();

// Route untuk registrasi user
// Method : POST, URL : /api/auth/register
router.post('/register', authController.registerUser);

// Route untuk login user
// Method : POST, URL : /api/auth/login
router.post('/login', authController.loginUser);

// Route untuk menampilkan profil
router.get('/me', authMiddleware, authController.getMyProfile);

export default router;