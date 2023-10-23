import express from 'express';
import { login, register, logout } from '../controller/authController';
import { jwtCheck } from '../middleware/jwtCheck';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.delete('/logout', jwtCheck, logout);

export default router;