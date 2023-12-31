import express from 'express';
import { login, register } from '../controller/authController';
import { jwtCheck } from '../middleware/jwtCheck';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

export default router;