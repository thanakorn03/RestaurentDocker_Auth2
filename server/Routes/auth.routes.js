import authController from '../controllers/auth.controllers.js';
import express from 'express';
const router = express.Router();

// POST http://localhost:5000/api/v1/auth/register
router.post('/register', authController.register);

// POST http://localhost:5000/api/v1/auth/signin
router.post('/signin', authController.signin);

export default router;

