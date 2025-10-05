const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Route untuk registrasi user
// Method : POST, URL : /api/users/register
router.post('/register', userController.registerUser);

// Route untuk login user
// Method : POST, URL : /api/users/login
router.post('/login', userController.loginUser);

// Route untuk menampilkan profil
router.get('/me', authMiddleware, userController.getMyProfile);

module.exports = router;