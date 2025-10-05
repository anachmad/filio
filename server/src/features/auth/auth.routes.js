const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const authMiddleware = require('../../middleware/auth.middleware');

// Route untuk registrasi user
// Method : POST, URL : /api/auth/register
router.post('/register', authController.registerUser);

// Route untuk login user
// Method : POST, URL : /api/auth/login
router.post('/login', authController.loginUser);

// Route untuk menampilkan profil
router.get('/me', authMiddleware, authController.getMyProfile);

module.exports = router;