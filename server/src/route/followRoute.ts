import express from 'express';
import { followUser } from '../controller/followController';
import { jwtCheck } from '../middleware/jwtCheck';

const router = express.Router();

router.post('/', jwtCheck, followUser);

export default router;