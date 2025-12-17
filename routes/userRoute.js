import express from 'express';
import { loginUser, register } from '../controllers/userController.js';

export const router = express.Router();
router.post('/register', register);
router.post('/login', loginUser);